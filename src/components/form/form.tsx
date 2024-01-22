import { memo, useCallback } from 'react';
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  onSubmit: (values: T) => void;
  form: UseFormReturn<T>;
} & Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit' | 'form'>;

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  form,
  ...formConfig
}: React.PropsWithChildren<FormProps<T>>) => {
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
      void form.handleSubmit(data => onSubmit(data))(e);
    },
    [form, onSubmit]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} noValidate {...formConfig}>
        {children}
      </form>
    </FormProvider>
  );
};

export default memo(Form) as typeof Form;
