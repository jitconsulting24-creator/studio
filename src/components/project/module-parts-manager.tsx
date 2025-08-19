
'use client';

import { useState } from 'react';
import type { Part } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModulePartsManagerProps {
  parts: Part[];
  onPartsChange?: (updatedParts: Part[]) => Promise<void>;
  isClientView?: boolean;
}

export default function ModulePartsManager({ parts, onPartsChange, isClientView = false }: ModulePartsManagerProps) {
  const [currentParts, setCurrentParts] = useState(parts);
  const [newPartName, setNewPartName] = useState('');
  const [editingPartId, setEditingPartId] = useState<string | null>(null);
  const [editingPartName, setEditingPartName] = useState('');
  const { toast } = useToast();

  const triggerChange = async (updatedParts: Part[]) => {
    setCurrentParts(updatedParts);
    if (onPartsChange) {
        await onPartsChange(updatedParts);
        toast({
            title: 'Tareas Actualizadas',
            description: 'La lista de tareas ha sido actualizada.'
        });
    }
  };

  const handleAddPart = () => {
    if (newPartName.trim() === '') return;
    const newPart: Part = {
      id: `part-${Date.now()}`,
      name: newPartName.trim(),
      status: 'Pendiente',
    };
    triggerChange([...currentParts, newPart]);
    setNewPartName('');
  };

  const handleDeletePart = (partId: string) => {
    triggerChange(currentParts.filter((part) => part.id !== partId));
  };

  const handleToggleStatus = (partId: string) => {
    triggerChange(
      currentParts.map((part) =>
        part.id === partId
          ? {
              ...part,
              status: part.status === 'Completado' ? 'Pendiente' : 'Completado',
            }
          : part
      )
    );
  };

  const startEditing = (part: Part) => {
    setEditingPartId(part.id);
    setEditingPartName(part.name);
  };

  const cancelEditing = () => {
    setEditingPartId(null);
    setEditingPartName('');
  };

  const handleEditPart = () => {
    if (editingPartName.trim() === '' || !editingPartId) return;
    triggerChange(
      currentParts.map((part) =>
        part.id === editingPartId ? { ...part, name: editingPartName.trim() } : part
      )
    );
    cancelEditing();
  };

  return (
    <div className="space-y-2 rounded-md border p-2 bg-muted/30">
      <ul className="space-y-2">
        {currentParts.map((part) => (
          <li key={part.id} className="flex items-center gap-2 text-sm">
            <Checkbox
              id={`part-${part.id}`}
              checked={part.status === 'Completado'}
              onCheckedChange={() => handleToggleStatus(part.id)}
              aria-label={`Marcar '${part.name}' como ${part.status === 'Completado' ? 'pendiente' : 'completado'}`}
              disabled={isClientView || !onPartsChange}
            />
            {editingPartId === part.id && !isClientView ? (
              <Input
                type="text"
                value={editingPartName}
                onChange={(e) => setEditingPartName(e.target.value)}
                className="h-8 flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleEditPart()}
              />
            ) : (
              <label
                htmlFor={`part-${part.id}`}
                className={`flex-1 ${!isClientView && onPartsChange ? 'cursor-pointer' : ''} ${
                  part.status === 'Completado' ? 'text-muted-foreground line-through' : ''
                }`}
              >
                {part.name}
              </label>
            )}

            {!isClientView && onPartsChange && (
                <>
                    {editingPartId === part.id ? (
                    <>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleEditPart}>
                        <Save className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={cancelEditing}>
                        <X className="h-4 w-4" />
                        </Button>
                    </>
                    ) : (
                    <>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEditing(part)}>
                        <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeletePart(part.id)}>
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </>
                    )}
                </>
            )}
          </li>
        ))}
      </ul>
      {!isClientView && onPartsChange && (
          <div className="flex gap-2 pt-2">
            <Input
            type="text"
            placeholder="Añadir nueva tarea..."
            value={newPartName}
            onChange={(e) => setNewPartName(e.target.value)}
            className="h-8 flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAddPart()}
            />
            <Button size="sm" onClick={handleAddPart}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir
            </Button>
        </div>
      )}
    </div>
  );
}
