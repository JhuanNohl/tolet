import type { ServiceStatus } from '@/data/serviceStatus';

export type LatLng = { lat: number; lng: number };

export type ServicePoint = {
    id: string;
    label: string;
    position: LatLng;
    kind: 'pin' | 'leaf';
    status?: ServiceStatus;
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
    waypoints: LatLng[];
    status: ServiceStatus;
};

export const mapCenter: LatLng = { lat: -23.5978, lng: -46.6544 };

export const servicePoints: ServicePoint[] = [
    {
        id: '01',
        label: '01',
        position: { lat: -23.5908, lng: -46.6712 },
        kind: 'pin',
        status: 'waiting',
    },
    {
        id: '02',
        label: '02',
        position: { lat: -23.6042, lng: -46.6718 },
        kind: 'pin',
        status: 'in-progress',
    },
    {
        id: '03',
        label: '03',
        position: { lat: -23.6112, lng: -46.6482 },
        kind: 'pin',
        status: 'completed',
    },
    {
        id: '04',
        label: '04',
        position: { lat: -23.5942, lng: -46.6272 },
        kind: 'pin',
        status: 'failed',
    },
    {
        id: '05',
        label: '05',
        position: { lat: -23.5836, lng: -46.6486 },
        kind: 'pin',
        status: 'waiting',
    },
    {
        id: '06',
        label: '06',
        position: { lat: -23.6156, lng: -46.6688 },
        kind: 'pin',
        status: 'completed',
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
    {
        id: 'c4',
        name: 'Fernanda Dias',
        initials: 'FD',
        position: { lat: -23.6082, lng: -46.6688 },
        active: false,
    },
];

export const routeSegments: RouteSegment[] = [
    {
        id: 'r1',
        status: 'waiting',
        waypoints: [
            servicePoints[0].position,
            servicePoints[6].position,
        ],
    },
    {
        id: 'r2',
        status: 'in-progress',
        waypoints: [
            servicePoints[1].position,
            collaborators[0].position,
            servicePoints[4].position,
        ],
    },
    {
        id: 'r3',
        status: 'completed',
        waypoints: [
            servicePoints[6].position,
            collaborators[1].position,
            servicePoints[2].position,
        ],
    },
    {
        id: 'r4',
        status: 'failed',
        waypoints: [
            servicePoints[3].position,
            collaborators[2].position,
            servicePoints[7].position,
        ],
    },
    {
        id: 'r5',
        status: 'completed',
        waypoints: [
            servicePoints[7].position,
            collaborators[3].position,
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
