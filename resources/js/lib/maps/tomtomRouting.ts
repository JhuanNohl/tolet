import type { LatLng } from '@/data/ecoRouteMock';

type TomTomRouteResponse = {
    routes: {
        legs: {
            points: { latitude: number; longitude: number }[];
        }[];
    }[];
};

export async function fetchRoadRoute(
    waypoints: LatLng[],
    apiKey: string,
): Promise<LatLng[] | null> {
    const locations = waypoints
        .map((point) => `${point.lat},${point.lng}`)
        .join(':');

    const url = `https://api.tomtom.com/routing/1/calculateRoute/${locations}/json?key=${apiKey}&routeType=fastest&traffic=false`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as TomTomRouteResponse;
        const route = data.routes?.[0];

        if (!route) {
            return null;
        }

        return route.legs.flatMap((leg) =>
            leg.points.map((point) => ({
                lat: point.latitude,
                lng: point.longitude,
            })),
        );
    } catch {
        return null;
    }
}
