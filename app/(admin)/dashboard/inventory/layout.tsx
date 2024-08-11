import { InventoryHeader } from '@/components/dashboard/InventoryHeader';

const InventoryLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <>
      <div className="bg-slate-100">
        <div className="md:container px-4 py-3">
          <InventoryHeader />
        </div>
      </div>
      <main className="bg-slate-200 min-h-screen">
        <div className="md:container pt-4 px-4">{children}</div>
      </main>
    </>
  );
};

export default InventoryLayout;
