"use client";

import React from "react";
import NewLocationClient from "@/components/NewLocationClient";
async function page({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;

  return <NewLocationClient tripId={tripId} />;
}

export default page;
