import { Select, SelectItem } from '@nextui-org/react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface CustomSelectProps<T extends FieldValues> {
  id: keyof T;
  label: string;
  register: UseFormRegister<T>;
  value?: number;
  errors: FieldErrors<T>;
  options: { value: string; label: string }[];
}

export default function CustomSelect<T extends FieldValues>({
  id,
  label,
  register,
  value,
  errors,
  options,
}: CustomSelectProps<T>) {
  return (
    <div>
      <Select
        id={id as string}
        label={label}
        labelPlacement="outside"
        variant="faded"
        defaultSelectedKeys={`${value}` ?? [`${value}`]}
        classNames={{
          label: 'font-roboto-condensed',
          value: 'font-quicksand font-medium',
          listbox: 'font-quicksand font-medium',
        }}
        size="lg"
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
