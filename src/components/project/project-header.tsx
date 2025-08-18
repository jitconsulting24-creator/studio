'use client';
import type { Project } from '@/lib/definitions';
import StatusBadge from '../shared/status-badge';
import PageHeader from '../shared/page-header';
import { Button } from '../ui/button';
import { Calendar, Clipboard, Link as LinkIcon, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ProjectHeader({ project }: { project: Project }) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    const clientUrl = `${window.location.origin}/client-view/${project.shareableLinkId}`;
    navigator.clipboard.writeText(clientUrl);
    toast({
      title: '¡Enlace Copiado!',
      description: 'El enlace de la vista del cliente ha sido copiado a tu portapapeles.',
    });
  };

  return (
    <div>
      <PageHeader
        title={project.name}
        description={project.description}
        tertiary={<StatusBadge status={project.status} />}
      />
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cronograma</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
                <p>Fecha de Inicio: {format(project.startDate, 'PPP', { locale: es })}</p>
                <p>Fecha Límite: {format(project.deadline, 'PPP', { locale: es })}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enlace del Portal del Cliente</CardTitle>
                <Clipboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex items-center gap-2">
                <Link href={`/client-view/${project.shareableLinkId}`} target="_blank" className="flex-1">
                  <Button variant="outline" className="w-full justify-start text-muted-foreground truncate">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    /client-view/...
                  </Button>
                </Link>
                <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
