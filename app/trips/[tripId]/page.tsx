import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Tripdetail from "@/components/Tripdetail";

async function DetailedTrip({ params }: { params: { tripId: string } }) {
  const session = await auth();

  const trip = await prisma.trip.findUnique({
    where: {
      id: params.tripId,
      userId: session?.user?.id ?? "",
    },
    include: {
      locations: true,
    },
  });

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Trip not found
        </h2>
        <Link href="/trips">
          <Button>Back to Trips</Button>
        </Link>
      </div>
    );
  }

  return <Tripdetail trip={trip} />;
}

export default DetailedTrip;
