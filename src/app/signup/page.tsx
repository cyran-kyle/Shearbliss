'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User, Loader2 } from 'lucide-react';
import { initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const signupSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      initiateEmailSignUp(auth, values.email, values.password);
      toast({
        title: 'Account Created!',
        description: 'You are now being logged in.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Signup failed:', error);
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message || 'An unexpected error occurred.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-secondary">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold">Create an Account</CardTitle>
          <CardDescription>
            Join us to easily book and manage your appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                 {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
           <p className="text-muted-foreground">
            Already have an account?&nbsp;
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
