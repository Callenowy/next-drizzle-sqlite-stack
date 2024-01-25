import type { Metadata } from 'next';
import { LoginLayout } from '@/layouts/login';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account on the Stack App',
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginLayout>{children}</LoginLayout>;
}
