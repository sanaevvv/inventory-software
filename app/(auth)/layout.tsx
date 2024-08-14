export const runtime = 'edge';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="min-h-screen grid place-items-center bg-slate-50">
      {children}
    </section>
  );
};

export default AuthLayout;
