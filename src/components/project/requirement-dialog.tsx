
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Requirement } from '@/lib/definitions';

interface RequirementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (requirement: Omit<Requirement, 'id'> | Requirement) => void;
  requirement: Requirement | null;
}

export function RequirementDialog({ isOpen, onClose, onSave, requirement }: RequirementDialogProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (requirement) {
      setTitle(requirement.title);
      setUrl(requirement.url);
    } else {
      setTitle('');
      setUrl('');
    }
  }, [requirement]);

  const handleSubmit = () => {
    if (title && url) {
      const requirementData = {
        title,
        url,
      };
      if (requirement) {
        onSave({ ...requirementData, id: requirement.id });
      } else {
        onSave(requirementData);
      }
      onClose();
    } else {
      alert('Por favor, rellene todos los campos.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{requirement ? 'Editar Requisito' : 'Añadir Nuevo Requisito'}</DialogTitle>
          <DialogDescription>
            {requirement ? 'Actualice los detalles del requisito.' : 'Rellene los detalles para añadir un nuevo requisito.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL del Documento
            </Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" onClick={handleSubmit}>
                {requirement ? 'Guardar Cambios' : 'Añadir Requisito'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
