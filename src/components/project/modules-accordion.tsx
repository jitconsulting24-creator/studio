
'use client';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Module } from '@/lib/definitions';
import StatusBadge from '../shared/status-badge';
import { Button } from '../ui/button';
import { Edit, Trash2, PlusCircle, Paperclip, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { AddModuleDialog } from './add-module-dialog';
import { EditModuleDialog } from './edit-module-dialog';
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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ModulesAccordionProps {
  modules: Module[];
  onAddModule: (module: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews'>) => void;
  onEditModule: (module: Module) => void;
  onDeleteModule: (moduleId: string) => void;
}

export default function ModulesAccordion({ modules, onAddModule, onEditModule, onDeleteModule }: ModulesAccordionProps) {
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Módulos de Desarrollo</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsAddModuleDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Módulo
        </Button>
      </CardHeader>
      <CardContent>
        {modules.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {modules.map((module) => (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between pr-4">
                    <span className="font-semibold">{module.name}</span>
                    <StatusBadge status={module.status} />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-2">
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Fecha Límite: {format(module.deadline, 'PPP', { locale: es })}
                    </p>
                     <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center"><Paperclip className="mr-2 h-4 w-4" /> Entregables</h4>
                        {module.deliverables && module.deliverables.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                {module.deliverables.map(d => <li key={d.id}><a href={d.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{d.name}</a></li>)}
                            </ul>
                        ) : <p className="text-xs text-muted-foreground">No hay entregables.</p>}
                     </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center"><FileText className="mr-2 h-4 w-4" /> Documentos</h4>
                        {module.documents && module.documents.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                {module.documents.map(d => <li key={d.id}><a href={d.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{d.name}</a></li>)}
                            </ul>
                        ) : <p className="text-xs text-muted-foreground">No hay documentos.</p>}
                     </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingModule(module)}>
                        <Edit className="mr-2 h-3 w-3" /> Editar
                      </Button>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" size="sm">
                              <Trash2 className="mr-2 h-3 w-3" /> Eliminar
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el módulo.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteModule(module.id)}>Eliminar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>

                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            <p>Aún no se han añadido módulos.</p>
            <Button variant="link" className="mt-2" onClick={() => setIsAddModuleDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir un Módulo
            </Button>
          </div>
        )}
      </CardContent>
       <AddModuleDialog
        isOpen={isAddModuleDialogOpen}
        onClose={() => setIsAddModuleDialogOpen(false)}
        onAddModule={onAddModule}
      />
      {editingModule && (
        <EditModuleDialog
            isOpen={!!editingModule}
            onClose={() => setEditingModule(null)}
            onEditModule={onEditModule}
            module={editingModule}
        />
      )}
    </Card>
  );
}
