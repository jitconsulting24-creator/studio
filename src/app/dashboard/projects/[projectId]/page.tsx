
import ProjectDetailsClientPage from '@/components/project/project-details-client-page';
import { getProjectById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProjectById(params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto">
        <ProjectDetailsClientPage initialProject={project} />
    </div>
  );
}
