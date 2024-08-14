import Link from "next/link";

export const runtime = 'edge';

export default function Home() {
  return (
    <div className="grid place-content-center min-h-screen">
      <h2 className="text-3xl">
        Inventory Management Software
      </h2>
      <Link href="/dashboard/home/overview" className="text-center mt-4">View Dashboard</Link>
    </div>

  );
}
