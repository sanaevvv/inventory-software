'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormButton } from '../dashboard/FormButton';
import { FormInput } from '../dashboard/FormInput';
import { useRouter } from 'next/navigation';
import { signinSchema, SigninSchemaType } from '@/lib/schema';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninSchemaType) => {
    const signin = await signIn('credentials', {
      ...data,
      redirect: false,
    });
    router.push('/dashboard/home/overview');
  };

  return (
    <Card className="mx-auto max-w-md w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput label="Email" name="email" type="email" form={form} />

            <FormInput
              label="Password"
              name="password"
              type="password"
              form={form}
              description="パスワードは8文字以上入力ください"
            />

            <FormButton form={form} className="w-full">
              Sign in to your account
            </FormButton>
          </form>
        </Form>

        <div className="mt-8 text-center text-sm">
          <span className="pr-4">Create an account?</span>
          <Link href="/register" className="underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
