import Image from "next/image";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
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
        />
      </div>
    </div>
  );
}
