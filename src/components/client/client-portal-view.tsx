import type { Project } from '@/lib/definitions';
import { FolderKanban, CheckCircle, Clock } from 'lucide-react';
import StatusBadge from '../shared/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import ChangeRequestForm from './change-request-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ClientPortalView({ project }: { project: Project }) {
  const completedModules = project.modules.filter(m => m.status === 'Completado').length;
  const totalModules = project.modules.length;
  const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <>
      <header className="bg-card border-b py-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">ProPlanner</h1>
            </div>
            <StatusBadge status={project.status} />
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Progreso del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Progreso General</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} aria-label={`${Math.round(progress)}% completado`} />
                    <p className="mt-2 text-sm text-muted-foreground">
                        {completedModules} de {totalModules} módulos completados.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Fechas Clave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center"><Clock className="mr-2 h-4 w-4" /> Fecha de Inicio: {format(project.startDate, 'PPP', { locale: es })}</p>
                    <p className="text-sm text-muted-foreground flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> Fecha Límite Prevista: {format(project.deadline, 'PPP', { locale: es })}</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Resumen de Módulos</CardTitle>
            </CardHeader>
            <CardContent>
                {project.modules.length > 0 ? (
                    <ul className="space-y-3">
                        {project.modules.map(module => (
                            <li key={module.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                <span className="font-medium">{module.name}</span>
                                <StatusBadge status={module.status} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">Los módulos se listarán aquí a medida que se planifiquen.</p>
                )}
            </CardContent>
        </Card>

        <ChangeRequestForm projectId={project.id} />
      </main>
      
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ProPlanner. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
