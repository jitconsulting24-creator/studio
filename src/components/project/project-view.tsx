import type { Project } from '@/lib/definitions';
import ProjectHeader from './project-header';
import RequirementsCard from './requirements-card';
import ModulesAccordion from './modules-accordion';
import TimelineView from './timeline-view';
import ChangeRequestsList from './change-requests-list';
import { Card } from '../ui/card';

export default function ProjectView({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />
      
      <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2 space-y-8">
          <ModulesAccordion modules={project.modules} />
          <TimelineView events={project.timelineEvents} />
        </div>

        <div className="space-y-8">
          <RequirementsCard requirements={project.initialRequirements} />
          <ChangeRequestsList requests={project.changeRequests} />
        </div>
      </div>
    </div>
  );
}
