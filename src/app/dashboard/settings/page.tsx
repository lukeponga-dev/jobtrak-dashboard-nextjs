import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./settings-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { User } from "@supabase/supabase-js";

export default async function SettingsPage({ user }: { user: User | null }) {
  if (!user) {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      redirect("/login");
    }
    user = authUser;
  }

  return (
<<<<<<< HEAD
    <div className="space-y-6 px-4 lg:px-0">
=======
    <div className="space-y-6">
>>>>>>> 56c83c2 (please re create entire project)
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
