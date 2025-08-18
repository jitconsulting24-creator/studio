import { DUMMY_PROJECTS } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import ProjectCard from '@/components/dashboard/project-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Projects Dashboard"
        description="An overview of all your ongoing projects."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </PageHeader>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DUMMY_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
