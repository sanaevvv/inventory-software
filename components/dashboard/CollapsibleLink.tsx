'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

type Props = {
  label: string;
  href: string;
};

export const CollapsibleLink = ({ label, href }: Props) => {
  const pathname = usePathname();
  return (
    <li
      className={`rounded hover:rounded ${
        pathname === href ? 'bg-white/70 text-slate-800' : ''
      }`}
    >
      <Link href={href}>
        <Button
          variant="ghost"
          className={`justify-start text-base pl-6 w-full font-light hover:bg-white/70`}
        >
          {label}
        </Button>
      </Link>
    </li>
  );
};
