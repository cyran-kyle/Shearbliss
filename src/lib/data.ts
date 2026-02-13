export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  imageUrl: string;
};

export type StaffReview = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Staff = {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  reviews: StaffReview[];
};

const services: Service[] = [
  {
    id: 'ser-1',
    name: 'Hair Treatment',
    description: 'A revitalizing treatment to nourish and restore your hair\'s health and shine.',
    price: 50,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1620921027722-3482a25a94e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhZnJvJTIwaGFpciUyMHRyZWF0bWVudHxlbnwwfHx8fDE3MDc4MDk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-2',
    name: 'Pedicure',
    description: 'Relax and rejuvenate with a full pedicure service, including polish.',
    price: 40,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1617329188041-3b95b8a4f6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMGJsYWNrJTIwd29tYW58ZW58MHx8fHwxNzA3ODA5NzAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-3',
    name: 'Manicure',
    description: 'Classic manicure service to keep your hands looking their best.',
    price: 30,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df6231343542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMGRhcmslMjBza2lufGVufDB8fHx8MTcwNzgwOTczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-4',
    name: 'Acrylic Nails',
    description: 'Get a stunning and durable full set of acrylic nails.',
    price: 70,
    duration: 90,
    imageUrl: 'https://images.unsplash.com/photo-1610991334499-913b8a342654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhY3J5bGljJTIwbmFpbHMlMjBkYXJrJTIwc2tpbnxlbnwwfHx8fDE3MDc4MDk4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-5',
    name: 'Facial Treatment',
    description: 'A deep-cleansing and relaxing facial to refresh your skin.',
    price: 80,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1597902996162-386f6a7353b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBibGFjayUyMHdvbWFufGVufDB8fHx8MTcwNzgwOTg0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-6',
    name: 'Wig Making',
    description: 'Creation of a custom wig tailored to your specifications.',
    price: 300,
    duration: 240,
    imageUrl: 'https://images.unsplash.com/photo-1596767352399-2c77b4515c0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3aWclMjBtYWtpbmd8ZW58MHx8fHwxNzA3ODA5ODg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-7',
    name: 'Wig Installation',
    description: 'Professional fitting and styling of your wig for a flawless look.',
    price: 100,
    duration: 75,
    imageUrl: 'https://images.unsplash.com/photo-1621602123714-43d4d436c84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3aWclMjBpbnN0YWxsYXRpb258ZW58MHx8fHwxNzA3ODA5OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-8',
    name: 'Press On Nails',
    description: 'Quick and stylish press-on nail application for any occasion.',
    price: 25,
    duration: 30,
    imageUrl: 'https://images.unsplash.com/photo-1604258599424-9c5d15c71a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcmVzcyUyMG9uJTIwbmFpbHMlMjBkYXJrJTIwc2tpbnxlbnwwfHx8fDE3MDc4MDk5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-9',
    name: 'Tidy and Polish',
    description: 'A quick nail shaping and fresh polish application.',
    price: 20,
    duration: 25,
    imageUrl: 'https://images.unsplash.com/photo-1519415510239-509536932a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuYWlsJTIwcG9saXNoJTIwZGFyayUyMHNraW58ZW58MHx8fHwxNzA3ODEwMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-10',
    name: 'Color Touch Up',
    description: 'Root touch-up to maintain your vibrant hair color.',
    price: 60,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1615217896001-35a77519a716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYWlyJTIwcm9vdCUyMHRvdWNodXB8ZW58MHx8fHwxNzA3ODEwMDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-11',
    name: 'Hair Wash',
    description: 'A professional and relaxing hair wash and conditioning.',
    price: 25,
    duration: 30,
    imageUrl: 'https://images.unsplash.com/photo-1550985222-3862c21252b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYWlyJTIwd2FzaGluZyUyMGJsYWNrJTIwd29tYW58ZW58MHx8fHwxNzA3ODEwMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-12',
    name: 'Sleek Ponytail',
    description: 'Get a perfectly sleek and stylish ponytail for a sophisticated look.',
    price: 55,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1628011244234-73d193a55389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb255dGFpbCUyMGJsYWNrJTIwd29tYW58ZW58MHx8fHwxNzA3ODEwMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-13',
    name: 'Finger Waves',
    description: 'Classic and elegant finger wave styling for a timeless look.',
    price: 65,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1621298418047-b8451f2b1d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmaW5nZXIlMjB3YXZlcyUyMGhhaXJ8ZW58MHx8fHwxNzA3ODEwMTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-14',
    name: 'Hair Straightening',
    description: 'A silk press or flat iron service for beautifully straight hair.',
    price: 75,
    duration: 90,
    imageUrl: 'https://images.unsplash.com/photo-1610022271891-3866c117d3d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzaWxrJTIwcHJlc3MlMjBoYWlyfGVufDB8fHx8fDE3MDc4MTAxODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-15',
    name: 'Waxing',
    description: 'Professional eyebrow waxing to shape and define your brows.',
    price: 20,
    duration: 20,
    imageUrl: 'https://images.unsplash.com/photo-1597462725882-5351543c7482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleWVicm93JTIwd2F4aW5nJTIwZGFyayUyMHNraW58ZW58MHx8fHwxNzA3ODEwMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-16',
    name: 'Ear Piercing',
    description: 'Safe and sterile ear piercing service.',
    price: 40,
    duration: 20,
    imageUrl: 'https://images.unsplash.com/photo-1601836109154-b5a805f5f6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlYXIlMjBwaWVyY2luZ3xlbnwwfHx8fDE3MDc4MTAyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-17',
    name: 'Eyelash Extension',
    description: 'A full set of classic eyelash extensions for a stunning look.',
    price: 120,
    duration: 120,
    imageUrl: 'https://images.unsplash.com/photo-1596752399990-e5c94c9e78b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleWVsYXNoJTIwZXh0ZW5zaW9uJTIwZGFyayUyMHNraW58ZW58MHx8fHwxNzA3ODEwMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-18',
    name: 'Hair Coloring',
    description: 'Transform your look with a vibrant, all-over color.',
    price: 150,
    duration: 120,
    imageUrl: 'https://images.unsplash.com/photo-1616163695277-cacf4a0880f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY29sb3JpbmclMjBkYXJrJTIwc2tpbnxlbnwwfHx8fDE3MDc4MTAzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];


const staff: Staff[] = [
  {
    id: 'staff-1',
    name: 'Olivia Chen',
    specialization: 'Color Specialist',
    experience: '10 years',
    rating: 4.9,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1624561172888-ac93c690e10c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYWlyZHJlc3NlciUyMHBvcnRyYWl0JTIwYmxhY2slMjB3b21hbnxlbnwwfHx8fDE3MDc4MTA1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    reviews: [
      { id: 'rev-1', userName: 'Emily R.', rating: 5, comment: 'Olivia is a miracle worker! My color has never looked better.', createdAt: '2 weeks ago' },
      { id: 'rev-2', userName: 'Jessica P.', rating: 5, comment: 'So knowledgeable and friendly. Highly recommend!', createdAt: '1 month ago' },
    ],
  },
  {
    id: 'staff-2',
    name: 'Benjamin Carter',
    specialization: 'Master Stylist & Cuts',
    experience: '12 years',
    rating: 4.8,
    reviewCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1614283332194-275a7c2b3f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBwb3J0cmFpdCUyMGJsYWNrJTIwbWFufGVufDB8fHx8MTcwNzgxMDU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    reviews: [
      { id: 'rev-3', userName: 'Michael B.', rating: 5, comment: 'Ben always gives the perfect cut. True professional.', createdAt: '3 weeks ago' },
    ],
  },
  {
    id: 'staff-3',
    name: 'Sophia Rodriguez',
    specialization: 'Braids & Natural Hair',
    experience: '8 years',
    rating: 4.9,
    reviewCount: 152,
    imageUrl: 'https://images.unsplash.com/photo-1622286462520-a6a3b94a8e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoYWlyZHJlc3NlciUyMHBvcnRyYWl0JTIwYmxhY2slMjB3b21hbnxlbnwwfHx8fDE3MDc4MTA1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    reviews: [
      { id: 'rev-4', userName: 'Chloe T.', rating: 5, comment: 'My braids are absolutely stunning. Sophia is an artist!', createdAt: '5 days ago' },
      { id: 'rev-5', userName: 'Ava G.', rating: 5, comment: 'I loved my wedding hairstyle, it was perfect!', createdAt: '2 months ago' },
    ],
  },
  {
    id: 'staff-4',
    name: 'Liam Goldberg',
    specialization: 'Men\'s Grooming',
    experience: '7 years',
    rating: 4.7,
    reviewCount: 85,
    imageUrl: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxiYXJiZXIlMjBwb3J0cmFpdCUyMGJsYWNrJTIwbWFufGVufDB8fHx8fDE3MDc4MTA1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    reviews: [
      { id: 'rev-6', userName: 'David S.', rating: 5, comment: 'Liam is the best for modern men\'s cuts. Great attention to detail.', createdAt: '1 week ago' },
    ],
  },
];

export const getServices = () => services;
export const getStaff = () => staff;
export const getServiceById = (id: string) => services.find((s) => s.id === id);
export const getStaffById = (id: string) => staff.find((s) => s.id === id);
