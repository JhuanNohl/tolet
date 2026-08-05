export type LatLng = { lat: number; lng: number };

export type ServicePoint = {
    id: string;
    label: string;
    position: LatLng;
    kind: 'pin' | 'leaf';
};

export type Collaborator = {
    id: string;
    name: string;
    initials: string;
    position: LatLng;
    active: boolean;
};

export type RouteSegment = {
    id: string;
    path: LatLng[];
    status: 'in-progress' | 'completed';
};

export const mapCenter: LatLng = { lat: -23.5978, lng: -46.6544 };

export const servicePoints: ServicePoint[] = [
    {
        id: '01',
        label: '01',
        position: { lat: -23.5908, lng: -46.6712 },
        kind: 'pin',
    },
    {
        id: '02',
        label: '02',
        position: { lat: -23.6042, lng: -46.6718 },
        kind: 'pin',
    },
    {
        id: '03',
        label: '03',
        position: { lat: -23.6112, lng: -46.6482 },
        kind: 'pin',
    },
    {
        id: '04',
        label: '04',
        position: { lat: -23.5942, lng: -46.6272 },
        kind: 'pin',
    },
    {
        id: 'leaf-1',
        label: 'Ponto de coleta',
        position: { lat: -23.5946, lng: -46.6552 },
        kind: 'leaf',
    },
    {
        id: 'leaf-2',
        label: 'Ponto de coleta',
        position: { lat: -23.5896, lng: -46.6316 },
        kind: 'leaf',
    },
];

export const collaborators: Collaborator[] = [
    {
        id: 'c1',
        name: 'Rafael Souza',
        initials: 'RS',
        position: { lat: -23.5958, lng: -46.6656 },
        active: true,
    },
    {
        id: 'c2',
        name: 'Camila Alves',
        initials: 'CA',
        position: { lat: -23.609, lng: -46.6524 },
        active: true,
    },
    {
        id: 'c3',
        name: 'Bruno Lima',
        initials: 'BL',
        position: { lat: -23.592, lng: -46.63 },
        active: true,
    },
];

export const routeSegments: RouteSegment[] = [
    {
        id: 'r1',
        status: 'in-progress',
        path: [
            servicePoints[0].position,
            collaborators[0].position,
            servicePoints[4].position,
        ],
    },
    {
        id: 'r2',
        status: 'completed',
        path: [
            servicePoints[4].position,
            collaborators[1].position,
            servicePoints[2].position,
        ],
    },
    {
        id: 'r3',
        status: 'completed',
        path: [
            servicePoints[3].position,
            collaborators[2].position,
            servicePoints[5].position,
        ],
    },
];

export const operationsStats = {
    active: { current: 18, total: 36 },
    completed: 64,
    inProgress: 22,
    co2AvoidedTons: 1.2,
};
