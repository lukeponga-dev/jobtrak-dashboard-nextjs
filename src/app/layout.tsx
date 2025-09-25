import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";

/**
 * Defines the metadata for the application, including the title and description.
 * This information is crucial for SEO and the browser tab display.
 */
export const metadata: Metadata = {
  title: 'JobTrackr',
  description: 'A professional job application tracker dashboard.',
};

/**
 * The root layout for the entire application.
 * This component wraps all pages, providing a consistent structure, font, and global components
 * like the Toaster for notifications. It is a Server Component that applies to all routes.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout (i.e., the pages).
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
