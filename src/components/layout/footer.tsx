import Link from 'next/link';
import { Facebook, Instagram, Twitter, Scissors } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Shear Bliss</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Your sanctuary for hair perfection.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center">
              <li><Link href="/services" className="text-sm hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/staff" className="text-sm hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link href="/book" className="text-sm hover:text-primary transition-colors">Book Now</Link></li>
              <li><Link href="/queue" className="text-sm hover:text-primary transition-colors">Live Queue</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
            </div>
            <p className="text-sm text-muted-foreground">123 Beauty Lane, Glamour City</p>
            <p className="text-sm text-muted-foreground">(123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shear Bliss. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
