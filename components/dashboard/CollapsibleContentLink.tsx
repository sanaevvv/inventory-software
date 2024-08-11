import React from 'react';
import { CollapsibleContent } from '../ui/collapsible';
import { CollapsibleLink } from './CollapsibleLink';

type Props = {
  links: {
    label: string;
    href: string;
  }[];
};

export const CollapsibleContentLink = ({ links }: Props) => {
  return (
    <CollapsibleContent className="flex flex-col gap-1 pl-8">
      <ul>
        {links.map(({ label, href }) => (
          <CollapsibleLink key={label} label={label} href={href} />
        ))}
      </ul>
    </CollapsibleContent>
  );
};
