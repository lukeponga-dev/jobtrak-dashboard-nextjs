import Image from "next/image";
import { LoginForm } from "./login-form";
import { placeholderImages } from "@/lib/placeholder-images.json";

const bgImage = placeholderImages.find(p => p.id === 'login-background-2');

export default function LoginPage() {
  return (
<<<<<<< HEAD
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
       {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover absolute inset-0 z-0"
          style={{ filter: 'brightness(0.3)'}}
=======
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        <LoginForm />
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <Image
          src="https://images.unsplash.com/photo-1599658880436-55a7985489dc?q=80&w=2592&auto=format&fit=crop"
          alt="Abstract background image"
          data-ai-hint="abstract office"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.4)'}}
>>>>>>> cec7630 (change User Interface)
        />
      )}
      <div className="relative z-10 w-full">
         <LoginForm />
      </div>
    </div>
  );
}
