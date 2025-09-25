
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LoginForm } from "./login-form";
import { placeholderImages } from "@/lib/placeholder-images";

const bgImage = placeholderImages.find(p => p.id === 'login-background-2');

export function LoginClient({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover absolute inset-0 z-0"
          style={{ filter: 'brightness(0.3)' }}
        />
      )}
      {isClient && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-[20%] right-[10%] w-48 h-48 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-[15%] left-[25%] w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[5%] right-[20%] w-40 h-40 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
      )}
      <div className="relative z-10 w-full">
        <LoginForm searchParams={searchParams} />
      </div>
    </div>
  );
}
