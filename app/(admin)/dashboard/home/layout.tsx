import HomeTabs from '@/components/dashboard/HomeTabs';
import React from 'react'

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>
    <HomeTabs />
    {children}
  </div>;
};

export default HomeLayout
