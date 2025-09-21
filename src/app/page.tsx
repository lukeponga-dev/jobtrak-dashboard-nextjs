import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images';

const heroImage = placeholderImages.find(p => p.id === 'landing-hero-3');

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="#" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-screen flex items-center justify-center">
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
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Land Your Dream Job Faster
              </h1>
              <p className="text-lg text-primary-foreground/80 md:text-xl">
                JobTrackr is the ultimate tool to organize, track, and accelerate your job search. Say goodbye to messy spreadsheets and hello to streamlined success.
              </p>
              <div className="space-x-4 pt-4">
                <Link
                  href="/signup"
                  className={cn(buttonVariants({ size: 'lg' }))}
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
