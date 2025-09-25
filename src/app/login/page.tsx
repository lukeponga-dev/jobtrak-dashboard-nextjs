
import { LoginClient } from "./login-client";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
<<<<<<< HEAD
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
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
         <LoginForm searchParams={searchParams} />
      </div>
    </div>
  );
=======
  return <LoginClient searchParams={searchParams} />;
>>>>>>> main
}
