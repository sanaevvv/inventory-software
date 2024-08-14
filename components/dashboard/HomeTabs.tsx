'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tabs = [
  {
    label: 'Dashboard',
    href: '/dashboard/home/overview',
  },
  {
    label: 'Getting Started',
    href: '/dashboard/home/getting-started',
  },
  {
    label: 'Recent Updates',
    href: '/dashboard/home/updates',
  },
  {
    label: 'Announcements',
    href: '/dashboard/home/announcements',
  },
];

type Props = {
  user: string
};

const HomeTabs = ({ user }: Props) => {
  const pathname = usePathname();

    return(
    <div
      className="bg-repeat p-8 border-b"
      style={{
        backgroundImage: `url('/home-header-bg-zom-f063611a9d.svg')`,
        width: '100%',
        height: '138px',
      }}
    >
      <div className="mb-6">
        <p className="font-semibold text-xl text-slate-700">Hello, {user}</p>
        <p className="text-muted-foreground">Demo Org</p>
      </div>
      <ul className="flex gap-6 pb-3">
        {Tabs.map(({ label, href }) => (
          <li
            key={label}
            className={`${
              pathname === href ? 'border-b-2 border-pink-600 pb-1' : 'pb-1'
            }`}
          >
            <Link href={href} className="px-1">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeTabs;
