
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Folder, ExternalLink, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import type { Document } from '@/lib/definitions';

interface ProjectDocumentsCardProps {
    documents: Document[];
}

export default function ProjectDocumentsCard({ documents }: ProjectDocumentsCardProps) {
  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Folder className="h-6 w-6 text-primary" />
                    <CardTitle>Documentos del Proyecto</CardTitle>
                </div>
                <Button variant="outline" size="sm" disabled>
                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir
                </Button>
            </div>
            <CardDescription>
                Brief, observaciones y otros documentos generales del proyecto.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {documents.length > 0 ? (
                <ul className="space-y-2">
                    {documents.map((doc) => (
                    <li key={doc.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{doc.name} <span className="text-xs text-muted-foreground">({doc.type})</span></span>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={doc.url} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No se han añadido documentos al proyecto.</p>
            )}
        </CardContent>
    </Card>
  );
}
