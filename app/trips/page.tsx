import React from "react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
async function TripsPage() {
  const session = await auth();

  if (!session) {
    // Handle unauthenticated state
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please log in to view your trips.
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/trips/new">
          <Button className="mt-4">New Trip</Button>
        </Link>
      </div>
    </div>
  );
}

export default TripsPage;
