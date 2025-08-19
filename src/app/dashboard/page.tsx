
'use client';
import { useState } from 'react';
import { DUMMY_PROJECTS } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import ProjectCard from '@/components/dashboard/project-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Project } from '@/lib/definitions';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';
import { addProject } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);
  const { toast } = useToast();

  const handleAddProject = async (newProjectData: Omit<Project, 'id' | 'shareableLinkId' | 'modules' | 'timelineEvents' | 'changeRequests' | 'initialRequirements' | 'projectDocuments'>) => {
    const result = await addProject(newProjectData);
    if (result.success && result.project) {
        setProjects(prev => [result.project!, ...prev]);
        toast({
            title: 'Proyecto Creado',
            description: `El proyecto "${result.project.name}" ha sido creado.`,
        });
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'No se pudo crear el proyecto.',
        });
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Panel de Proyectos"
        description="Un resumen de todos tus proyectos en curso."
      >
        <Button onClick={() => setIsCreateProjectDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Nuevo Proyecto
        </Button>
      </PageHeader>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <CreateProjectDialog
        isOpen={isCreateProjectDialogOpen}
        onClose={() => setIsCreateProjectDialogOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
