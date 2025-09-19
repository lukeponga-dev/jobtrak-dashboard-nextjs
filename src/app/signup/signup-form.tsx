
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
import { signUp } from "@/lib/actions";
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

  return (
<<<<<<< HEAD
    <Card className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-2 text-center">
         <div className="flex justify-center">
            <Logo />
        </div>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to get started with JobTrackr.
=======
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="space-y-4 text-center">
        <Logo className="justify-center" />
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account
>>>>>>> cec7630 (change User Interface)
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-sm rounded-md">
              {searchParams.message}
            </p>
          )}
        </form>
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
