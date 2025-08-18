import { DUMMY_PROJECTS } from '@/lib/data';
import ProjectView from '@/components/project/project-view';
import { notFound } from 'next/navigation';

export default function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = DUMMY_PROJECTS.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <ProjectView project={project} />
    </div>
  );
}
