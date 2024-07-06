import { Textarea } from '@nextui-org/react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface CustomTextAreaProps<T extends FieldValues> {
  id: keyof T;
  label: string;
  value?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
export default function CustomTextArea<T extends FieldValues>({
  id,
  label,
  value,
  register,
  errors,
}: CustomTextAreaProps<T>) {
  return (
    <div>
      <Textarea
        id={id as string}
        label={label}
        labelPlacement="outside"
        defaultValue={value ?? value}
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
