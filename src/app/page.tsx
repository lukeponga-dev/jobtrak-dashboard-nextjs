
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className={cn(buttonVariants({ variant: 'ghost' }))}>Login</Link>
          <Link href="/signup" className={cn(buttonVariants())}>Sign Up</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[calc(100vh-3.5rem)] flex items-center justify-center">
          <Image
            src="https://picsum.photos/seed/4/1920/1080"
            alt="Hero Background"
            data-ai-hint="office building"
            fill
            className="object-cover -z-10 brightness-[0.4]"
          />
          <div className="container px-4 md:px-6 text-center text-primary-foreground">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Track Your Job Applications Effortlessly
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                JobTrackr helps you manage your job search, from application to offer. Stay organized and focused on landing your dream job.
              </p>
              <div className="space-x-4">
                <Link href="/signup" className={cn(buttonVariants({ size: 'lg' }))}>Get Started</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
