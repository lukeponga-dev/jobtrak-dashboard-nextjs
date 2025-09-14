import { SignupForm } from "./signup-form";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <SignupForm searchParams={searchParams} />
    </div>
  );
}
