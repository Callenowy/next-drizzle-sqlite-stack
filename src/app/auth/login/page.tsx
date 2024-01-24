import type { Metadata } from 'next';
import { LoginLayout } from '@/layouts/login';
import { LoginCard } from '@/components/loginCard';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account on the Stack App',
};

export default function LoginPage() {
  return (
    <LoginLayout>
      <LoginCard>Login Soon!</LoginCard>
    </LoginLayout>
  );
}
