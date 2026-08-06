import type { ServiceStatus } from '@/data/serviceStatus';

export type LatLng = { lat: number; lng: number };

export type RouteStop = {
    position: LatLng;
    status: ServiceStatus;
};

export type CollaboratorRoute = {
    id: string;
    name: string;
    initials: string;
    role: string;
    phone: string;
    since: string;
    stops: RouteStop[];
};

export const mapCenter: LatLng = { lat: -23.5978, lng: -46.6544 };

export const collaboratorRoutes: CollaboratorRoute[] = [
    {
        id: 'route-artur-pedro',
        name: 'Artur Pedro',
        initials: 'AP',
        role: 'Agente de Limpeza Urbana',
        phone: '(11) 98221-4477',
        since: 'Na equipe desde jan/2022',
        stops: [
            { position: { lat: -23.5872, lng: -46.687 }, status: 'waiting' },
            {
                position: { lat: -23.5838, lng: -46.679 },
                status: 'in-progress',
            },
            { position: { lat: -23.5804, lng: -46.671 }, status: 'completed' },
            { position: { lat: -23.5908, lng: -46.6712 }, status: 'failed' },
        ],
    },
    {
        id: 'route-joao-silva',
        name: 'Joao Silva',
        initials: 'JS',
        role: 'Operador de Coleta Seletiva',
        phone: '(11) 97733-1029',
        since: 'Na equipe desde ago/2023',
        stops: [
            {
                position: { lat: -23.576, lng: -46.654 },
                status: 'in-progress',
            },
            { position: { lat: -23.5716, lng: -46.646 }, status: 'waiting' },
            { position: { lat: -23.5836, lng: -46.6486 }, status: 'completed' },
            { position: { lat: -23.5896, lng: -46.6316 }, status: 'failed' },
        ],
    },
    {
        id: 'route-pedro-santos',
        name: 'Pedro Santos',
        initials: 'PS',
        role: 'Agente de Limpeza Urbana',
        phone: '(11) 96654-8890',
        since: 'Na equipe desde mai/2021',
        stops: [
            { position: { lat: -23.6042, lng: -46.6718 }, status: 'completed' },
            { position: { lat: -23.6112, lng: -46.6482 }, status: 'failed' },
            { position: { lat: -23.6156, lng: -46.6688 }, status: 'waiting' },
            {
                position: { lat: -23.609, lng: -46.658 },
                status: 'in-progress',
            },
        ],
    },
    {
        id: 'route-bianca-rocha',
        name: 'Bianca Rocha',
        initials: 'BR',
        role: 'Supervisora de Rota',
        phone: '(11) 95521-3344',
        since: 'Na equipe desde fev/2020',
        stops: [
            { position: { lat: -23.612, lng: -46.63 }, status: 'waiting' },
            { position: { lat: -23.5942, lng: -46.6272 }, status: 'completed' },
            {
                position: { lat: -23.605, lng: -46.618 },
                status: 'in-progress',
            },
            { position: { lat: -23.598, lng: -46.622 }, status: 'failed' },
        ],
    },
    {
        id: 'route-marcos-vieira',
        name: 'Marcos Vieira',
        initials: 'MV',
        role: 'Operador de Coleta Seletiva',
        phone: '(11) 99887-6655',
        since: 'Na equipe desde out/2023',
        stops: [
            { position: { lat: -23.5958, lng: -46.6656 }, status: 'failed' },
            {
                position: { lat: -23.599, lng: -46.642 },
                status: 'in-progress',
            },
            { position: { lat: -23.601, lng: -46.636 }, status: 'completed' },
            { position: { lat: -23.597, lng: -46.65 }, status: 'waiting' },
            {
                position: { lat: -23.5946, lng: -46.6552 },
                status: 'in-progress',
            },
        ],
    },
];

export const operationsStats = {
    active: { current: 18, total: 36 },
    completed: 64,
    inProgress: 22,
    co2AvoidedTons: 1.2,
};
