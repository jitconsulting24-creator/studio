
'use client';
import { useState, useEffect } from 'react';
import { getClientRequirements, getLeads } from '@/lib/data';
import type { Lead, ClientRequirements } from '@/lib/definitions';
import PageHeader from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Mail, Copy, Eye, Loader2 } from 'lucide-react';
import FileText from '@/components/shared/FileText';
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
import { createLead } from '@/lib/actions';
import { CreateLeadDialog } from '@/components/leads/create-lead-dialog';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [requirements, setRequirements] = useState<ClientRequirements[]>([]);
  const [isCreateLeadDialogOpen, setIsCreateLeadDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [leadsData, reqsData] = await Promise.all([getLeads(), getClientRequirements()]);
      setLeads(leadsData);
      setRequirements(reqsData);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleCreateLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'formLink' | 'status'>) => {
    const result = await createLead(leadData);
    if (result.success && result.lead) {
        // Optimistically update UI or re-fetch
        const updatedLeads = await getLeads();
        setLeads(updatedLeads);
        toast({
            title: 'Lead Creado',
            description: 'Se ha creado un nuevo lead y se ha añadido a la lista.',
        });
        setIsCreateLeadDialogOpen(false);
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error || 'No se pudo crear el lead.',
        });
    }
  };

  const copyToClipboard = (link: string) => {
    const fullLink = `${window.location.origin}${link}`;
    navigator.clipboard.writeText(fullLink);
    toast({
      title: '¡Enlace Copiado!',
      description: 'El enlace del formulario ha sido copiado a tu portapapeles.',
    });
  };

  const hasSubmittedRequirements = (leadId: string) => {
      return !!requirements.find(req => req.leadId === leadId);
  }

  if(isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Leads"
        description="Gestiona tus clientes potenciales y sus requerimientos."
      >
        <Button onClick={() => setIsCreateLeadDialogOpen(true)}>
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
                     <Link href={hasSubmittedRequirements(lead.id) ? `/dashboard/leads/${lead.id}/requirements` : lead.formLink} passHref legacyBehavior>
                      <a target="_blank">
                        <Button variant="ghost" size="icon" title={hasSubmittedRequirements(lead.id) ? "Ver requerimientos enviados" : "Ver formulario"}>
                            {hasSubmittedRequirements(lead.id) ? <FileText className="h-4 w-4 text-primary" /> : <Eye className="h-4 w-4" />}
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
       <CreateLeadDialog
        isOpen={isCreateLeadDialogOpen}
        onClose={() => setIsCreateLeadDialogOpen(false)}
        onAddLead={handleCreateLead}
      />
    </div>
  );
}
