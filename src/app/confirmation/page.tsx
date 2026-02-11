import Link from 'next/link';
import { CheckCircle2, Calendar, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfirmationPage() {
  return (
    <div className="bg-secondary min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          <Card className="shadow-2xl text-center animate-fade-in-up">
            <CardHeader>
              <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center">
                 <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl font-extrabold pt-4">Booking Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg">
                Thank you for booking with Shear Bliss. Your appointment is scheduled.
              </p>
              <p className="text-sm text-muted-foreground">
                A confirmation email with your appointment details has been sent to your inbox. We look forward to seeing you!
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link href="/book">
                    <Calendar className="mr-2 h-4 w-4" />
                    New Booking
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
