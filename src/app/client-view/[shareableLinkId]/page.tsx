import { DUMMY_PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import ClientPortalView from '@/components/client/client-portal-view';

export default function ClientViewPage({
  params,
}: {
  params: { shareableLinkId: string };
}) {
  const project = DUMMY_PROJECTS.find(
    (p) => p.shareableLinkId === params.shareableLinkId
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <ClientPortalView project={project} />
    </div>
  );
}
