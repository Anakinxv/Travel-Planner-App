import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/geoCode";
export async function GET(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const locations = await prisma.location.findMany({
    where: { trip: { userId: session.user?.id } },
    select: {
      locationTitle: true,
      latitude: true,
      longitude: true,
      trip: {
        select: {
          title: true,
        },
      },
    },
  });

  const transformedLocations = await Promise.all(
    locations.map(async (location) => {
      const geocodeResult = await getCountryFromCoordinates(
        location.latitude,
        location.longitude
      );

      return {
        name: `${location.trip?.title} - ${geocodeResult.formattedAddress}`,
        lat: location.latitude,
        lng: location.longitude,
        country: geocodeResult.country,
      };
    })
  );

  return NextResponse.json(transformedLocations);
}
