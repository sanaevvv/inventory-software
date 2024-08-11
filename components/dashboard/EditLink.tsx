import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { FilePenLine } from 'lucide-react';

type Props = {
  id: string,
  entity: string
}
export const EditLink = ({ id, entity }:Props) => {
  return (
    <Link href={`/dashboard/inventory/${entity}/${id}/edit`}>
      <Button variant="ghost" className="w-full justify-between">
        Edit <FilePenLine strokeWidth={1.7} size={20} />
      </Button>
    </Link>
  );
};
