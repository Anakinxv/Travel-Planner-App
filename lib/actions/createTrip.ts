"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to create a trip");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDatestr = formData.get("startDate") as string;
  const endDatestr = formData.get("endDate") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const trip = [title, description, startDatestr, endDatestr];

  if (
    trip.some((field) => {
      field.trim() === "" || field === null || field === undefined;
    })
  ) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDatestr);
  const endDate = new Date(endDatestr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date");
  }

  await prisma.trip.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  redirect("/trips");
}
