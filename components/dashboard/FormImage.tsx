import { UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { OurFileRouter } from '@/app/api/uploadthing/core';

type Props = {
  label: string;
  form: UseFormReturn<any>;
  className?: string;
  endpoint: EndpointKey;
};

type EndpointKey = keyof OurFileRouter;

export const FormImage = ({ label, form, className, endpoint }: Props) => {
  const imageUrl = useWatch({
    control: form.control,
    name: 'imageUrl',
  });

  return (
    <div className={className}>
      <Label>{label}</Label>
      {imageUrl ? (
        <>
          <div className="flex justify-end mb-6">
            <Button
              className="w-[200px]"
              onClick={() => {
                form.setValue('imageUrl', '', { shouldValidate: true });
              }}
            >
              <Pencil className="pr-2" />
              Change Image
            </Button>
          </div>
          <div className="relative h-64">
            <Image src={imageUrl} alt="Item image" fill />
          </div>
        </>
      ) : (
        <UploadDropzone
          className="cursor-pointer"
          endpoint={endpoint as EndpointKey}
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              const url = res[0].url;
              form.setValue('imageUrl', url, { shouldValidate: true });
              alert('Upload Completed');
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
};
