import { forwardRef } from 'react';

import { cn } from '@/utils/cn';
import { useFormField } from '../hooks/useFormField.hook';
import { Icon } from '@/components/icon';

const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      role="status"
      className={cn(
        'flex items-center gap-2 text-xs font-medium text-red-500',
        className
      )}
      {...props}
    >
      <Icon
        id={`icon-error`}
        sprite="/svg-sprites/icons.svg"
        aria-hidden="true"
        className="h-auto w-4"
      />
      {body}
    </p>
  );
});

FormMessage.displayName = 'FormMessage';

export { FormMessage };
