import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  body: string;
  href: string;
  buttonText: string;
  icon: LucideIcon;
  enabled?: boolean;
};

export const ItemCard = ({
  title,
  body,
  href,
  buttonText,
  icon: Icon,
  enabled=false,
}: Props) => {
  return (
    <li
      key={title}
      className="bg-white flex flex-col justify-center items-center py-8 gap-8 shadow rounded-md"
    >
      <p className="font-bold text-2xl text-slate-700">{title}</p>

      <Icon size={72} strokeWidth={1} className="text-slate-700" />

      <p className="text-slate-700 px-6 text-center">{body}</p>

      {enabled ? (
        <Link href={href} className="">
          <Button className="w-40" variant="green">
            {buttonText}
          </Button>
        </Link>
      ) : (
        <Button className="w-40" variant="green">
          Enable
        </Button>
      )}
    </li>
  );
};
