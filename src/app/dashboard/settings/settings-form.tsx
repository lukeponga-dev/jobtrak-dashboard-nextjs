
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateUser, changePassword } from "@/lib/actions";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const updateInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email(),
});

const changePasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SettingsFormProps = {
  user: {
    email: string;
    fullName: string;
  };
};

export function SettingsForm({ user }: SettingsFormProps) {
  const [isPendingInfo, startUpdateUserTransition] = useTransition();
  const [isPendingPassword, startChangePasswordTransition] = useTransition();
  const { toast } = useToast();

  const infoForm = useForm<z.infer<typeof updateInfoSchema>>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });

  const passwordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onInfoSubmit = (values: z.infer<typeof updateInfoSchema>) => {
    startUpdateUserTransition(async () => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      const result = await updateUser(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  const onPasswordSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    startChangePasswordTransition(async () => {
      const formData = new FormData();
      formData.append("newPassword", values.newPassword);
      const result = await changePassword(formData);

       if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        passwordForm.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  return (
    <>
      <Form {...infoForm}>
        <form onSubmit={infoForm.handleSubmit(onInfoSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={infoForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={infoForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} disabled />
                  </FormControl>
                   <FormDescription>
                    You cannot change your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" loading={isPendingInfo}>
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>

      <Separator />

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
           <CardContent className="space-y-4 pt-6">
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" loading={isPendingPassword}>
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
