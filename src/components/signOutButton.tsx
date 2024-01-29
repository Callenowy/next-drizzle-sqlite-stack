'use client';

import { handleLogout } from '@/app/auth/action';
import { Button } from '@/components/button';

export const SignOutButton = ({ children }: React.PropsWithChildren) => (
  <Button
    variant="outline"
    color="black"
    size="sm"
    onClick={() => {
      void handleLogout();
    }}
  >
    {children}
  </Button>
);
