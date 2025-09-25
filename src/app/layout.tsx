import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

// Initialize the Inter font with the 'latin' subset and a CSS variable for consistency.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
 * This component wraps all pages, providing a consistent structure, font, and background.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
        {/* Renders the child components, which represent the current page. */}
        {children}
        {/* The Toaster component is included to handle toast notifications throughout the app. */}
        <Toaster />
      </body>
    </html>
  );
}
