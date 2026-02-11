'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Scissors, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/staff', label: 'Stylists' },
  { href: '/queue', label: 'Live Queue' },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-muted-foreground'
      )}
      onClick={() => setSheetOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Shear Bliss</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {!isUserLoading &&
            (user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                       <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><User className="mr-2 h-4 w-4" />Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            ))}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-10">
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setSheetOpen(false)}>
                    <Scissors className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Shear Bliss</span>
                  </Link>
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} />
                  ))}
                  <div className="border-t pt-6 flex flex-col gap-4">
                     {!isUserLoading && !user && (
                       <>
                        <Button asChild variant="outline">
                            <Link href="/login" onClick={() => setSheetOpen(false)}>Log In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup" onClick={() => setSheetOpen(false)}>Sign Up</Link>
                        </Button>
                       </>
                     )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
