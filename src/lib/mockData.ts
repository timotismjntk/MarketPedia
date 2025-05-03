
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  seller: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
}

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Sports',
  'Books',
  'Toys'
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Wireless Earbuds',
    price: 59.99,
    image: '/placeholder.svg',
    description: 'High-quality wireless earbuds with noise cancellation and long battery life. Perfect for music lovers and professionals on the go.',
    category: 'Electronics',
    seller: 'TechGadgets',
    rating: 4.8,
    reviews: 243,
    inStock: true
  },
  {
    id: '2',
    name: 'Premium Cotton T-Shirt',
    price: 19.99,
    image: '/placeholder.svg',
    description: 'Comfortable cotton t-shirt with modern fit. Available in multiple colors and sizes.',
    category: 'Fashion',
    seller: 'StyleHub',
    rating: 4.5,
    reviews: 189,
    inStock: true
  },
  {
    id: '3',
    name: 'Smart Home Speaker',
    price: 129.99,
    image: '/placeholder.svg',
    description: 'Voice-controlled smart speaker with premium sound quality and virtual assistant.',
    category: 'Electronics',
    seller: 'SmartHome',
    rating: 4.7,
    reviews: 312,
    inStock: true
  },
  {
    id: '4',
    name: 'Organic Face Cream',
    price: 24.99,
    image: '/placeholder.svg',
    description: 'Natural face cream with organic ingredients. Hydrates and rejuvenates your skin.',
    category: 'Beauty',
    seller: 'NaturalBeauty',
    rating: 4.6,
    reviews: 157,
    inStock: true
  },
  {
    id: '5',
    name: 'Fitness Tracker Watch',
    price: 79.99,
    image: '/placeholder.svg',
    description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and workout modes.',
    category: 'Sports',
    seller: 'FitGear',
    rating: 4.4,
    reviews: 276,
    inStock: false
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    price: 199.99,
    image: '/placeholder.svg',
    description: 'Comfortable ergonomic chair for home office with adjustable height and lumbar support.',
    category: 'Home',
    seller: 'HomeOffice',
    rating: 4.9,
    reviews: 124,
    inStock: true
  },
  {
    id: '7',
    name: 'Bestselling Novel',
    price: 14.99,
    image: '/placeholder.svg',
    description: 'Award-winning novel that has topped charts worldwide. Available in hardcover and paperback.',
    category: 'Books',
    seller: 'BookWorld',
    rating: 4.7,
    reviews: 531,
    inStock: true
  },
  {
    id: '8',
    name: 'Kids Educational Toy Set',
    price: 34.99,
    image: '/placeholder.svg',
    description: 'STEM learning toy set for children ages 5-10. Develops critical thinking and creativity.',
    category: 'Toys',
    seller: 'EduToys',
    rating: 4.5,
    reviews: 98,
    inStock: true
  }
];

export const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'buyer',
  avatar: '/placeholder.svg'
};
