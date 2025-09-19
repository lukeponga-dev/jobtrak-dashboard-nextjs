"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { signIn } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignIn = (formData: FormData) => {
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) {
        // You might want to show an error message to the user
        console.error(result.error);
        router.push(`/login?message=${result.error}`);
      }
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-2 text-center">
         <div className="flex justify-center">
            <Logo />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Enter your email and password to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSignIn(formData);
          }}
          className="space-y-4"
        >
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm text-primary/80 hover:text-primary underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" loading={isPending}>
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary/80 hover:text-primary underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
