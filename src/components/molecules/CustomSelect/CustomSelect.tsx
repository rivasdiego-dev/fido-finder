import { Select, SelectItem } from '@nextui-org/react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface CustomSelectProps<T extends FieldValues> {
    id: keyof T;
    label: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    options: { value: string; label: string }[];
}

export default function CustomSelect<T extends FieldValues>({ id, label, register, errors, options }: CustomSelectProps<T>) {
    return (
        <div>
            <Select
                id={id as string}
                label={label}
                variant='faded'
                isInvalid={!!errors[id]}
                errorMessage={errors[id]?.message as string}
                {...register(id as Path<T>)}
            >
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
