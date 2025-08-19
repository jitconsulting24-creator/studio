
import ProjectDetailsClientPage from '@/components/project/project-details-client-page';
import { getProjectById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projects = await getProjectById(params.projectId);

  if (!projects || projects.length === 0) {
    notFound();
  }
  const project = projects[0];

  return (
    <div className="container mx-auto">
        <ProjectDetailsClientPage initialProject={project} />
    </div>
  );
}
