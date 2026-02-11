export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  imageId: string;
  imageHint: string;
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
  imageId: string;
  imageHint: string;
  reviews: StaffReview[];
};

const services: Service[] = [
  {
    id: 'ser-1',
    name: 'Precision Haircut',
    description: 'A tailored cut to suit your style and face shape, including a wash and blow-dry.',
    price: 65,
    duration: 60,
    imageId: 'service-1',
    imageHint: 'woman haircut'
  },
  {
    id: 'ser-2',
    name: 'Full Color & Style',
    description: 'Transform your look with a vibrant, all-over color, finished with a professional styling session.',
    price: 150,
    duration: 120,
    imageId: 'service-2',
    imageHint: 'hair coloring'
  },
  {
    id: 'ser-3',
    name: 'Balayage & Highlights',
    description: 'Achieve a natural, sun-kissed look with beautifully blended, hand-painted highlights.',
    price: 220,
    duration: 180,
    imageId: 'service-3',
    imageHint: 'hair highlights'
  },
  {
    id: 'ser-4',
    name: 'Luxury Blowout',
    description: 'A voluminous and sleek blowout for a special occasion or just to feel fabulous.',
    price: 50,
    duration: 45,
    imageId: 'service-4',
    imageHint: 'hair styling'
  },
  {
    id: 'ser-5',
    name: 'Deep Conditioning Treatment',
    description: 'Revitalize and nourish your hair with an intensive mask treatment.',
    price: 40,
    duration: 30,
    imageId: 'service-5',
    imageHint: 'hair treatment'
  },
  {
    id: 'ser-6',
    name: 'Men\'s Grooming Cut',
    description: 'A sharp, modern cut designed for men, including a precision trim and style.',
    price: 45,
    duration: 45,
    imageId: 'service-6',
    imageHint: 'man haircut'
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
    imageId: 'staff-1',
    imageHint: 'female stylist',
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
    imageId: 'staff-2',
    imageHint: 'male stylist',
    reviews: [
      { id: 'rev-3', userName: 'Michael B.', rating: 5, comment: 'Ben always gives the perfect cut. True professional.', createdAt: '3 weeks ago' },
    ],
  },
  {
    id: 'staff-3',
    name: 'Sophia Rodriguez',
    specialization: 'Balayage & Styling',
    experience: '8 years',
    rating: 4.9,
    reviewCount: 152,
    imageId: 'staff-3',
    imageHint: 'female hairdresser',
    reviews: [
      { id: 'rev-4', userName: 'Chloe T.', rating: 5, comment: 'My balayage is absolutely stunning. Sophia is an artist!', createdAt: '5 days ago' },
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
    imageId: 'staff-4',
    imageHint: 'male barber',
    reviews: [
      { id: 'rev-6', userName: 'David S.', rating: 5, comment: 'Liam is the best for modern men\'s cuts. Great attention to detail.', createdAt: '1 week ago' },
    ],
  },
];

export const getServices = () => services;
export const getStaff = () => staff;
export const getServiceById = (id: string) => services.find((s) => s.id === id);
export const getStaffById = (id: string) => staff.find((s) => s.id === id);
