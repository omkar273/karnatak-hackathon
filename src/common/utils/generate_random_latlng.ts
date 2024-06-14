interface LatLng {
  lat: number;
  lng: number;
}

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => value * Math.PI / 180;
  
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const generateRandomLatLngWithinRadius = (
    center: LatLng,
    radiusInKm: number = 10
): { location: LatLng; distance: number } => {
  const { lat: centerLat, lng: centerLng } = center;
  
  const radiusInDegrees = radiusInKm / 111.32;
  
  const randomLatOffset = getRandomInRange(-radiusInDegrees, radiusInDegrees);
  const randomLngOffset = getRandomInRange(-radiusInDegrees, radiusInDegrees);
  
  const newLat = centerLat + randomLatOffset;
  const newLng = centerLng + randomLngOffset;
  
  const distance = haversineDistance(centerLat, centerLng, newLat, newLng);
  
  return { location: { lat: newLat, lng: newLng }, distance: parseFloat(distance.toFixed(2)) };
};
