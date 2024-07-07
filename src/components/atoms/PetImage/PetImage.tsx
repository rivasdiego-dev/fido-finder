import { Button } from '@nextui-org/react';

type PetImageProps = {
  src: string;
  alt: string;
  petName: string;
  description?: string;
  className?: string;
  bottomAction?: () => void;
  bottomActionLabel?: string;
};

export default function PetImage({
  src,
  alt,
  petName,
  description,
  className,
  bottomAction,
  bottomActionLabel,
}: PetImageProps) {
  const petImage = src ? src : '/img/pets.png';

  return (
    <div
      className={`relative w-auto min-h-[250px] max-h-[250px] h-[250px] flex justify-center items-center overflow-hidden rounded-lg ${className}`}
    >
      <img src={petImage} alt={alt} className={`object-cover w-full h-full`} />
      <div className="flex flex-col justify-end absolute bottom-0 w-full bg-gradient-to-t h-full from-black to-transparent via-transparent p-2">
        <p className="font-quicksand font-bold text-3xl text-b-base-text">
          {petName}
        </p>
        <div className="flex justify-between items-center">
          <p className="font-quicksand font-bold text-base text-b-base-text overflow-hidden whitespace-nowrap text-ellipsis">
            {description}
          </p>
          {bottomAction && bottomActionLabel ? (
            <Button
              onClick={bottomAction}
              variant="flat"
              color="primary"
              className="font-poppins font-semibold bg-primary/40"
            >
              {' '}
              {bottomActionLabel}{' '}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
