import { auth } from '@/auth';
import HomeTabs from '@/components/dashboard/HomeTabs';
export const runtime = 'edge';

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (!session) return null;
  const username = session.user?.name ?? '';

  return (
    <div>
      <HomeTabs user={username} />
      {children}
    </div>
  );
};

export default HomeLayout;
