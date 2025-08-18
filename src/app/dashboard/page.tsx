'use client';
import { useState } from 'react';
import { DUMMY_PROJECTS } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import ProjectCard from '@/components/dashboard/project-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Project } from '@/lib/definitions';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);

  const handleAddProject = (newProjectData: Omit<Project, 'id' | 'shareableLinkId' | 'modules' | 'timelineEvents' | 'changeRequests' | 'initialRequirements'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: (projects.length + 1).toString(),
      shareableLinkId: `client-link-${Date.now()}`,
      modules: [],
      timelineEvents: [{
        actor: 'sistema',
        eventDate: new Date(),
        eventDescription: `Proyecto "${newProjectData.name}" creado.`
      }],
      changeRequests: [],
      initialRequirements: [],
    };
    setProjects(prev => [...prev, newProject]);
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
