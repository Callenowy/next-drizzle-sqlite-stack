import { forwardRef } from 'react';
import type * as LabelPrimitive from '@radix-ui/react-label';

import { Label } from '@/components/label';
import { cn } from '@/utils/cn';

import { useFormField } from '../hooks/useFormField.hook';

const FormLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});

FormLabel.displayName = 'FormLabel';

export { FormLabel };
