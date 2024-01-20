import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'py-6 align-middle md:py-8 [tr:last-child>&]:pb-0',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export { TableCell };
