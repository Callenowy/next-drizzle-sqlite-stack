import { Brand } from '@/components/brand';
import { Navbar } from '@/components/navbar';

export const DefaultLayout = ({ children }: React.PropsWithChildren) => (
  <main>
    <Navbar brand={<Brand alias="The Stack" />}>TBA</Navbar>
    {children}
  </main>
);
