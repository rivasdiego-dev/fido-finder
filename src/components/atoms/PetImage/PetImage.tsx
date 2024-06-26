type PetImageProps = {
    src: string;
    alt: string;
    petName: string;
    description?: string;
    fullWidth?: boolean;
}

export default function PetImage({
    src,
    alt,
    petName,
    description,
}: PetImageProps) {
    return (
        <div className={`relative w-auto h-auto min-h-[250px] max-h-[250px] flex justify-center items-center overflow-hidden rounded-lg`}>
            <img src={src} alt={alt} className={`object-cover w-auto h-full`} />
            <div className="flex flex-col justify-end absolute bottom-0 w-full bg-gradient-to-t h-full from-black to-transparent via-transparent p-2">
                <p className="font-quicksand font-bold text-3xl text-b-base-text">{petName}</p>
                <div className="flex justify-between">
                    <p className="font-quicksand font-bold text-base text-b-base-text">{description}</p>
                </div>
            </div>
        </div>
    )
}
