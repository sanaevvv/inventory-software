import Image from 'next/image';

type Props = {
  imageUrl: string;
  alt: string;
};

export const InventoryImage = ({ imageUrl, alt }: Props) => {
  return (
    <>
      {imageUrl ? (
        <div className="relative w-10 h-10">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}
    </>
  );
};
