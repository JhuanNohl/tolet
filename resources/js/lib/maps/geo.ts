import type { LatLng } from '@/data/ecoRouteMock';

export function toLngLat(position: LatLng): [number, number] {
    return [position.lng, position.lat];
}
