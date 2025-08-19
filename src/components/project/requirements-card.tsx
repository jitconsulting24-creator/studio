'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ClipboardList, ExternalLink, PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ModuleGeneratorDialog } from './module-generator-dialog';
import type { Module, Requirement } from '@/lib/definitions';
import { RequirementDialog } from './requirement-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface RequirementsCardProps {
    projectId: string;
    requirements: Requirement[];
    onAddModules: (modules: Omit<Module, 'id' | 'status' | 'parts' | 'stages' | 'requirements' | 'reviews' | 'deliverables' | 'documents'>[]) => Promise<void>;
    projectDescription: string;
    onAddRequirement: (requirement: Omit<Requirement, 'id'>) => Promise<void>;
    onEditRequirement: (requirement: Requirement) => Promise<void>;
    onDeleteRequirement: (requirementId: string) => Promise<void>;
}

export default function RequirementsCard({
    projectId,
    requirements,
    onAddModules,
    projectDescription,
    onAddRequirement,
    onEditRequirement,
    onDeleteRequirement
}: RequirementsCardProps) {
  const [isRequirementDialogOpen, setIsRequirementDialogOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleOpenDialog = (requirement: Requirement | null = null) => {
    setEditingRequirement(requirement);
    setIsRequirementDialogOpen(true);
  };

  const handleSaveRequirement = async (requirementData: Omit<Requirement, 'id'> | Requirement) => {
    if ('id' in requirementData) {
      await onEditRequirement(requirementData);
    } else {
      await onAddRequirement(requirementData);
    }
    setIsRequirementDialogOpen(false);
    setEditingRequirement(null);
  };

  const handleDelete = async (requirementId: string) => {
    setIsDeleting(requirementId);
    await onDeleteRequirement(requirementId);
    setIsDeleting(null);
  }

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
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el requisito.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(req.id)} disabled={isDeleting === req.id}>
                                            {isDeleting === req.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Eliminar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
                onClose={() => {
                    setIsRequirementDialogOpen(false);
                    setEditingRequirement(null);
                }}
                onSave={handleSaveRequirement}
                requirement={editingRequirement}
            />
        )}
    </Card>
  );
}
