export type ServiceStatus = 'waiting' | 'in-progress' | 'completed' | 'failed';

export const STATUS_COLORS: Record<ServiceStatus, string> = {
    waiting: '#2563EB',
    'in-progress': '#F59E0B',
    completed: '#16A34A',
    failed: '#111827',
};

export const STATUS_LABELS: Record<ServiceStatus, string> = {
    waiting: 'Aguardando chegada',
    'in-progress': 'Em andamento',
    completed: 'Concluído',
    failed: 'Não concluído',
};

export const STATUS_MEANINGS: Record<ServiceStatus, string> = {
    waiting: 'Serviço programado, mas o colaborador ainda não chegou',
    'in-progress': 'Colaborador chegou e iniciou a limpeza',
    completed: 'Limpeza finalizada e assinatura coletada',
    failed: 'Houve um problema que impediu a conclusão',
};
