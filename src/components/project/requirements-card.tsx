import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ClipboardList, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ModuleGeneratorDialog } from './module-generator-dialog';
import type { Module } from '@/lib/definitions';

interface RequirementsCardProps {
    requirements: { title: string; url: string }[];
    onAddModules: (modules: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews'>[]) => void;
    projectDescription: string;
}

export default function RequirementsCard({ requirements, onAddModules, projectDescription }: RequirementsCardProps) {
  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ClipboardList className="h-6 w-6 text-primary" />
                    <CardTitle>Requisitos Iniciales</CardTitle>
                </div>
                <ModuleGeneratorDialog onAddModules={onAddModules} projectDescription={projectDescription} />
            </div>
            <CardDescription>
                Requisitos originales del proyecto. Utilice el generador de IA para crear módulos.
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
                <p className="text-sm text-muted-foreground text-center py-4">No se han listado requisitos iniciales.</p>
            )}
        </CardContent>
    </Card>
  );
}
