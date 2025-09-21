import Image from "next/image";
import { SignupForm } from "./signup-form";
import { placeholderImages } from "@/lib/placeholder-images";

const bgImage = placeholderImages.find(p => p.id === 'login-background-2');


export default function SignupPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
       {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover absolute inset-0 z-0"
          style={{ filter: 'brightness(0.3)'}}
        />
      )}
      <div className="relative z-10 w-full">
         <SignupForm searchParams={searchParams} />
      </div>
    </div>
  );
}
