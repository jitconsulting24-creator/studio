'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { addChangeRequest } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                'Enviando...'
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" /> Enviar Solicitud
                </>
            )}
        </Button>
    )
}

export default function ChangeRequestForm({ projectId }: { projectId: string }) {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const result = await addChangeRequest(projectId, formData);
        if (result?.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error,
            });
        } else {
             toast({
                title: '¡Éxito!',
                description: result.success,
                className: 'bg-accent text-accent-foreground border-green-500'
            });
            formRef.current?.reset();
        }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar un Cambio</CardTitle>
        <CardDescription>
          ¿Tiene una nueva idea o necesita ajustar algo? Háganoslo saber.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <Textarea
            name="requestDetails"
            placeholder="Por favor, describa detalladamente el cambio que le gustaría solicitar."
            rows={5}
            required
          />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
