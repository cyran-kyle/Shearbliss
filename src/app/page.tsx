import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Scissors, Sparkles, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { getServices, getStaff } from '@/lib/data';
import { Rating } from '@/components/shared/rating';

export default function Home() {
  const featuredServices = getServices().slice(0, 3);
  const featuredStaff = getStaff().slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
        <Image
          src={placeholderImages.find((img) => img.id === 'hero-1')?.imageUrl || ''}
          alt="Modern hair salon interior"
          fill
          className="object-cover"
          priority
          data-ai-hint="salon interior"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Shear Bliss
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Your sanctuary for hair perfection. Experience artistry and relaxation.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/book">
              Book Your Appointment <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Tailored treatments to bring out your best self.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover"
                      data-ai-hint="hair service"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-primary">${service.price}</span>
                    <span className="text-muted-foreground">{service.duration} min</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/services">
                View All Services <Scissors className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="staff" className="py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Stylists</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              The talented artists behind your transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStaff.map((staff) => (
              <Card key={staff.id} className="text-center group overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="relative h-32 w-32 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                    <Image
                      src={staff.imageUrl}
                      alt={staff.name}
                      fill
                      className="object-cover"
                      data-ai-hint="stylist portrait"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{staff.name}</h3>
                  <p className="text-primary font-medium">{staff.specialization}</p>
                  <div className="flex justify-center my-2">
                    <Rating rating={staff.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground">{staff.experience} of experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/staff">
                Meet The Full Team <Users className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
