import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Card } from '@/components/card';
import { DataTable } from '@/components/dataTable';

import { getServerList } from './actions';
import { columns } from './columns';

export default function ServerList() {
  const data = getServerList();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-[70px]">
      <div className="space-y-4 pb-8 text-center md:pb-10">
        <Heading
          level="1"
          className="text-center text-lg tracking-tight md:text-2xl md:tracking-tightest"
        >
          Server list
        </Heading>
        <Text className="text-sm md:text-base">
          The distance between you and the server
        </Text>
      </div>

      <Card>
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  );
}
