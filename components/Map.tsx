import React from "react";
import { Location } from "@/app/generated/prisma";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
interface MapProps {
  itineraries: Location[];
}

function Map({ itineraries }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "400px",
        borderRadius: "16px",
      }}
      center={{
        lat: itineraries[0]?.latitude || 0,
        lng: itineraries[0]?.longitude || 0,
      }}
      zoom={10}
    >
      {itineraries.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.latitude, lng: location.longitude }}
          title={location.locationTitle}
        />
      ))}
    </GoogleMap>
  );
}

export default Map;
