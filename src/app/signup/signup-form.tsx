
"use client";

import { useTransition } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { signUp, signInWithGoogle } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
    {...props}
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.588,34.925,48,29.696,48,24C48,22.659,47.862,21.35,47.611,20.083z"
    />
  </svg>
);


export function SignupForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignUp = (formData: FormData) => {
    startTransition(async () => {
      const result = await signUp(formData);
      if (result?.error) {
        router.push(`/signup?message=${result.error}`);
      } else if (result?.message) {
        router.push(`/signup?message=${result.message}`);
      }
    });
  };

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-2 text-center">
         <div className="flex justify-center">
            <Logo />
        </div>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to get started with JobTrackr.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form className="space-y-4" action={handleSignUp}>
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                name="full-name"
                placeholder="Max Robinson"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full"
              loading={isPending}
            >
              Create an account
            </Button>
          </form>

           <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <form action={handleGoogleSignIn}>
            <Button variant="outline" className="w-full" type="submit" loading={isPending}>
              <GoogleIcon className="mr-2" />
              Sign up with Google
            </Button>
          </form>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-sm rounded-md">
              {searchParams.message}
            </p>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary/80 hover:text-primary underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
