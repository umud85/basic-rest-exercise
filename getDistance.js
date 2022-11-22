export default function getDistance(
  longitude1,
  latitude1,
  longitude2,
  latitude2
) {

  // haversine formula
  const R = 6371e3; // Erdradius - Earth radius
  const phi1 = (latitude1 * Math.PI) / 180;
  const phi2 = (latitude2 * Math.PI) / 180;
  const deltaPhi = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLambda = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distanz / distance
  const d = Math.round((R * c) / 1000);
  return d;
}
