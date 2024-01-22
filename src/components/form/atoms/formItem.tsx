import { forwardRef, useId } from 'react';

import { cn } from '@/utils/cn';

import { FormItemContext } from '../context/formItem.context';

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = 'FormItem';

export { FormItem };
