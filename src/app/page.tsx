import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images.json';

const heroImage = placeholderImages.find(p => p.id === 'landing-hero-2');

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="#" className="flex items-center justify-center">
          <Logo />
          <span className="sr-only">JobTrackr</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants())}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover absolute inset-0 z-0"
              style={{ filter: 'brightness(0.3)' }}
            />
          )}
          <div className="relative container px-4 md:px-6 text-center text-primary-foreground z-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Track Your Job Applications Effortlessly
              </h1>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                JobTrackr helps you manage your job search, from application to offer. Stay organized and
                focused on landing your dream job.
              </p>
              <div className="space-x-4">
                <Link
                  href="/signup"
                  className={cn(buttonVariants({ size: 'lg' }))}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
