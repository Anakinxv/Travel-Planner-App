"use server";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";

async function TripsPage() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl bg-white">
        Please log in to view your trips.
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <Link href="/trips/new">
          <Button className="mt-4">New Trip</Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white">
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            No trips yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start planning your next adventure!
          </p>
          <Link href="/trips/new">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Create Your First Trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              {/* Imagen */}
              {trip.imageUrl && (
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <Image
                    src={trip.imageUrl}
                    alt={trip.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {trip.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {trip.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Start:</span>
                    {new Date(trip.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">End:</span>
                    {new Date(trip.endDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Botón de Ver Detalles */}
                <Link href={`/trips/${trip.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TripsPage;
