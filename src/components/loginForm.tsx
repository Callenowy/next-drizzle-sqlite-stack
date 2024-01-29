import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { loginDefaults, loginSchema } from '@/models';
import type { LoginSchema } from '@/models';

type LoginFormProps = {
  onSubmit: (data: LoginSchema) => void;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults,
    mode: 'all',
    criteriaMode: 'all',
  });

  const handleSubmit: SubmitHandler<LoginSchema> = data => {
    onSubmit?.(data);
  };

  return (
    <Form<LoginSchema>
      name="login"
      onSubmit={handleSubmit}
      form={form}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter username"
                autoComplete="username"
                error={Boolean(fieldState?.error?.message)}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter password"
                autoComplete="current-password"
                type="password"
                error={Boolean(fieldState?.error?.message)}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="pb-2 pt-4">
        <Button type="submit" fluid>
          Log in
        </Button>
      </div>
    </Form>
  );
};
