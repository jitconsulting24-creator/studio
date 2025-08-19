'use client';
import type { ChangeRequest, ChangeRequestStatus } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Loader2, X } from 'lucide-react';
import StatusBadge from '../shared/status-badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

export default function ChangeRequestsList({ requests, onUpdateStatus }: { requests: ChangeRequest[], onUpdateStatus: (id: string, status: ChangeRequestStatus) => Promise<void> }) {
  const [loadingStatus, setLoadingStatus] = useState<Record<string, ChangeRequestStatus | null>>({});

  const handleUpdate = async (id: string, status: ChangeRequestStatus) => {
    setLoadingStatus(prev => ({...prev, [id]: status}));
    await onUpdateStatus(id, status);
    setLoadingStatus(prev => ({...prev, [id]: null}));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitudes de Cambio</CardTitle>
        <CardDescription>Revise y responda a las solicitudes del cliente.</CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request.id} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium flex-1 mr-4">{request.requestDetails}</p>
                  <StatusBadge status={request.status as any} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enviado el: {format(request.submittedAt, 'PPP', { locale: es })}
                </p>
                {request.status === 'Pendiente de Aprobación' && (
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700" 
                      onClick={() => handleUpdate(request.id, 'Aprobado')}
                      disabled={!!loadingStatus[request.id]}
                    >
                      {loadingStatus[request.id] === 'Aprobado' ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="mr-1 h-4 w-4" /> Aprobar</>}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleUpdate(request.id, 'Rechazado')}
                      disabled={!!loadingStatus[request.id]}
                      >
                      {loadingStatus[request.id] === 'Rechazado' ? <Loader2 className="h-4 w-4 animate-spin" /> : <><X className="mr-1 h-4 w-4" /> Rechazar</>}
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No se han enviado solicitudes de cambio.</p>
        )}
      </CardContent>
    </Card>
  );
}
