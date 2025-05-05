
// Mock data for products, categories, etc.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  seller: string;
  status?: 'active' | 'pending' | 'rejected';
}

export const categories = [
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Beauty',
  'Sports',
  'Books',
  'Toys',
  'Furniture'
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Modern Wireless Earbuds',
    description: 'Experience crystal-clear sound with our latest wireless earbuds. Features active noise cancellation and 30-hour battery life.',
    price: 79.99,
    image: 'https://picsum.photos/id/1/800/600',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    seller: 'TechGadgets',
    status: 'active'
  },
  {
    id: 'p2',
    name: 'Smart Home Assistant',
    description: 'Control your home with voice commands. Compatible with most smart home devices and services.',
    price: 129.99,
    image: 'https://picsum.photos/id/11/800/600',
    category: 'Electronics',
    rating: 4.2,
    reviews: 85,
    inStock: true,
    seller: 'TechGadgets',
    status: 'active'
  },
  {
    id: 'p3',
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with this adjustable ergonomic chair. Features lumbar support and breathable mesh back.',
    price: 199.99,
    image: 'https://picsum.photos/id/21/800/600',
    category: 'Furniture',
    rating: 4.7,
    reviews: 42,
    inStock: false,
    seller: 'HomeOffice',
    status: 'active'
  },
  {
    id: 'p4',
    name: 'Stainless Steel Water Bottle',
    description: 'Stay hydrated with this insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 24.99,
    image: 'https://picsum.photos/id/31/800/600',
    category: 'Sports',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    seller: 'StyleHub',
    status: 'active'
  },
  {
    id: 'p5',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, sustainable, and stylish. Made from 100% organic cotton with eco-friendly dyes.',
    price: 29.99,
    image: 'https://picsum.photos/id/41/800/600',
    category: 'Fashion',
    rating: 4.3,
    reviews: 67,
    inStock: true,
    seller: 'StyleHub',
    status: 'active'
  },
  {
    id: 'p6',
    name: 'Smart Fitness Tracker',
    description: 'Track your workouts, heart rate, and sleep patterns. Water-resistant and long battery life.',
    price: 89.99,
    image: 'https://picsum.photos/id/51/800/600',
    category: 'Electronics',
    rating: 4.4,
    reviews: 94,
    inStock: true,
    seller: 'TechGadgets',
    status: 'active'
  },
  {
    id: 'p7',
    name: 'Non-Stick Cooking Set',
    description: 'Complete set of non-stick pots and pans. Dishwasher safe and PFOA-free.',
    price: 149.99,
    image: 'https://picsum.photos/id/61/800/600',
    category: 'Home & Kitchen',
    rating: 4.6,
    reviews: 38,
    inStock: true,
    seller: 'HomeOffice',
    status: 'active'
  },
  {
    id: 'p8',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with rich sound and deep bass. Waterproof and 12 hours of playtime.',
    price: 59.99,
    image: 'https://picsum.photos/id/71/800/600',
    category: 'Electronics',
    rating: 4.1,
    reviews: 112,
    inStock: true,
    seller: 'TechGadgets',
    status: 'active'
  }
];

// Sample order statuses for profile page
export const orderStatuses = [
  { key: 'to-pay', label: 'Unpaid', count: 2, route: '/orders/unpaid' },
  { key: 'to-ship', label: 'Packed', count: 3, route: '/orders/packed' },
  { key: 'to-receive', label: 'Shipped', count: 1, route: '/orders/shipped' },
  { key: 'to-review', label: 'Rate', count: 4, route: '/orders/rate' }
];
