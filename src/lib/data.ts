import { placeholderImages } from './placeholder-images';

const getPlaceholderImageUrl = (id: string) => {
  const image = placeholderImages.find((img) => img.id === id);
  return image?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
};


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
    imageUrl: getPlaceholderImageUrl('ser-1'),
  },
  {
    id: 'ser-2',
    name: 'Pedicure',
    description: 'Relax and rejuvenate with a full pedicure service, including polish.',
    price: 40,
    duration: 60,
    imageUrl: getPlaceholderImageUrl('ser-2'),
  },
  {
    id: 'ser-3',
    name: 'Manicure',
    description: 'Classic manicure service to keep your hands looking their best.',
    price: 30,
    duration: 45,
    imageUrl: getPlaceholderImageUrl('ser-3'),
  },
  {
    id: 'ser-4',
    name: 'Acrylic Nails',
    description: 'Get a stunning and durable full set of acrylic nails.',
    price: 70,
    duration: 90,
    imageUrl: getPlaceholderImageUrl('ser-4'),
  },
  {
    id: 'ser-5',
    name: 'Facial Treatment',
    description: 'A deep-cleansing and relaxing facial to refresh your skin.',
    price: 80,
    duration: 60,
    imageUrl: getPlaceholderImageUrl('ser-5'),
  },
  {
    id: 'ser-6',
    name: 'Wig Making',
    description: 'Creation of a custom wig tailored to your specifications.',
    price: 300,
    duration: 240,
    imageUrl: getPlaceholderImageUrl('ser-6'),
  },
  {
    id: 'ser-7',
    name: 'Wig Installation',
    description: 'Professional fitting and styling of your wig for a flawless look.',
    price: 100,
    duration: 75,
    imageUrl: getPlaceholderImageUrl('ser-7'),
  },
  {
    id: 'ser-8',
    name: 'Press On Nails',
    description: 'Quick and stylish press-on nail application for any occasion.',
    price: 25,
    duration: 30,
    imageUrl: getPlaceholderImageUrl('ser-8'),
  },
  {
    id: 'ser-9',
    name: 'Tidy and Polish',
    description: 'A quick nail shaping and fresh polish application.',
    price: 20,
    duration: 25,
    imageUrl: getPlaceholderImageUrl('ser-9'),
  },
  {
    id: 'ser-10',
    name: 'Color Touch Up',
    description: 'Root touch-up to maintain your vibrant hair color.',
    price: 60,
    duration: 60,
    imageUrl: getPlaceholderImageUrl('ser-10'),
  },
  {
    id: 'ser-11',
    name: 'Hair Wash',
    description: 'A professional and relaxing hair wash and conditioning.',
    price: 25,
    duration: 30,
    imageUrl: getPlaceholderImageUrl('ser-11'),
  },
  {
    id: 'ser-12',
    name: 'Sleek Ponytail',
    description: 'Get a perfectly sleek and stylish ponytail for a sophisticated look.',
    price: 55,
    duration: 45,
    imageUrl: getPlaceholderImageUrl('ser-12'),
  },
  {
    id: 'ser-13',
    name: 'Finger Waves',
    description: 'Classic and elegant finger wave styling for a timeless look.',
    price: 65,
    duration: 60,
    imageUrl: getPlaceholderImageUrl('ser-13'),
  },
  {
    id: 'ser-14',
    name: 'Hair Straightening',
    description: 'A silk press or flat iron service for beautifully straight hair.',
    price: 75,
    duration: 90,
    imageUrl: getPlaceholderImageUrl('ser-14'),
  },
  {
    id: 'ser-15',
    name: 'Waxing',
    description: 'Professional eyebrow waxing to shape and define your brows.',
    price: 20,
    duration: 20,
    imageUrl: getPlaceholderImageUrl('ser-15'),
  },
  {
    id: 'ser-16',
    name: 'Body Piercing',
    description: 'Safe and sterile body piercing service, including ears, nose, and more.',
    price: 40,
    duration: 20,
    imageUrl: getPlaceholderImageUrl('ser-16'),
  },
  {
    id: 'ser-17',
    name: 'Eyelash Extension',
    description: 'A full set of classic eyelash extensions for a stunning look.',
    price: 120,
    duration: 120,
    imageUrl: getPlaceholderImageUrl('ser-17'),
  },
  {
    id: 'ser-18',
    name: 'Hair Coloring',
    description: 'Transform your look with a vibrant, all-over color.',
    price: 150,
    duration: 120,
    imageUrl: getPlaceholderImageUrl('ser-18'),
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
    imageUrl: getPlaceholderImageUrl('staff-1'),
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
    imageUrl: getPlaceholderImageUrl('staff-2'),
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
    imageUrl: getPlaceholderImageUrl('staff-3'),
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
    imageUrl: getPlaceholderImageUrl('staff-4'),
    reviews: [
      { id: 'rev-6', userName: 'David S.', rating: 5, comment: 'Liam is the best for modern men\'s cuts. Great attention to detail.', createdAt: '1 week ago' },
    ],
  },
];

export const getServices = () => services;
export const getStaff = () => staff;
export const getServiceById = (id: string) => services.find((s) => s.id === id);
export const getStaffById = (id: string) => staff.find((s) => s.id === id);
