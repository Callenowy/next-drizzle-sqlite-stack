import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'hover:bg-muted/50 peer border-b border-grey-300 transition-colors',
      className
    )}
    {...props}
  />
));

TableRow.displayName = 'TableRow';

export { TableRow };
