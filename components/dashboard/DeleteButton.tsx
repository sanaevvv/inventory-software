'use client';

import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { useState } from 'react';

type Props = {
  id: number;
  onDelete: (id: number) => Promise<{
    success: boolean;
    message: string;
  }>;
};

export const DeleteButton = ({ id, onDelete}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await onDelete(id);

      if (result.success) {
        toast({
          variant: 'default',
          title: result.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '削除に失敗しました',
          description: result.message || 'Unknown error occurred',
        });
      }
    } catch (error) {
       toast({
         variant: 'destructive',
         title: '削除に失敗しました',
         description:
           error instanceof Error ? error.message : 'Unknown error occurred',
       });
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Button
      variant={'ghost'}
      onClick={handleDelete}
      className="w-full justify-between"
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete Button'}
      <Trash2 strokeWidth={1.4} size={22} />
    </Button>
  );
};
