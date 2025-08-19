
import { getProjects } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import ProjectCard from '@/components/dashboard/project-card';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ProjectGrid from '@/components/dashboard/project-grid';


export default async function DashboardPage() {
  // Fetch data on the server
  const projects = await getProjects();

  return (
    <div className="container mx-auto">
       <Suspense fallback={
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <ProjectGrid initialProjects={projects} />
      </Suspense>
    </div>
  );
}
