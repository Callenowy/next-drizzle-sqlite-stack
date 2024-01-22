import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const inputVariants = cva(
  'border bg-white text-black rounded-[5px] appearance-none outline-none transition-colors w-full px-4 placeholder:text-grey-500 border-grey-300 hover:border-grey-600 focus:border-blue-400 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:border-grey-500',
  {
    variants: {
      size: {
        sm: 'h-9 text-sm',
        md: 'h-12 text-base',
      },
      error: {
        true: 'border-red-500 hover:border-red-600 focus:border-red-700',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', size, error, ...rest }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, error, className }))}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
