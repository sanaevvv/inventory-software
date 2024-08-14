import { DashboardBanner } from '@/components/dashboard/DashboardBanner';
import { SalesOverview } from '@/components/dashboard/SalesOverview';

export const runtime = 'edge';

const InventoryDashboardPage = () => {
  return (
    <div className="bg-slate-100 p-4 min-h-screen">
      <DashboardBanner />
      <SalesOverview />
    </div>
  );
};

export default InventoryDashboardPage;
