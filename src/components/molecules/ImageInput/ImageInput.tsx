import { Button } from '@nextui-org/react';
import React, { useState } from 'react';

interface InputImageProps {
    fileState: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
    inputLabel?: string;
    className?: string;
}

export default function InputImage({ fileState, inputLabel, className }: InputImageProps) {
    const [file, setFile] = fileState
    const [preview, setPreview] = useState<string | null>(file ? URL.createObjectURL(file) : null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0] || null;
        setFile(newFile);
        setPreview(newFile ? URL.createObjectURL(newFile) : null);
    };

    const handleClick = () => document.getElementById('file-input')?.click()

    const handleReset = () => {
        setFile(null);
        setPreview(null);
    }

    return (
        <div className={"flex flex-col items-center space-y-4" + " " + className}>
            <div
                className={`w-full min-h-[250px] max-h-[250px] flex items-center justify-center bg-gray-200/10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer ${preview ? 'hidden' : ''
                    }`}
                onClick={handleClick}
            >
                <span className="text-white font-quicksand font-medium text-lg">
                    {inputLabel || 'Click here to upload an image'}
                </span>
            </div>
            {preview && (
                <div className="flex flex-col gap-2">
                    <img
                        src={preview}
                        alt="Image preview"
                        className="w-full min-h-[250px] max-h-[250px] object-cover rounded-lg shadow-md"
                    />
                    <div className='flex w-full gap-2 justify-evenly'>
                        <Button
                            type="button"
                            onClick={handleClick}
                            color='primary'
                            variant='flat'
                            className='flex-1'
                        >
                            Cambiar foto
                        </Button>
                        <Button
                            type="button"
                            onClick={handleReset}
                            className='flex-1'
                            color='danger'
                            variant='flat'
                        >
                            Eliminar foto
                        </Button>
                    </div>
                </div>
            )}
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
}
