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
      className={`${
        pathname === href
          ? 'bg-pink-600/80 rounded-sm'
          : ''
      }`}
    >
      <Link href={href}>
        <Button
          variant="ghost"
          className="hover:bg-white/80 justify-start w-full text-base pl-6 rounded-sm"
        >
          {label}
        </Button>
      </Link>
    </li>
  );
};
