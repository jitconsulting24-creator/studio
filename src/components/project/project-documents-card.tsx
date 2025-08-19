
'use client'
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Folder, ExternalLink, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { Document } from '@/lib/definitions';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProjectDocumentsCardProps {
    documents: Document[];
    onAddDocument: (document: Omit<Document, 'id'>) => Promise<void>;
    isClientView?: boolean;
}

const AddDocumentDialog = ({ onAdd, onCancel }: { onAdd: (doc: Omit<Document, 'id'>) => Promise<void>, onCancel: () => void }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState<'Brief' | 'Observaciones' | 'Otro'>('Otro');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = async () => {
        if(name && url) {
            setIsSubmitting(true);
            await onAdd({name, url, type});
            setIsSubmitting(false);
        } else {
            alert('Nombre y URL son obligatorios.');
        }
    }

    return (
        <div className="p-4 border bg-background rounded-md mt-2 space-y-2">
            <Input placeholder="Nombre del Documento" value={name} onChange={e => setName(e.target.value)} className="w-full" />
            <Input placeholder="URL del Documento" value={url} onChange={e => setUrl(e.target.value)} className="w-full" />
             <Select value={type} onValueChange={(value) => setType(value as any)}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Brief">Brief</SelectItem>
                    <SelectItem value="Observaciones">Observaciones</SelectItem>
                    <SelectItem value="Acta de Reunión">Acta de Reunión</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                <Button onClick={handleAdd} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Añadir
                </Button>
            </div>
        </div>
    )
}

export default function ProjectDocumentsCard({ documents, onAddDocument, isClientView = false }: ProjectDocumentsCardProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddDocument = async (doc: Omit<Document, 'id'>) => {
        await onAddDocument(doc);
        setIsAdding(false);
    }

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Folder className="h-6 w-6 text-primary" />
                    <CardTitle>Documentos del Proyecto</CardTitle>
                </div>
                {!isClientView && (
                    <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)} disabled={isAdding}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir
                    </Button>
                )}
            </div>
            <CardDescription>
                Brief, observaciones y otros documentos generales del proyecto.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {isAdding && <AddDocumentDialog onAdd={handleAddDocument} onCancel={() => setIsAdding(false)} />}
            {documents.length > 0 ? (
                <ul className="space-y-2 mt-4">
                    {documents.map((doc) => (
                    <li key={doc.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{doc.name} <span className="text-xs text-muted-foreground">({doc.type})</span></span>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={doc.url} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    </li>
                    ))}
                </ul>
            ) : (
                 !isAdding && <p className="text-sm text-muted-foreground text-center py-4">No se han añadido documentos al proyecto.</p>
            )}
        </CardContent>
    </Card>
  );
}
