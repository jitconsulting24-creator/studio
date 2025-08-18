import type { ChangeRequest, ChangeRequestStatus } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Check, X } from 'lucide-react';
import StatusBadge from '../shared/status-badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ChangeRequestsList({ requests, onChangeRequestStatus }: { requests: ChangeRequest[], onChangeRequestStatus: (id: string, status: ChangeRequestStatus) => void }) {
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
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onChangeRequestStatus(request.id, 'Aprobado')}>
                      <Check className="mr-1 h-4 w-4" /> Aprobar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onChangeRequestStatus(request.id, 'Rechazado')}>
                      <X className="mr-1 h-4 w-4" /> Rechazar
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
