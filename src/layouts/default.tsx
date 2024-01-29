import { Brand } from '@/components/brand';
import { Navbar } from '@/components/navbar';
import { auth } from '@/auth';

import { SignOutButton } from '@/components/signOutButton';

export const DefaultLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  return (
    <main>
      <Navbar brand={<Brand alias="The Stack" />}>
        {session && <SignOutButton>Sign out</SignOutButton>}
      </Navbar>
      {children}
    </main>
  );
};
