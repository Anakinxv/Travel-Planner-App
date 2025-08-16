interface GeocodeResult {
  formattedAddress: string;
  country: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );
  const data = await response.json();

  const result = data.results?.[0];
  let country = "";
  let formattedAddress = "";

  if (result) {
    formattedAddress = result.formatted_address;
    const countryComponent = result.address_components?.find((comp: any) =>
      comp.types.includes("country")
    );
    country = countryComponent ? countryComponent.long_name : "";
  }

  return {
    formattedAddress,
    country,
  };
}
