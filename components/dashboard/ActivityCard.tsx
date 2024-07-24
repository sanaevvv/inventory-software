import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  number: number;
  unit: string;
  icon: LucideIcon;
  text: string;
  href: string;
};
export const ActivityCard = ({
  number,
  unit,
  icon: Icon,
  text,
  href,
}: Props) => {
  return (
    <li
      key={text}
      className="bg-white px-2 py-6 rounded-md hover:border-blue-400 border shadow"
    >
      <Link href={href} className="mb-4 grid justify-center">
        <span className="text-4xl font-semibold">{number}</span>
        <span className="text-slate-400 font-semibold text-sm">{unit}</span>
      </Link>
      <div className="flex justify-center items-center gap-1 text-slate-700 text-sm">
        <Icon strokeWidth={1} />
        <p>{text}</p>
      </div>
    </li>
  );
};
