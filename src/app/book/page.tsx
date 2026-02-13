'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Calendar as CalendarIcon,
  Clock,
  User as UserIcon,
  Scissors,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
} from 'lucide-react';
import { format } from 'date-fns';
import { collection, addDoc } from 'firebase/firestore';

import { cn } from '@/lib/utils';
import { type Service, type Staff } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Rating } from '@/components/shared/rating';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { sendEmail } from '@/ai/flows/send-email-flow';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service.'),
  staff: z.string().min(1, 'Please select a stylist.'),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, 'Please select a time.'),
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
});

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

export default function BookingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const firestore = useFirestore();

  const servicesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'services') : null), [firestore]);
  const { data: services, isLoading: servicesLoading } = useCollection<Service>(servicesCollection);

  const staffCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'staff') : null), [firestore]);
  const { data: staffMembers, isLoading: staffLoading } = useCollection<Staff>(staffCollection);

  const methods = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      staff: '',
      time: '',
    },
  });

  const { watch, setValue, trigger } = methods;

  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const selectedServiceId = watch('service');
  const selectedStaffId = watch('staff');
  const selectedDate = watch('date');
  const selectedTime = watch('time');

  const selectedService = services?.find(s => s.id === selectedServiceId);
  const selectedStaff = staffMembers?.find(s => s.id === selectedStaffId);

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger('service');
    if (step === 2) isValid = await trigger('staff');
    if (step === 3) isValid = await trigger(['date', 'time']);

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime || !firestore) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please complete all booking steps.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentsCollection = collection(firestore, 'appointments');
      await addDoc(appointmentsCollection, {
        userId: user?.uid || null,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        startTime: new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime.replace(' AM', ':00').replace(' PM', ':00')}`), // a bit naive
        endTime: new Date(new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime.replace(' AM', ':00').replace(' PM', ':00')}`).getTime() + selectedService.duration * 60000),
        clientName: data.name,
        clientEmail: data.email,
        status: 'scheduled',
        price: selectedService.price,
      });

      const emailBody = `
        <h1>Your Booking is Confirmed!</h1>
        <p>Hi ${data.name},</p>
        <p>This is a confirmation for your upcoming appointment at Shear Bliss.</p>
        <h2>Appointment Details:</h2>
        <ul>
          <li><strong>Service:</strong> ${selectedService.name}</li>
          <li><strong>Stylist:</strong> ${selectedStaff.name}</li>
          <li><strong>Date:</strong> ${format(selectedDate, 'PPP')}</li>
          <li><strong>Time:</strong> ${selectedTime}</li>
          <li><strong>Price:</strong> GH₵${selectedService.price.toFixed(2)}</li>
        </ul>
        <p>We look forward to seeing you!</p>
        <p><em>- The Shear Bliss Team</em></p>
      `;
    
      await sendEmail({
        to: data.email,
        subject: 'Your Shear Bliss Appointment Confirmation',
        body: emailBody,
      });

      toast({
        title: 'Booking Confirmed!',
        description: 'Your appointment has been successfully scheduled. A confirmation email has been sent.',
      });
      router.push('/confirmation');
    } catch (error) {
      console.error('Failed to book or send email:', error);
      toast({
        variant: 'destructive',
        title: 'Booking Failed',
        description: 'We could not schedule your appointment or send a confirmation email. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const steps = [
    { id: 1, name: 'Select Service', icon: Scissors },
    { id: 2, name: 'Select Stylist', icon: UserIcon },
    { id: 3, name: 'Select Date & Time', icon: CalendarIcon },
    { id: 4, name: 'Confirm Booking', icon: Check },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-2">Book Your Appointment</h1>
        <p className="text-center text-muted-foreground mb-8">Follow the steps to schedule your visit.</p>

        <div className="mb-8">
            <ol className="flex items-center w-full">
                {steps.map((s, index) => (
                    <li key={s.id} className={cn(
                        "flex w-full items-center",
                        index !== steps.length - 1 && "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block",
                        step > s.id ? 'after:border-primary' : 'after:border-border',
                    )}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0" style={{
                            backgroundColor: step >= s.id ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            color: step >= s.id ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))'
                        }}>
                            <s.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                    </li>
                ))}
            </ol>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{steps.find(s => s.id === step)?.name}</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[300px]">
                {step === 1 && (
                  servicesLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i}><CardContent className="p-4"><Skeleton className="h-12 w-full"/></CardContent></Card>
                      ))}
                    </div>
                  ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {services?.map(service => (
                      <Card
                        key={service.id}
                        className={cn(
                          'cursor-pointer transition-all',
                          selectedServiceId === service.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                        )}
                        onClick={() => setValue('service', service.id, { shouldValidate: true })}
                      >
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-primary">GH₵{service.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  )
                )}
                {step === 2 && (
                   staffLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[...Array(4)].map((_, i) => (
                         <Card key={i}><CardContent className="p-4"><Skeleton className="h-32 w-full"/></CardContent></Card>
                      ))}
                    </div>
                  ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {staffMembers?.map(staff => (
                      <Card
                        key={staff.id}
                        className={cn(
                          'cursor-pointer transition-all text-center',
                          selectedStaffId === staff.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                        )}
                        onClick={() => setValue('staff', staff.id, { shouldValidate: true })}
                      >
                        <CardContent className="p-4">
                          {staff.imageUrl && (
                            <Image src={staff.imageUrl} alt={staff.name} width={80} height={80} className="rounded-full mx-auto mb-2 object-cover" />
                          )}
                          <h3 className="font-semibold">{staff.name}</h3>
                          <Rating rating={staff.rating} className="justify-center mt-1" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  )
                )}
                {step === 3 && (
                   <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Calendar
                        mode="single"
                        required
                        selected={selectedDate}
                        onSelect={(date) => date && setValue('date', date, { shouldValidate: true })}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        className="rounded-md border mx-auto"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-center md:text-left">Available Times</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map(time => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? 'default' : 'outline'}
                            onClick={() => setValue('time', time, { shouldValidate: true })}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {step === 4 && selectedService && selectedStaff && selectedDate && selectedTime && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Confirm Your Details</h3>
                    <div className="space-y-4 mb-6">
                      <FormField
                          control={methods.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Jane Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={methods.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="e.g., you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-semibold">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stylist:</span>
                          <span className="font-semibold">{selectedStaff.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-semibold">{format(selectedDate, 'PPP')}</span>
                        </div>
                         <div className="flex justify-between">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-semibold">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary pt-4 border-t">
                          <span>Total:</span>
                          <span>GH₵{selectedService.price.toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              ) : <div></div>}
              {step < 4 ? (
                <Button type="button" onClick={handleNextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirming...
                    </>
                  ) : 'Confirm Booking'}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
