
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
import { Loader2 } from 'lucide-react';

interface RequirementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (requirement: Omit<Requirement, 'id'> | Requirement) => Promise<void>;
  requirement: Requirement | null;
}

export function RequirementDialog({ isOpen, onClose, onSave, requirement }: RequirementDialogProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (requirement) {
      setTitle(requirement.title);
      setUrl(requirement.url);
    } else {
      setTitle('');
      setUrl('');
    }
  }, [requirement]);

  const handleSubmit = async () => {
    if (title && url) {
      setIsSubmitting(true);
      const requirementData = {
        title,
        url,
      };
      if (requirement) {
        await onSave({ ...requirementData, id: requirement.id });
      } else {
        await onSave(requirementData);
      }
      setIsSubmitting(false);
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
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {requirement ? 'Guardar Cambios' : 'Añadir Requisito'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
