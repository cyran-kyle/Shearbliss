'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, User, MessageSquare, PlusCircle, Loader2 } from 'lucide-react';
import { collection, doc, runTransaction } from 'firebase/firestore';

import { type Staff as StaffType, type StaffReview } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/shared/rating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const reviewSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }),
});

function AddReviewForm({ staffId, onReviewAdded }: { staffId: string; onReviewAdded: () => void }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: '', rating: 5, comment: '' },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (user?.displayName) {
      form.setValue('name', user.displayName);
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    if (!firestore) return;

    const staffDocRef = doc(firestore, 'staff', staffId);

    try {
      await runTransaction(firestore, async (transaction) => {
        const staffDoc = await transaction.get(staffDocRef);
        if (!staffDoc.exists()) {
          throw new Error('Stylist not found.');
        }

        const staffData = staffDoc.data() as StaffType;

        const newReview: StaffReview = {
          id: new Date().toISOString(),
          userName: values.name,
          rating: values.rating,
          comment: values.comment,
          createdAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };

        const existingReviews = staffData.reviews || [];
        const newReviews = [...existingReviews, newReview];
        const newReviewCount = newReviews.length;

        const totalRating = newReviews.reduce((sum, review) => sum + review.rating, 0);
        const newAverageRating = totalRating / newReviewCount;

        transaction.update(staffDocRef, {
          reviews: newReviews,
          reviewCount: newReviewCount,
          rating: newAverageRating,
        });
      });

      toast({
        title: 'Review Submitted!',
        description: 'Thank you for your feedback.',
      });
      onReviewAdded();
    } catch (error) {
      console.error('Failed to submit review:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Could not save your review. Please try again.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < field.value ? 'text-primary fill-primary' : 'text-gray-300'
                      }`}
                      onClick={() => field.onChange(i + 1)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea placeholder="Share your experience..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Review
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default function StaffPage() {
  const firestore = useFirestore();
  const staffCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'staff') : null), [firestore]);
  const { data: staffMembers, isLoading } = useCollection<StaffType>(staffCollection);
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

  const handleReviewAdded = (staffId: string) => {
    setOpenDialogs((prev) => ({ ...prev, [staffId]: false }));
  };

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Meet Our Artists</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our team of passionate and skilled stylists is dedicated to bringing your hair dreams to life.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-md">
                 <div className="flex gap-6 items-center w-full p-6">
                    <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
                    <div className="flex-grow">
                        <Skeleton className="h-7 w-1/2 mb-2" />
                        <Skeleton className="h-5 w-1/3 mb-2" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                 </div>
              </Card>
           ))
          ) : (
            staffMembers?.map((staff) => (
              <AccordionItem value={staff.id} key={staff.id} className="border-none">
                <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                  <AccordionTrigger className="w-full p-6 text-left hover:no-underline [&[data-state=open]>svg]:text-primary">
                    <div className="flex gap-6 items-center w-full">
                      <div className="relative h-24 w-24 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/20">
                        {staff.imageUrl && (
                          <Image
                            src={staff.imageUrl}
                            alt={staff.name}
                            fill
                            className="object-cover"
                            data-ai-hint="stylist portrait"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold">{staff.name}</h2>
                        <p className="text-primary font-semibold">{staff.specialization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Rating rating={staff.rating} />
                          <span className="text-sm text-muted-foreground">({staff.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-6 pt-0">
                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">Client Reviews</h3>
                          <Dialog open={openDialogs[staff.id] || false} onOpenChange={(isOpen) => setOpenDialogs(prev => ({ ...prev, [staff.id]: isOpen }))}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Review {staff.name}</DialogTitle>
                                <DialogDescription>Share your experience with us.</DialogDescription>
                              </DialogHeader>
                              <AddReviewForm staffId={staff.id} onReviewAdded={() => handleReviewAdded(staff.id)} />
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                          {staff.reviews && staff.reviews.length > 0 ? staff.reviews.map((review) => (
                            <div key={review.id} className="flex gap-4">
                              <Avatar>
                                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold">{review.userName}</p>
                                  <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                                </div>
                                <Rating rating={review.rating} className="my-1" />
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                              </div>
                            </div>
                          )).reverse() : (
                            <p className="text-sm text-muted-foreground text-center py-4">Be the first to review {staff.name}!</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
}
