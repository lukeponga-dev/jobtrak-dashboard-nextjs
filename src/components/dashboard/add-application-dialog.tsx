"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Sparkles } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { suggestApplicationStatus, generateApplicationNotes } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Job role is required"),
  date: z.date({ required_error: "Application date is required" }),
  status: z.enum(["Applied", "Interviewing", "Offer", "Rejected"]),
  notes: z.string().optional(),
});

type AddApplicationDialogProps = {
  onApplicationAdd: (application: Omit<JobApplication, 'id'>) => Promise<void>;
  children: React.ReactNode;
};

export function AddApplicationDialog({
  onApplicationAdd,
  children,
}: AddApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSuggesting, startSuggestionTransition] = useTransition();
  const [isGeneratingNotes, startGeneratingNotesTransition] = useTransition();
  const [isSubmitting, startSubmittingTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      role: "",
      date: new Date(),
      status: "Applied",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startSubmittingTransition(async () => {
      const newApplication: Omit<JobApplication, 'id'> = {
        company: values.company,
        role: values.role,
        date: values.date.toISOString(),
        status: values.status,
        notes: values.notes,
      };
      await onApplicationAdd(newApplication);
      form.reset();
      setOpen(false);
    });
  }

  const handleSuggestStatus = () => {
    const { role, date } = form.getValues();
    if (!role || !date) {
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: "Please fill in the Job Role and Date Applied first.",
      });
      return;
    }
    startSuggestionTransition(async () => {
      const result = await suggestApplicationStatus({
        jobRole: role,
        applicationDate: date.toISOString(),
      });
      if (result.success && result.data) {
        form.setValue("status", result.data.suggestedStatus);
        toast({
          title: "AI Suggestion",
          description: `We've suggested a status of "${result.data.suggestedStatus}".`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Suggestion Failed",
          description: result.error,
        });
      }
    });
  };

  const handleGenerateNotes = () => {
    const { company, role } = form.getValues();
    if (!company || !role) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Please fill in the Company and Job Role first.",
      });
      return;
    }
    startGeneratingNotesTransition(async () => {
      const result = await generateApplicationNotes({ company, role });
      if (result.success && result.data) {
        form.setValue("notes", result.data.suggestedNotes);
        toast({
          title: "AI Notes Generated",
          description: "We've generated some starter notes for you.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: result.error,
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Enter the details of the job application you want to track.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Innovatech" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Applied</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleSuggestStatus}
                      loading={isSuggesting}
                      aria-label="Suggest Status with AI"
                    >
                      {!isSuggesting && <Sparkles className="h-4 w-4" />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Notes</FormLabel>
                     <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs"
                        onClick={handleGenerateNotes}
                        loading={isGeneratingNotes}
                        aria-label="Generate Notes with AI"
                      >
                        {!isGeneratingNotes && <Sparkles className="h-3 w-3 mr-1" />}
                        Generate Notes
                      </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about the application..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" loading={isSubmitting}>Add Application</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
