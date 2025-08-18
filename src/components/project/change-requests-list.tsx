import type { ChangeRequest, ChangeRequestStatus } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Check, X } from 'lucide-react';
import StatusBadge from '../shared/status-badge';

export default function ChangeRequestsList({ requests, onChangeRequestStatus }: { requests: ChangeRequest[], onChangeRequestStatus: (id: string, status: ChangeRequestStatus) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Requests</CardTitle>
        <CardDescription>Review and respond to client requests.</CardDescription>
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
                  Submitted on: {request.submittedAt.toLocaleDateString()}
                </p>
                {request.status === 'Pendiente de Aprobación' && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onChangeRequestStatus(request.id, 'Aprobado')}>
                      <Check className="mr-1 h-4 w-4" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onChangeRequestStatus(request.id, 'Rechazado')}>
                      <X className="mr-1 h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No change requests have been submitted.</p>
        )}
      </CardContent>
    </Card>
  );
}
