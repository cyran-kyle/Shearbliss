'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    signOut(auth);
    router.push('/');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have no upcoming appointments.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have no past bookings.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Queue Position</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You are not in the queue.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
