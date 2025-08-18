'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ClipboardList, ExternalLink, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ModuleGeneratorDialog } from './module-generator-dialog';
import type { Module, Requirement } from '@/lib/definitions';
import { RequirementDialog } from './requirement-dialog';

interface RequirementsCardProps {
    requirements: Requirement[];
    onAddModules: (modules: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews'>[]) => void;
    projectDescription: string;
    onAddRequirement: (requirement: Omit<Requirement, 'id'>) => void;
    onEditRequirement: (requirement: Requirement) => void;
    onDeleteRequirement: (requirementId: string) => void;
}

export default function RequirementsCard({
    requirements,
    onAddModules,
    projectDescription,
    onAddRequirement,
    onEditRequirement,
    onDeleteRequirement
}: RequirementsCardProps) {
  const [isRequirementDialogOpen, setIsRequirementDialogOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);

  const handleOpenDialog = (requirement: Requirement | null = null) => {
    setEditingRequirement(requirement);
    setIsRequirementDialogOpen(true);
  };

  const handleSaveRequirement = (requirementData: Omit<Requirement, 'id'> | Requirement) => {
    if ('id' in requirementData) {
      onEditRequirement(requirementData);
    } else {
      onAddRequirement(requirementData);
    }
    setIsRequirementDialogOpen(false);
  };

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ClipboardList className="h-6 w-6 text-primary" />
                    <CardTitle>Requisitos Iniciales</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog()}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir
                    </Button>
                    <ModuleGeneratorDialog onAddModules={onAddModules} projectDescription={projectDescription} />
                </div>
            </div>
            <CardDescription>
                Gestione los requisitos del proyecto y use la IA para crear módulos basados en ellos.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {requirements.length > 0 ? (
                <ul className="space-y-2">
                    {requirements.map((req) => (
                    <li key={req.id} className="flex items-center justify-between group">
                        <span className="text-sm">{req.title}</span>
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={req.url} target="_blank">
                                    <ExternalLink className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(req)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDeleteRequirement(req.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No se han listado requisitos iniciales.</p>
            )}
        </CardContent>
        {isRequirementDialogOpen && (
             <RequirementDialog
                isOpen={isRequirementDialogOpen}
                onClose={() => setIsRequirementDialogOpen(false)}
                onSave={handleSaveRequirement}
                requirement={editingRequirement}
            />
        )}
    </Card>
  );
}
