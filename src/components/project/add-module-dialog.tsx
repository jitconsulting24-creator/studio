
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
import { Textarea } from '@/components/ui/textarea';
import type { Module } from '@/lib/definitions';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AddModuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModule: (newModule: Omit<Module, 'id'| 'parts' | 'stages' | 'requirements' | 'reviews' | 'deliverables' | 'documents'>) => Promise<void>;
}

export function AddModuleDialog({ isOpen, onClose, onAddModule }: AddModuleDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [owner, setOwner] = useState('');
  const [estimatedHours, setEstimatedHours] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (name && description && deadline && owner && estimatedHours > 0) {
      setIsSubmitting(true);
      await onAddModule({
        name,
        description,
        deadline,
        status: 'Pendiente',
        owner,
        estimatedHours
      });
      setIsSubmitting(false);
      onClose();
      // Reset fields
      setName('');
      setDescription('');
      setDeadline(undefined);
      setOwner('');
      setEstimatedHours(0);
    } else {
        alert('Por favor, rellene todos los campos.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Módulo</DialogTitle>
          <DialogDescription>
            Rellene los detalles a continuación para añadir un nuevo módulo al proyecto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Fecha Límite
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                    "w-[240px] justify-start text-left font-normal col-span-3",
                    !deadline && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP", { locale: es }) : <span>Elige una fecha</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                    locale={es}
                />
                </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="owner" className="text-right">
              Responsable
            </Label>
            <Input id="owner" value={owner} onChange={e => setOwner(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimatedHours" className="text-right">
              Horas Est.
            </Label>
            <Input id="estimatedHours" type="number" value={estimatedHours} onChange={e => setEstimatedHours(parseInt(e.target.value, 10))} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Añadir Módulo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
