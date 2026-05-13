import { Controller, FormProvider, useFormContext, type FieldValues, type SubmitHandler } from 'react-hook-form';
import type { FormFieldProps, FormItemProps, FormMessageProps, FormProps } from './types';

export function Form<T extends FieldValues = FieldValues>({ form, id, className, onSubmit, children }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form id={id} className={className} onSubmit={onSubmit ? form.handleSubmit(onSubmit as SubmitHandler<T>) : (e) => e.preventDefault()}>
        {children}
      </form>
    </FormProvider>
  );
}

export function FormField<T extends FieldValues = FieldValues>({ name, children }: FormFieldProps<T>) {
  const { control } = useFormContext<T>();
  return <Controller name={name} control={control} render={({ field }) => <>{children({ field })}</>} />;
}

export function FormItem({ label, required, htmlFor, children }: FormItemProps) {
  return (
    <div className="flex flex-col gap-[length:var(--ds-space-2)]">
      {label ? (
        <label
          htmlFor={htmlFor}
          className="text-[length:var(--ds-font-caption)] font-medium text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]"
        >
          {label}
          {required ? <span className="text-[var(--destructive)]"> *</span> : null}
        </label>
      ) : null}
      {children}
    </div>
  );
}

export function FormMessage({ name }: FormMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const err = errors[name];
  const msg = err?.message != null ? String(err.message) : null;
  if (!msg) return null;
  return (
    <p className="text-[length:var(--ds-font-caption)] text-[var(--destructive)]" role="alert">
      {msg}
    </p>
  );
}
