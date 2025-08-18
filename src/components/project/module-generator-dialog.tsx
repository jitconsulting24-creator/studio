'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { moduleGenerator } from '@/ai/flows/module-generator';
import type { ModuleGeneratorOutput } from '@/ai/flows/module-generator';

export function ModuleGeneratorDialog() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ModuleGeneratorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!description) {
      setError('Please enter a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const output = await moduleGenerator({ projectDescription: description });
      setResult(output);
    } catch (e) {
      setError('Failed to generate modules. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Module Generator
          </DialogTitle>
          <DialogDescription>
            Describe the project, and the AI will break it down into manageable modules.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea
              id="project-description"
              placeholder="e.g., 'Build a social media app with photo sharing and a news feed.'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center rounded-md border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {result && (
          <div>
            <h3 className="font-semibold mb-2">Generated Modules:</h3>
            <div className="max-h-60 overflow-y-auto space-y-4 rounded-md border p-4">
              {result.modules.map((module, index) => (
                <div key={index} className="text-sm">
                  <p className="font-bold">{module.name}</p>
                  <p className="text-muted-foreground">{module.description}</p>
                  <div className="flex gap-4 text-xs mt-1 text-muted-foreground">
                    <span>Owner: {module.owner}</span>
                    <span>Deadline: {module.deadline}</span>
                    <span>Hours: {module.estimatedHours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Modules
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
