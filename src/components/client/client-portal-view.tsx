import type { Project } from '@/lib/definitions';
import { FolderKanban } from 'lucide-react';
import StatusBadge from '../shared/status-badge';
import ProjectHeader from '../project/project-header';
import ModulesAccordion from '../project/modules-accordion';
import TimelineView from '../project/timeline-view';
import ProjectDocumentsCard from '../project/project-documents-card';
import RequirementsCard from '../project/requirements-card';
import ChangeRequestForm from './change-request-form';

export default function ClientPortalView({ project }: { project: Project }) {
  
  return (
    <>
      <header className="bg-card border-b py-4 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">ProPlanner</h1>
            </div>
            <StatusBadge status={project.status} />
        </div>
      </header>

      <main className="container mx-auto py-8">
         <div className="space-y-8">
            <ProjectHeader project={project} isClientView={true} />
            
            <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
                <div className="lg:col-span-2 space-y-8">
                <ModulesAccordion 
                    projectId={project.id}
                    modules={project.modules} 
                    isClientView={true}
                />
                <TimelineView events={project.timelineEvents} />
                </div>

                <div className="space-y-8">
                <ProjectDocumentsCard 
                    documents={project.projectDocuments || []} 
                    isClientView={true}
                    />
                <RequirementsCard 
                    projectId={project.id}
                    requirements={project.initialRequirements} 
                    projectDescription={project.description}
                    isClientView={true}
                />
                <ChangeRequestForm projectId={project.id} />
                </div>
            </div>
            </div>
      </main>
      
      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ProPlanner. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
