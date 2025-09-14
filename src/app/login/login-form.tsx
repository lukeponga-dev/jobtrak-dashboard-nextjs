
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { signIn } from "@/lib/actions";

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
      } else {
        router.push("/dashboard");
      }
    });
  };
  
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <Logo className="justify-center" />
        <h1 className="text-3xl font-bold mt-4">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <form className="grid gap-4">
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button formAction={handleSignIn} type="submit" className="w-full" loading={isPending}>
          Login
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
