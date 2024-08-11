'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

type Props = {
  headerText:string
};
const NewHeader = ({ headerText }: Props) => {
  const router = useRouter();
   const handleBack = () => {
     router.back();
   };
  return (
    <header className="flex items-center justify-between py-3 px-8">
      <h2 className="font-bold text-2xl px-2">
        {headerText}
      </h2>
      <Button variant={'ghost'} onClick={handleBack}>
        <X />
      </Button>
    </header>
  );
};

export default NewHeader
