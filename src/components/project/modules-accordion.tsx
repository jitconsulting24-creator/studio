import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Module } from '@/lib/definitions';
import StatusBadge from '../shared/status-badge';
import { Button } from '../ui/button';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface ModulesAccordionProps {
  modules: Module[];
}

export default function ModulesAccordion({ modules }: ModulesAccordionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Modules</CardTitle>
      </CardHeader>
      <CardContent>
        {modules.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {modules.map((module) => (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between pr-4">
                    <span className="font-semibold">{module.name}</span>
                    <StatusBadge status={module.status} />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-2">
                    <p className="text-sm text-muted-foreground">
                      Deadline: {module.deadline.toLocaleDateString()}
                    </p>
                    {/* Add more details about parts, stages, etc. here */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-3 w-3" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-3 w-3" /> Delete
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            <p>No modules have been added yet.</p>
            <Button variant="link" className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add a Module
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
