import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images';

// Find the hero image from the placeholder images data.
// This image is used as the background for the landing page's hero section.
const heroImage = placeholderImages.find(p => p.id === 'landing-hero-3');

/**
 * The main landing page for the application.
 * This page serves as the entry point for new users, providing a brief introduction
 * to the app and navigation links to sign up or log in.
 *
 * @returns {JSX.Element} The landing page component.
 */
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header section with the logo and navigation links. */}
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50 animate-fade-in">
        <Link href="#" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-2">
          {/* Link to the login page */}
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            Login
          </Link>
          {/* Link to the sign-up page, styled as a default button */}
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        {/* Hero section with a background image and a call to action. */}
        <section className="relative w-full h-screen flex items-center justify-center">
           {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              priority // Prioritizes loading of this image
              className="object-cover absolute inset-0 z-0"
              style={{ filter: 'brightness(0.3)' }} // Darkens the image to make text more readable
            />
          )}
          <div className="relative container px-4 md:px-6 text-center text-primary-foreground z-10">
            <div className="space-y-4 max-w-3xl mx-auto animate-fade-in-up">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Streamline Your Job Search
              </h1>
              <p className="text-lg text-primary-foreground/80 md:text-xl">
                Track applications, manage interviews, and land your next role with ease. JobTrackr brings clarity and control to your career journey.
              </p>
              <div className="space-x-4 pt-4">
                {/* Call to action button linking to the sign-up page */}
                <Link
                  href="/signup"
                  className={cn(buttonVariants({ size: 'lg' }))}
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
