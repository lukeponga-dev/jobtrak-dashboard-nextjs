
import { LoginClient } from "./login-client";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  return <LoginClient searchParams={searchParams} />;
}
