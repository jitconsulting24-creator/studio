
'use client';
import { useState } from 'react';
import { DUMMY_LEADS } from '@/lib/data';
import type { Lead } from '@/lib/definitions';
import PageHeader from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Mail, Copy, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import StatusBadge from '@/components/shared/status-badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(DUMMY_LEADS);
  const { toast } = useToast();

  const handleCreateLead = () => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: 'Nuevo Lead',
      email: `lead${leads.length + 1}@example.com`,
      company: 'Empresa Pendiente',
      status: 'Nuevo',
      createdAt: new Date(),
      formLink: `/leads/lead-${Date.now()}/form`,
    };
    setLeads((prev) => [newLead, ...prev]);
    toast({
        title: 'Lead Creado',
        description: 'Se ha creado un nuevo lead y se ha añadido a la lista.',
    });
  };

  const copyToClipboard = (link: string) => {
    const fullLink = `${window.location.origin}${link}`;
    navigator.clipboard.writeText(fullLink);
    toast({
      title: '¡Enlace Copiado!',
      description: 'El enlace del formulario ha sido copiado a tu portapapeles.',
    });
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Leads"
        description="Gestiona tus clientes potenciales y sus requerimientos."
      >
        <Button onClick={handleCreateLead}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Nuevo Lead
        </Button>
      </PageHeader>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
          <CardDescription>
            Un listado de todos los clientes potenciales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Creado el</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={lead.status as any} />
                  </TableCell>
                  <TableCell>
                    {format(lead.createdAt, 'PPP', { locale: es })}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button variant="ghost" size="icon" title="Enviar enlace por correo">
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Copiar enlace del formulario" onClick={() => copyToClipboard(lead.formLink)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                     <Link href={lead.formLink} passHref legacyBehavior>
                      <a target="_blank">
                        <Button variant="ghost" size="icon" title="Ver formulario">
                            <Eye className="h-4 w-4" />
                        </Button>
                      </a>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
