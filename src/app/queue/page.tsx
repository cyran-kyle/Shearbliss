import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, PersonStanding } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function QueuePage() {
  const yourPosition = 5;
  const totalInQueue = 8;
  const estimatedWaitTime = 25; // in minutes
  const progressValue = ((totalInQueue - yourPosition + 1) / totalInQueue) * 100;

  return (
    <div className="bg-secondary min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Live Queue</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Track your spot in line. We'll notify you when it's almost your turn.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Your Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-center">
              <div>
                <p className="text-muted-foreground mb-2">Your Position in Queue</p>
                <div className="flex items-center justify-center gap-4">
                  <PersonStanding className="h-10 w-10 text-primary" />
                  <span className="text-6xl font-bold">{yourPosition}</span>
                  <span className="text-2xl text-muted-foreground self-end">/ {totalInQueue}</span>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Estimated Wait Time</p>
                <div className="flex items-center justify-center gap-4">
                  <Clock className="h-10 w-10 text-primary" />
                  <span className="text-6xl font-bold">{estimatedWaitTime}</span>
                  <span className="text-2xl text-muted-foreground self-end">min</span>
                </div>
              </div>
              
              <div className="pt-4">
                 <p className="text-sm text-muted-foreground mb-2">{totalInQueue - yourPosition} people ahead of you</p>
                 <Progress value={100 - progressValue} className="h-3" />
              </div>

            </CardContent>
          </Card>
          <p className="text-center text-muted-foreground text-sm mt-4">
            We will send you a notification 10 minutes before your turn.
          </p>
        </div>
      </div>
    </div>
  );
}
