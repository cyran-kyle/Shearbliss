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
    name: 'Precision Haircut',
    description: 'A tailored cut to suit your style and face shape, including a wash and blow-dry.',
    price: 65,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1549236177-77e8271c34b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXJjdXR8ZW58MHx8fHwxNzcwNzk5NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-2',
    name: 'Full Color & Style',
    description: 'Transform your look with a vibrant, all-over color, finished with a professional styling session.',
    price: 150,
    duration: 120,
    imageUrl: 'https://images.unsplash.com/photo-1605980766335-d3a41c7332a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aGFpciUyMGNvbG9yaW5nfGVufDB8fHx8MTc3MDcyOTI4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-3',
    name: 'Balayage & Highlights',
    description: 'Achieve a natural, sun-kissed look with beautifully blended, hand-painted highlights.',
    price: 220,
    duration: 180,
    imageUrl: 'https://images.unsplash.com/photo-1527829619216-f3de4bcb9533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxoYWlyJTIwaGlnaGxpZ2h0c3xlbnwwfHx8fDE3NzA3OTk2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-4',
    name: 'Luxury Blowout',
    description: 'A voluminous and sleek blowout for a special occasion or just to feel fabulous.',
    price: 50,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1712481697233-83850fd0ca32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxoYWlyJTIwc3R5bGluZ3xlbnwwfHx8fDE3NzA3MDc1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-5',
    name: 'Deep Conditioning Treatment',
    description: 'Revitalize and nourish your hair with an intensive mask treatment.',
    price: 40,
    duration: 30,
    imageUrl: 'https://images.unsplash.com/photo-1707979577466-2d6109c68a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxoYWlyJTIwdHJlYXRtZW50fGVufDB8fHx8MTc3MDc1MzgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ser-6',
    name: 'Men\'s Grooming Cut',
    description: 'A sharp, modern cut designed for men, including a precision trim and style.',
    price: 45,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1654097803253-d481b6751f29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtYW4lMjBoYWlyY3V0fGVufDB8fHx8MTc3MDc5OTYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1704311167385-e42095130238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjBzdHlsaXN0fGVufDB8fHx8MTc3MDc5OTYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1590540178859-647e3b7a70bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYWxlJTIwc3R5bGlzdHxlbnwwfHx8fDE3NzA3OTk2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1617391654484-2894196c2cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxmZW1hbGUlMjBoYWlyZHJlc3NlcnxlbnwwfHx8fDE3NzA3OTk2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1590540179937-484393bfd879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtYWxlJTIwYmFyYmVyfGVufDB8fHx8MTc3MDc5OTYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    reviews: [
      { id: 'rev-6', userName: 'David S.', rating: 5, comment: 'Liam is the best for modern men\'s cuts. Great attention to detail.', createdAt: '1 week ago' },
    ],
  },
];

export const getServices = () => services;
export const getStaff = () => staff;
export const getServiceById = (id: string) => services.find((s) => s.id === id);
export const getStaffById = (id: string) => staff.find((s) => s.id === id);
