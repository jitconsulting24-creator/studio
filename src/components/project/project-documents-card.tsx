
'use client'
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Folder, ExternalLink, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import type { Document } from '@/lib/definitions';
// This component can be a simple dialog for adding a document name and URL for now.
// A real implementation would involve file uploads.

interface ProjectDocumentsCardProps {
    documents: Document[];
    onAddDocument: (document: Omit<Document, 'id'>) => void;
}

// A simple dialog for adding documents. In a real app, this would be more robust.
const AddDocumentDialog = ({ onAdd, onCancel }: { onAdd: (doc: Omit<Document, 'id'>) => void, onCancel: () => void }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('#'); // Placeholder URL
    const [type, setType] = useState<'Brief' | 'Observaciones' | 'Otro'>('Otro');

    const handleAdd = () => {
        if(name) {
            onAdd({name, url, type});
        }
    }
    return (
        <div className="p-4 border bg-background rounded-md mt-2 space-y-2">
            <input placeholder="Nombre del Documento" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-md" />
            <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} className="w-full p-2 border rounded-md" />
            <select value={type} onChange={e => setType(e.target.value as any)} className="w-full p-2 border rounded-md">
                <option>Brief</option>
                <option>Observaciones</option>
                <option>Otro</option>
            </select>
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                <Button onClick={handleAdd}>Añadir</Button>
            </div>
        </div>
    )
}


export default function ProjectDocumentsCard({ documents, onAddDocument }: ProjectDocumentsCardProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddDocument = (doc: Omit<Document, 'id'>) => {
        onAddDocument(doc);
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
                <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir
                </Button>
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
