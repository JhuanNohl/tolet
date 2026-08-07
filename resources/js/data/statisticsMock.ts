export type DailyOperationSummary = {
    label: string;
    completed: number;
    failed: number;
};

export const dailyOperationHistory: DailyOperationSummary[] = [
    { label: '26/07', completed: 38, failed: 4 },
    { label: '27/07', completed: 41, failed: 3 },
    { label: '28/07', completed: 35, failed: 6 },
    { label: '29/07', completed: 44, failed: 2 },
    { label: '30/07', completed: 47, failed: 3 },
    { label: '31/07', completed: 30, failed: 5 },
    { label: '01/08', completed: 28, failed: 4 },
    { label: '02/08', completed: 45, failed: 3 },
    { label: '03/08', completed: 49, failed: 2 },
    { label: '04/08', completed: 43, failed: 4 },
    { label: '05/08', completed: 52, failed: 1 },
    { label: '06/08', completed: 46, failed: 3 },
    { label: '07/08', completed: 39, failed: 2 },
];

export type CollaboratorPerformance = {
    id: string;
    name: string;
    initials: string;
    completed: number;
    failed: number;
    avgDurationMinutes: number;
};

export const collaboratorPerformance: CollaboratorPerformance[] = [
    {
        id: 'route-bianca-rocha',
        name: 'Bianca Rocha',
        initials: 'BR',
        completed: 61,
        failed: 3,
        avgDurationMinutes: 22,
    },
    {
        id: 'route-artur-pedro',
        name: 'Artur Pedro',
        initials: 'AP',
        completed: 54,
        failed: 5,
        avgDurationMinutes: 27,
    },
    {
        id: 'route-joao-silva',
        name: 'Joao Silva',
        initials: 'JS',
        completed: 49,
        failed: 4,
        avgDurationMinutes: 25,
    },
    {
        id: 'route-marcos-vieira',
        name: 'Marcos Vieira',
        initials: 'MV',
        completed: 45,
        failed: 6,
        avgDurationMinutes: 31,
    },
    {
        id: 'route-pedro-santos',
        name: 'Pedro Santos',
        initials: 'PS',
        completed: 38,
        failed: 7,
        avgDurationMinutes: 29,
    },
];

export type GeoZoneSummary = {
    zone: string;
    completed: number;
    inProgress: number;
    waiting: number;
    failed: number;
};

export const geoZoneSummary: GeoZoneSummary[] = [
    { zone: 'Vila Mariana', completed: 58, inProgress: 6, waiting: 4, failed: 3 },
    { zone: 'Moema', completed: 49, inProgress: 5, waiting: 3, failed: 2 },
    { zone: 'Itaim Bibi', completed: 44, inProgress: 4, waiting: 5, failed: 6 },
    { zone: 'Pinheiros', completed: 39, inProgress: 3, waiting: 2, failed: 4 },
    { zone: 'Campo Belo', completed: 31, inProgress: 4, waiting: 3, failed: 2 },
];
