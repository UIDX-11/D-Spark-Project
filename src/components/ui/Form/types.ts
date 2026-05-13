import type { ReactNode } from 'react';
import type { ControllerRenderProps, FieldPath, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface FormProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  id?: string;
  className?: string;
  onSubmit?: SubmitHandler<T>;
  children?: ReactNode;
}

export interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  children: (args: { field: ControllerRenderProps<T, FieldPath<T>> }) => ReactNode;
}

export interface FormItemProps {
  label?: string;
  required?: boolean;
  htmlFor?: string;
  children?: ReactNode;
}

export interface FormMessageProps {
  name: string;
}
