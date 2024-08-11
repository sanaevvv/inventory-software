import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import React from 'react';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr]">
      <div className="hidden md:block bg-slate-800 text-slate-50">
        <Sidebar />
      </div>
      <main>
        {/* <div className="hidden md:block"> */}
          <Header />
        {/* </div> */}

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
