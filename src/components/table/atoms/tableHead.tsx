import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'pb-6 text-left font-medium text-black [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));

TableHead.displayName = 'TableHead';

export { TableHead };
