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

  const handleSignInWithGoogle = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="space-y-4">
        <Logo className="justify-center" />
        <div className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input
              id="full-name"
              name="full-name"
              placeholder="Max Robinson"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button
            formAction={handleSignUp}
            type="submit"
            className="w-full"
            loading={isPending}
          >
            Create an account
          </Button>
          <Button
            type="button"
            onClick={handleSignInWithGoogle}
            variant="outline"
            className="w-full"
            loading={isPending}
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 280.9 96 248 96c-88.8 0-160.1 71.1-160.1 160.1s71.4 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
