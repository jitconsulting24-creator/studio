
'use client';
import { useState } from 'react';
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
import type { Lead } from '@/lib/definitions';
import { Loader2 } from 'lucide-react';

interface CreateLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (newLead: Omit<Lead, 'id' | 'createdAt' | 'formLink' | 'status'>) => Promise<void>;
}

export function CreateLeadDialog({ isOpen, onClose, onAddLead }: CreateLeadDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (name && email) {
      setIsSubmitting(true);
      await onAddLead({
        name,
        email,
        company
      });
      // No cerramos el diálogo aquí, esperamos a que el padre lo haga
      setIsSubmitting(false);
      // Reset fields
      setName('');
      setEmail('');
      setCompany('');
    } else {
        alert('Por favor, rellene el nombre y el correo electrónico.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Lead</DialogTitle>
          <DialogDescription>
            Rellene los detalles a continuación para crear un nuevo lead.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa
            </Label>
            <Input id="company" value={company} onChange={e => setCompany(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
