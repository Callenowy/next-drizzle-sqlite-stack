import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-blue-600',
  {
    variants: {
      variant: {
        filled: 'text-white',
        outline: 'border bg-transparent hover:text-white active:text-white',
        ghost: 'bg-transparent',
      },
      color: {
        blue: 'active:bg-blue-700',
        black: 'hover:bg-neutral-700',
      },
      size: {
        sm: 'h-8 px-6 text-xs',
        md: 'h-12 px-7 text-base',
        lg: 'h-16 px-8 text-md',
      },
      fluid: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'blue',
        className: 'bg-blue-600 hover:bg-blue-500 focus:bg-blue-600',
      },
      {
        variant: 'filled',
        color: 'black',
        className: 'bg-neutral-800 focus:bg-neutral-800 active:bg-neutral-950',
      },

      {
        variant: 'outline',
        color: 'blue',
        className: 'border-blue-600 text-blue-600 hover:bg-blue-600',
      },

      {
        variant: 'outline',
        color: 'black',
        className: 'border-neutral-300 text-neutral-800 active:bg-neutral-800',
      },

      {
        variant: 'ghost',
        color: 'blue',
        className: 'hover:underline active:underline active:bg-transparent',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'blue',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fluid, color, asChild = false, ...rest },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className, fluid, color })
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
