import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import React from 'react';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid min-h-screen md:grid-cols-[230px_1fr]">
      <div className="bg-slate-800 text-slate-50">
        <Sidebar />
      </div>
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
