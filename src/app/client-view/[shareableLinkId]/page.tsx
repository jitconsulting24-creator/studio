
import { getProjectById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ClientPortalView from '@/components/client/client-portal-view';

export default async function ClientViewPage({
  params,
}: {
  params: { shareableLinkId: string };
}) {
  const project = await getProjectById(params.shareableLinkId);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <ClientPortalView project={project} />
    </div>
  );
}
