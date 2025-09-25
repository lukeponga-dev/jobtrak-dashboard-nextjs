import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images';
import {
  LayoutDashboard,
  Sparkles,
<<<<<<< HEAD
  ClipboardCheck,
} from 'lucide-react';
=======
  FileStack,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/server';
>>>>>>> main

const heroImage = placeholderImages.find(p => p.id === 'landing-hero-3');
const testimonialAvatar = placeholderImages.find(p => p.id === 'testimonial-avatar');

/**
 * The main landing page for the application.
 * This page serves as the entry point for new users, providing a brief introduction
 * to the app and navigation links to sign up or log in. It is a Server Component.
 *
 * @returns {JSX.Element} The landing page component.
 */
export default async function LandingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <Logo />
        <nav className="flex gap-2">
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
=======
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="#" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-2">
          {user ? (
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
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
            </>
          )}
>>>>>>> main
        </nav>
      </header>

      <main className="flex-1">
<<<<<<< HEAD
        <section className="relative w-full h-dvh flex items-center justify-center">
=======
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] flex items-center justify-center">
>>>>>>> main
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
<<<<<<< HEAD
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Organize Your Job Search.
              </h1>
              <p className="text-lg text-primary-foreground/80 md:text-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Manage every application in one place with JobTrackr. Stay organized, get AI-powered insights, and keep your focus where it matters—acing the interview.
=======
            <div className="space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Take Control of Your Job Search
              </h1>
              <p className="text-lg text-primary-foreground/80 md:text-xl">
                JobTrackr is the smart, AI-powered dashboard that helps you manage applications, track progress, and land your dream job faster.
>>>>>>> main
              </p>
              <div className="space-x-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  href="/signup"
<<<<<<< HEAD
                  className={cn(buttonVariants({ size: 'lg' }), "animate-pulse")}
                  prefetch={false}
=======
                  className={cn(buttonVariants({ size: 'lg' }))}
>>>>>>> main
                >
                  Get Started for Free
                </Link>
                <Link
                  href="#features"
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
<<<<<<< HEAD
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-start gap-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">A Smarter Way to Job Hunt</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our features are designed to save you time and provide the insights you need to succeed.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <LayoutDashboard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">All-in-One Dashboard</h3>
                  <p className="text-muted-foreground">
                    Visualize your entire job search at a glance. See every application's status in one clean, organized view.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                  <p className="text-muted-foreground">
                    Leverage AI to suggest application statuses and generate starter notes, helping you prepare and stay ahead.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ClipboardCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Centralized Tracking</h3>
                  <p className="text-muted-foreground">
                    Ditch the spreadsheets. Add, update, and manage every detail of your job applications in one place.
                  </p>
=======
        
        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From tracking applications to getting AI-powered advice, JobTrackr is your co-pilot for the entire job search journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Beautiful Dashboard</h3>
                <p className="text-muted-foreground">Visualize your job search at a glance. Track statuses, upcoming interviews, and offers in one place.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                 <div className="bg-primary/10 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Suggestions</h3>
                <p className="text-muted-foreground">Get intelligent suggestions for your application status and generate starter notes with the power of AI.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                 <div className="bg-primary/10 p-4 rounded-full">
                  <FileStack className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Seamless Tracking</h3>
                <p className="text-muted-foreground">Easily add, edit, and manage all your job applications in a centralized and intuitive interface.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Users Are Saying</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                JobTrackr has transformed how our users approach the job market.
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <p className="text-lg italic text-foreground">
                  "This is the tool I wish I had during my last job search. The AI suggestions are a game-changer and the interface is just so clean and easy to use. Highly recommended!"
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                {testimonialAvatar && (
                  <Avatar>
                    <AvatarImage src={testimonialAvatar.imageUrl} alt="User Avatar" data-ai-hint={testimonialAvatar.imageHint} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
>>>>>>> main
                </div>
              </div>
            </div>
          </div>
        </section>
<<<<<<< HEAD
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 JobTrackr. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
=======

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-card border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Land Your Dream Job?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stop juggling spreadsheets. Start your organized, AI-powered job search today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link
                href="/signup"
                className={cn(buttonVariants({ size: 'lg', className: 'w-full' }))}
              >
                Sign Up Now
              </Link>
              <p className="text-xs text-muted-foreground">
                Free to get started. No credit card required.
              </p>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="flex items-center justify-center py-8 border-t bg-background">
        <p className="text-sm text-muted-foreground">&copy; 2024 JobTrackr. All rights reserved.</p>
>>>>>>> main
      </footer>
    </div>
  );
}
