import ProjectDetailsClientPage from '@/components/project/project-details-client-page';
import { DUMMY_PROJECTS } from '@/lib/data';
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
        <ProjectDetailsClientPage initialProject={project} />
    </div>
  );
}
