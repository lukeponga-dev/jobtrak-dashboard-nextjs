import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./settings-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function SettingsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and preferences.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Update your account details here.
          </CardDescription>
        </CardHeader>
        <SettingsForm
          user={{
            email: user.email || "",
            fullName: user.user_metadata.full_name || "",
          }}
        />
      </Card>
    </div>
  );
}
