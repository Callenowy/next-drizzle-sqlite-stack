import { cn } from '@/utils/cn';

export const Card = ({
  children,
  className,
  ...rest
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={cn(
      'w-full rounded-[10px] bg-white p-6 shadow-base md:p-8',
      className
    )}
    {...rest}
  >
    {children}
  </div>
);
