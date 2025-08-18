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
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { AddModuleDialog } from './add-module-dialog';
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

interface ModulesAccordionProps {
  modules: Module[];
  onAddModule: (module: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews'>) => void;
  onDeleteModule: (moduleId: string) => void;
}

export default function ModulesAccordion({ modules, onAddModule, onDeleteModule }: ModulesAccordionProps) {
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Development Modules</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsAddModuleDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Module
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
                    <p className="text-sm text-muted-foreground">
                      Deadline: {module.deadline.toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        <Edit className="mr-2 h-3 w-3" /> Edit
                      </Button>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" size="sm">
                              <Trash2 className="mr-2 h-3 w-3" /> Delete
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the module.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteModule(module.id)}>Delete</AlertDialogAction>
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
            <p>No modules have been added yet.</p>
            <Button variant="link" className="mt-2" onClick={() => setIsAddModuleDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add a Module
            </Button>
          </div>
        )}
      </CardContent>
       <AddModuleDialog
        isOpen={isAddModuleDialogOpen}
        onClose={() => setIsAddModuleDialogOpen(false)}
        onAddModule={onAddModule}
      />
    </Card>
  );
}
