'use client';

import { useState } from 'react';

import { LoginCard } from '@/components/loginCard';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Loader } from '@/components/loader';
import { LoginForm } from '@/components/loginForm';
import { Alert } from '@/components/alert';

import type { LoginSchema } from '@/models';

import { handleLogin } from '../action';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (data: LoginSchema) => {
    try {
      setErrorMessage(undefined);
      setIsLoading(true);

      await handleLogin(data);
    } catch (error: unknown) {
      setErrorMessage('Unable to authenticate with the given credentials.');
      setIsLoading(false);
    }
  };

  return (
    <LoginCard>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="pb-8">
            <Heading
              level="1"
              order="2"
              className="text-center text-lg md:text-xl"
            >
              Welcome back!
            </Heading>
            <Text
              weight="medium"
              color="grey-600"
              align="center"
              size="sm"
              className="pt-4 md:text-base"
            >
              Enter details below to log in to your account.
            </Text>
          </header>

          {errorMessage && <Alert message={errorMessage} />}

          <LoginForm onSubmit={data => void handleSubmit(data)} />
        </>
      )}
    </LoginCard>
  );
}
