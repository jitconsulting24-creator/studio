import { Badge } from '@/components/ui/badge';
import type { ProjectStatus, ModuleStatus, LeadStatus } from '@/lib/definitions';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProjectStatus | ModuleStatus | LeadStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    // Project & Module Status
    Planificación: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800/50',
    'En Progreso': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800/50',
    'En Revisión': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800/50',
    Completado: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800/50',
    Pendiente: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600/50',
    // Change Request Status
    'Pendiente de Aprobación': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-800/50',
    Aprobado: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800/50',
    Rechazado: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800/50',
    // Lead Status
    'Nuevo': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800/50',
    'Contactado': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-800/50',
    'Propuesta Enviada': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-800/50',
    'Convertido': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800/50'
  };

  return (
    <Badge variant="outline" className={cn('font-semibold', statusStyles[status as keyof typeof statusStyles] || statusStyles['Pendiente'])}>
      {status}
    </Badge>
  );
}
