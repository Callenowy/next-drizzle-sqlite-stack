import type { Metadata } from 'next';
import { DefaultLayout } from '@/layouts/default';

export const metadata: Metadata = {
  title: 'Server list',
  description: 'The distance between you and the server',
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
