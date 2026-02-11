'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  collection,
  doc,
} from 'firebase/firestore';
import { PlusCircle, Edit, Trash2, Loader2, Shield, AlertTriangle } from 'lucide-react';

import { useAdmin } from '@/hooks/useAdmin';
import { useUser, useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { placeholderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import type { Staff, Service } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

// Schemas for form validation
const staffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  specialization: z.string().min(2, 'Specialization is required.'),
  experience: z.string().min(1, 'Experience is required.'),
  imageId: z.string().min(1, 'Please select an image.'),
});

const serviceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(1, 'Price must be greater than 0.'),
  duration: z.coerce.number().min(5, 'Duration must be at least 5 minutes.'),
  imageId: z.string().min(1, 'Please select an image.'),
});

// Helper component for the Stylist Form
function StylistForm({
  staff,
  onFinished,
}: {
  staff?: Staff;
  onFinished: () => void;
}) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const staffCollection = useMemoFirebase(() => collection(firestore, 'staff'), [firestore]);
  
  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: staff?.name || '',
      specialization: staff?.specialization || '',
      experience: staff?.experience || '',
      imageId: staff?.imageId || '',
    },
  });

  const { isSubmitting } = form.formState;
  
  const image = placeholderImages.find(p => p.id === form.watch('imageId'));

  async function onSubmit(values: z.infer<typeof staffSchema>) {
    const imageHint = placeholderImages.find(p => p.id === values.imageId)?.imageHint || '';
    const data = {...values, imageHint, rating: staff?.rating || 0, reviewCount: staff?.reviewCount || 0, reviews: staff?.reviews || [] };

    try {
      if (staff) {
        // Update existing staff
        const staffDocRef = doc(firestore, 'staff', staff.id);
        updateDocumentNonBlocking(staffDocRef, data);
        toast({ title: 'Stylist Updated', description: `${values.name} has been updated.` });
      } else {
        // Add new staff
        addDocumentNonBlocking(staffCollection, data);
        toast({ title: 'Stylist Added', description: `${values.name} has been added.` });
      }
      onFinished();
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'An error occurred.' });
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Olivia Chen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Color Specialist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 10 years" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an image" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {placeholderImages.filter(p => p.imageHint?.includes('stylist') || p.imageHint?.includes('hairdresser') || p.imageHint?.includes('barber')).map((p: ImagePlaceholder) => (
                    <SelectItem key={p.id} value={p.id}>{p.description}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {image && <Image src={image.imageUrl} alt={image.description} width={100} height={100} className="rounded-md mt-2" />}
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {staff ? 'Save Changes' : 'Add Stylist'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


// Helper component for the Service Form
function ServiceForm({
  service,
  onFinished,
}: {
  service?: Service;
  onFinished: () => void;
}) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name || '',
      description: service?.description || '',
      price: service?.price || 0,
      duration: service?.duration || 0,
      imageId: service?.imageId || '',
    },
  });

  const { isSubmitting } = form.formState;

  const image = placeholderImages.find(p => p.id === form.watch('imageId'));

  async function onSubmit(values: z.infer<typeof serviceSchema>) {
    const imageHint = placeholderImages.find(p => p.id === values.imageId)?.imageHint || '';
    const data = {...values, imageHint };

    try {
      if (service) {
        // Update existing service
        const serviceDocRef = doc(firestore, 'services', service.id);
        updateDocumentNonBlocking(serviceDocRef, data);
        toast({ title: 'Service Updated', description: `${values.name} has been updated.` });
      } else {
        // Add new service
        addDocumentNonBlocking(servicesCollection, data);
        toast({ title: 'Service Added', description: `${values.name} has been added.` });
      }
      onFinished();
    } catch (error) {
       console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'An error occurred.' });
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Precision Haircut" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the service..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 65" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (min)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an image" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {placeholderImages.filter(p => p.id.startsWith('service-')).map((p: ImagePlaceholder) => (
                    <SelectItem key={p.id} value={p.id}>{p.description}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
               {image && <Image src={image.imageUrl} alt={image.description} width={100} height={100} className="rounded-md mt-2" />}
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
           <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {service ? 'Save Changes' : 'Add Service'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


// Main Page Component
export default function AdminPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdmin();
  const firestore = useFirestore();
  const { toast } = useToast();

  // State for dialogs
  const [dialog, setDialog] = useState<{ type: 'add' | 'edit' | 'delete', collection: 'staff' | 'services', item?: any } | null>(null);

  const staffCollection = useMemoFirebase(() => collection(firestore, 'staff'), [firestore]);
  const { data: staff, isLoading: staffLoading } = useCollection<Staff>(staffCollection);
  
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading: servicesLoading } = useCollection<Service>(servicesCollection);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleDelete = () => {
    if (!dialog || dialog.type !== 'delete' || !dialog.item) return;

    const docRef = doc(firestore, dialog.collection, dialog.item.id);
    deleteDocumentNonBlocking(docRef);

    toast({
      title: `${dialog.collection === 'staff' ? 'Stylist' : 'Service'} Deleted`,
      description: `"${dialog.item.name}" has been removed.`,
    });
    
    setDialog(null);
  };


  if (isUserLoading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-32 w-32 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2"><AlertTriangle className="text-destructive"/>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
                <p>You do not have permission to view this page. Please contact an administrator if you believe this is an error.</p>
                <Button onClick={() => router.push('/')} className="mt-4">Back to Home</Button>
            </CardContent>
         </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Shield /> Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your salon's stylists and services.</p>
      </div>
      
      <p className="text-sm bg-accent text-accent-foreground p-3 rounded-md mb-8">
        <strong>Note:</strong> Changes made here are saved to the database but are not yet reflected on the public-facing pages (Home, Services, Staff). The next step is to connect those pages to Firestore.
      </p>

      <Tabs defaultValue="stylists">
        <TabsList>
          <TabsTrigger value="stylists">Manage Stylists</TabsTrigger>
          <TabsTrigger value="services">Manage Services</TabsTrigger>
        </TabsList>
        <TabsContent value="stylists">
          <Card>
            <CardHeader>
              <CardTitle>Stylists</CardTitle>
              <CardDescription>Add, edit, or remove stylists.</CardDescription>
              <Button size="sm" className="absolute top-4 right-4" onClick={() => setDialog({ type: 'add', collection: 'staff'})}>
                <PlusCircle className="mr-2" /> Add Stylist
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffLoading ? (
                    <TableRow><TableCell colSpan={4} className="text-center"><Loader2 className="mx-auto animate-spin" /></TableCell></TableRow>
                  ) : staff && staff.length > 0 ? (
                    staff.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>{s.specialization}</TableCell>
                        <TableCell>{s.experience}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => setDialog({ type: 'edit', collection: 'staff', item: s })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDialog({ type: 'delete', collection: 'staff', item: s })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={4} className="text-center">No stylists found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Add, edit, or remove services.</CardDescription>
               <Button size="sm" className="absolute top-4 right-4" onClick={() => setDialog({ type: 'add', collection: 'services'})}>
                <PlusCircle className="mr-2" /> Add Service
              </Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicesLoading ? (
                     <TableRow><TableCell colSpan={4} className="text-center"><Loader2 className="mx-auto animate-spin" /></TableCell></TableRow>
                  ) : services && services.length > 0 ? (
                    services.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>${s.price.toFixed(2)}</TableCell>
                        <TableCell>{s.duration} min</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => setDialog({ type: 'edit', collection: 'services', item: s })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDialog({ type: 'delete', collection: 'services', item: s })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                     <TableRow><TableCell colSpan={4} className="text-center">No services found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for Add/Edit */}
      <Dialog open={dialog?.type === 'add' || dialog?.type === 'edit'} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog?.type === 'add' ? 'Add' : 'Edit'} {dialog?.collection === 'staff' ? 'Stylist' : 'Service'}</DialogTitle>
            <DialogDescription>
              {dialog?.type === 'add' ? 'Fill in the details to add a new' : 'Update the details for this'} {dialog?.collection === 'staff' ? 'stylist' : 'service'}.
            </DialogDescription>
          </DialogHeader>
          {dialog?.collection === 'staff' && <StylistForm staff={dialog.item} onFinished={() => setDialog(null)} />}
          {dialog?.collection === 'services' && <ServiceForm service={dialog.item} onFinished={() => setDialog(null)} />}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={dialog?.type === 'delete'} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
             <DialogDescription>
              This action cannot be undone. This will permanently delete the {dialog?.collection === 'staff' ? 'stylist' : 'service'} "{dialog?.item?.name}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
