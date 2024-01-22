'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { DataTableColumnHeader } from '@/components/dataTableColumnHeader';

import { cn } from '@/utils/cn';

import type { Server } from '@/db/schema/servers';

export const columns: ColumnDef<Server>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country name" />
    ),
    cell: ({ row }) => {
      const countryCode = row.original.countryCode;
      const name: Server['name'] = row.getValue('name');

      return (
        <div className="flex items-center gap-4">
          {countryCode && (
            <Icon
              id={`flag-${countryCode}`.toLowerCase()}
              sprite="/svg-sprites/flags.svg"
              className="h-auto w-8 border border-gray-200"
            />
          )}
          <Text weight="medium" asChild className={cn(!countryCode && 'pl-12')}>
            <span>{name}</span>
          </Text>
        </div>
      );
    },
  },
  {
    accessorKey: 'distance',
    cell: ({ row }) => {
      const value: number = row.getValue('distance');
      return (
        <Text weight="medium" className="md:text-semibold" asChild>
          <span>{value} km</span>
        </Text>
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Distance"
        className="justify-end"
      />
    ),
    meta: {
      style: {
        textAlign: 'right',
      },
    },
  },
];
