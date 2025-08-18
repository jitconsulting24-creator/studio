import type { TimelineEvent } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, User, Bot } from 'lucide-react';

const ActorIcon = ({ actor }: { actor: TimelineEvent['actor'] }) => {
    switch (actor) {
        case 'admin':
            return <User className="h-5 w-5 text-primary" />;
        case 'cliente':
            return <User className="h-5 w-5 text-accent-foreground" />;
        case 'sistema':
            return <Bot className="h-5 w-5 text-muted-foreground" />;
        default:
            return <CheckCircle className="h-5 w-5 text-muted-foreground" />;
    }
}


export default function TimelineView({ events }: { events: TimelineEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
            {events.map((event, index) => (
              <div key={index} className="relative mb-8 flex items-start">
                <div className="absolute left-0 top-1.5 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2">
                    <ActorIcon actor={event.actor} />
                </div>
                <div className="pl-8">
                  <p className="font-semibold">{event.eventDescription}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.eventDate.toLocaleDateString()} by {event.actor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No timeline events yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
