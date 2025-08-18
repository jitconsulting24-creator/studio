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
                'Submitting...'
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" /> Submit Request
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
                title: 'Success!',
                description: result.success,
                className: 'bg-accent text-accent-foreground border-green-500'
            });
            formRef.current?.reset();
        }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Change</CardTitle>
        <CardDescription>
          Have a new idea or need to adjust something? Let us know.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <Textarea
            name="requestDetails"
            placeholder="Please describe the change you'd like to request in detail."
            rows={5}
            required
          />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
