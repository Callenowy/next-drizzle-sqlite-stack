import type { Metadata } from 'next';
import { siteName, description } from '@/app.config';
import { inter } from '@/styles/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-blue-50">{children}</body>
    </html>
  );
}
