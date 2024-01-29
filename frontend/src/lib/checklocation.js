import pointInPolygon from 'point-in-polygon';

export function checklocation(location, bounds) {
  return pointInPolygon(location, bounds);
}
