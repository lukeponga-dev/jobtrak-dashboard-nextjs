
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendSupportEmail } from '@/lib/actions';

export default function SupportPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out both the subject and message.',
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('message', message);
      
      const result = await sendSupportEmail(formData);

      if (result.success && result.mailto) {
        window.location.href = result.mailto;
        toast({
          title: 'Ready to Send!',
          description: "Your email client has been opened to send the message.",
        });
        setSubject('');
        setMessage('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Support</h1>
        <p className="text-muted-foreground text-sm">
          Need help? Fill out the form below to contact our support team.
        </p>
      </div>
      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Let us know what you need help with, and we'll do our best to
              assist you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g., Issue with exporting data"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Please describe the issue in detail..."
                className="min-h-[150px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isPending}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" loading={isPending}>
              Send Message
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
