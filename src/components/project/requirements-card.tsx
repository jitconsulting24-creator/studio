import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ClipboardList, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ModuleGeneratorDialog } from './module-generator-dialog';

interface RequirementsCardProps {
    requirements: { title: string; url: string }[];
}

export default function RequirementsCard({ requirements }: RequirementsCardProps) {
  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ClipboardList className="h-6 w-6 text-primary" />
                    <CardTitle>Initial Requirements</CardTitle>
                </div>
                <ModuleGeneratorDialog />
            </div>
            <CardDescription>
                Original requirements for the project. Use the AI generator to create modules.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {requirements.length > 0 ? (
                <ul className="space-y-2">
                    {requirements.map((req, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <span className="text-sm">{req.title}</span>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={req.url} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No initial requirements listed.</p>
            )}
        </CardContent>
    </Card>
  );
}
