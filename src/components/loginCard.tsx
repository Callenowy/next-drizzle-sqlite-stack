import Image from 'next/image';

import { Card } from './card';

export const LoginCard = ({ children }: React.PropsWithChildren) => (
  <Card className="relative min-h-[516px] w-full min-w-80 max-w-[410px] overflow-hidden">
    <div className="flex justify-center pb-10">
      <Image
        src="/developer-logo.svg"
        alt="The Stack App logo"
        width={100}
        height={24}
        priority
      />
    </div>

    {children}
  </Card>
);
