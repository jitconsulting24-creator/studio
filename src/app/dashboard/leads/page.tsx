
import { getClientRequirements, getLeads } from '@/lib/data';
import LeadsClientPage from '@/components/leads/leads-client-page';

export default async function LeadsPage() {
    const leadsData = await getLeads();
    const reqsData = await getClientRequirements();

    return <LeadsClientPage initialLeads={leadsData} initialRequirements={reqsData} />;
}
