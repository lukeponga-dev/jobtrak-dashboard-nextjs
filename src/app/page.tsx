import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images';
import {
  LayoutDashboard,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';

const heroImage = placeholderImages.find(p => p.id === 'landing-hero-3');

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }))}
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: 'default' }))}
            prefetch={false}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-dvh flex items-center justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              priority
              className="object-cover absolute inset-0 z-0"
              style={{ filter: 'brightness(0.3)' }}
            />
          )}
          <div className="relative container px-4 md:px-6 text-center text-primary-foreground z-10">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Land Your Dream Job Faster
              </h1>
              <p className="text-lg text-primary-foreground/80 md:text-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                JobTrackr is the ultimate tool to organize, track, and accelerate your job search. Say goodbye to messy spreadsheets and hello to streamlined success.
              </p>
              <div className="space-x-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  href="/signup"
                  className={cn(buttonVariants({ size: 'lg' }), "animate-pulse")}
                  prefetch={false}
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Features Built for Job Seekers</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to stay organized and motivated during your job search, all in one place.
                </p>
              </div>
              <div className="grid gap-6 col-span-2 md:grid-cols-3">
                <div className="flex flex-col items-start space-y-2 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <LayoutDashboard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Intuitive Dashboard</h3>
                  <p className="text-muted-foreground">
                    Quickly view your application pipeline, from applied to offer, with our clean and simple dashboard.
                  </p>
                </div>
                <div className="flex flex-col items-start space-y-2 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Suggestions</h3>
                  <p className="text-muted-foreground">
                    Get AI-driven suggestions for your application status and notes to keep you on track.
                  </p>
                </div>
                <div className="flex flex-col items-start space-y-2 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ClipboardCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Effortless Tracking</h3>
                  <p className="text-muted-foreground">
                    Add, edit, and manage all your job applications in one centralized location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 JobTrackr. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
