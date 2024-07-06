import { Input } from '@nextui-org/react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  id: keyof T;
  label: string;
  register: UseFormRegister<T>;
  value?: string;
  errors: FieldErrors<T>;
  placeholder?: string;
}

export default function CustomInput<T extends FieldValues>({
  id,
  label,
  register,
  value,
  errors,
  placeholder,
}: CustomInputProps<T>) {
  return (
    <div>
      <Input
        id={id as string}
        label={label}
        defaultValue={value ?? value}
        labelPlacement="outside"
        placeholder={placeholder}
        classNames={{
          label: 'font-roboto-condensed',
          input: 'font-quicksand font-medium',
        }}
        size="lg"
        variant="faded"
        isInvalid={!!errors[id]}
        errorMessage={errors[id]?.message as string}
        {...register(id as Path<T>)}
      />
    </div>
  );
}
