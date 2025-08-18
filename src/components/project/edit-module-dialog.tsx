
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
import { Textarea } from '@/components/ui/textarea';
import type { Module } from '@/lib/definitions';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface EditModuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEditModule: (module: Module) => void;
  module: Module;
}

export function EditModuleDialog({ isOpen, onClose, onEditModule, module }: EditModuleDialogProps) {
  const [name, setName] = useState(module.name);
  const [description, setDescription] = useState(module.description || '');
  const [deadline, setDeadline] = useState<Date | undefined>(module.deadline);
  const [owner, setOwner] = useState(module.owner);
  const [estimatedHours, setEstimatedHours] = useState(module.estimatedHours);

  useEffect(() => {
    setName(module.name);
    setDescription(module.description || '');
    setDeadline(module.deadline);
    setOwner(module.owner);
    setEstimatedHours(module.estimatedHours);
  }, [module]);

  const handleSubmit = () => {
    if (name && description && deadline && owner && estimatedHours > 0) {
      onEditModule({
        ...module,
        name,
        description,
        deadline,
        owner,
        estimatedHours
      });
      onClose();
    } else {
        alert('Por favor, rellene todos los campos.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Módulo</DialogTitle>
          <DialogDescription>
            Actualice los detalles del módulo.
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
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" onClick={handleSubmit}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
