import AppHeader from '@/components/layout/app-header';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
            <AppHeader />
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </div>
        </main>
      </div>
    </div>
  );
}
