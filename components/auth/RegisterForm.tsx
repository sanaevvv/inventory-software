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
import { registerSchema, RegisterSchemaType } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormButton } from '../dashboard/FormButton';
import { FormInput } from '../dashboard/FormInput';
import { user } from './_actions';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password:''
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const result = await user(data);
    if (result.success) {
      toast({
        variant: 'default',
        title: result.message,
      });
      router.push('/login');
    } else {
      toast({
        variant: 'destructive',
        title: result.message,
      });
    }
  };

  return (
    <Card className="mx-auto max-w-md w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Username"
              name="username"
              type="text"
              form={form}
            />
            <FormInput label="Email" name="email" type="email" form={form} />

            <FormInput
              label="Password"
              name="password"
              type="password"
              form={form}
              description="パスワードは8文字以上入力ください"
            />

            <FormButton form={form} className="w-full">
              Create an account
            </FormButton>
          </form>
        </Form>

        <div className="mt-8 text-center text-sm">
          <span className="pr-2">Already have an account?</span>
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
