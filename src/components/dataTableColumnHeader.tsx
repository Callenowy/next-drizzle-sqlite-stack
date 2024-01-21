import type { Column } from '@tanstack/react-table';

import { cn } from '@/utils/cn';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="h-full gap-3 p-0 text-base font-medium md:text-md"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span className="sr-only">Sort by</span>
        <span>{title}</span>
        {column.getIsSorted() === 'asc' ? (
          <Icon
            id={`icon-dropdown`}
            sprite="/svg-sprites/icons.svg"
            aria-label="Image representing descending sorting"
            className="h-6 w-auto rotate-180 transform-gpu"
          />
        ) : column.getIsSorted() === 'desc' ? (
          <Icon
            id={`icon-dropdown`}
            sprite="/svg-sprites/icons.svg"
            aria-label="Image representing ascending sorting"
            className="h-6 w-auto transform-gpu"
          />
        ) : (
          <Icon
            id={`icon-dropdown`}
            sprite="/svg-sprites/icons.svg"
            aria-label="Image representing ascending sorting"
            className="h-6 w-auto transform-gpu opacity-25"
          />
        )}
      </Button>
    </div>
  );
}
