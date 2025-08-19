
import { getLeadById } from '@/lib/data';
import { notFound } from 'next/navigation';
import LeadFormClient from '@/components/leads/lead-form-client';

export default async function LeadFormPage({ params }: { params: { leadId: string } }) {
  const lead = await getLeadById(params.leadId);

  if (!lead) {
    notFound();
  }

  return <LeadFormClient leadId={params.leadId} />;
}
