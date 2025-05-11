import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Layout
import MainLayout from '@/components/layout/MainLayout';
import SellerLayout from '@/components/layout/SellerLayout';
import AdminLayout from '@/components/layout/AdminLayout';

// Auth Provider and Protected Routes
import { AuthProvider } from '@/hooks/useAuth';
import { NotificationsProvider } from '@/hooks/useNotifications';
import { CartProvider } from '@/hooks/useCart';
import { ProductsProvider } from '@/hooks/useProducts';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import AuthPage from '@/pages/AuthPage';
import Index from '@/pages/Index';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFound from '@/pages/NotFound';
import AccountSettingsPage from '@/pages/AccountSettingsPage';
import CheckoutPage from '@/pages/CheckoutPage';
import PaymentPage from '@/pages/PaymentPage';
import OrderTrackingPage from '@/pages/OrderTrackingPage';
import OrdersPage from '@/pages/OrdersPage';
import ChatPage from '@/pages/ChatPage';
import WishlistPage from '@/pages/WishlistPage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import SellerProfilePage from '@/pages/SellerProfilePage';
import LoyaltyPage from '@/pages/LoyaltyPage';
import NotificationsPage from '@/pages/NotificationsPage';
import LiveStreamsPage from '@/pages/LiveStreamsPage';
import LiveStreamViewPage from '@/pages/LiveStreamViewPage';

// Order status pages
import UnpaidOrdersPage from '@/pages/orders/UnpaidOrdersPage';
import PackedOrdersPage from '@/pages/orders/PackedOrdersPage';
import ShippedOrdersPage from '@/pages/orders/ShippedOrdersPage';
import RateOrdersPage from '@/pages/orders/RateOrdersPage';

// Seller pages
import SellerDashboard from '@/pages/seller/DashboardPage';
import SellerProducts from '@/pages/seller/ProductsPage';
import SellerOrders from '@/pages/seller/OrdersPage';
import SellerReviews from '@/pages/seller/ReviewsPage';
import SellerChat from '@/pages/seller/ChatPage';
import SellerLive from '@/pages/seller/LiveStreamPage';
import SellerUpload from '@/pages/seller/UploadPage';
import SellerPromotions from '@/pages/seller/PromotionsPage';
import SellerProfileEdit from '@/pages/seller/ProfileEditPage';
import SellerNotifications from '@/pages/seller/NotificationsPage';

// Admin pages
import AdminDashboard from '@/pages/admin/DashboardPage';
import AdminUsers from '@/pages/admin/UsersPage';
import AdminCategories from '@/pages/admin/CategoriesPage';
import AdminReports from '@/pages/admin/ReportsPage';
import AdminModeration from '@/pages/admin/ModerationPage';
import AdminComplaints from '@/pages/admin/ComplaintsPage';
import AdminPromotions from '@/pages/admin/PromotionsPage';
import AdminCommission from '@/pages/admin/CommissionPage';
import AdminNotifications from '@/pages/admin/NotificationsPage';

// Styles
import './App.css';

// Toast component
import { Toaster } from "@/components/ui/toaster";
import { WishlistProvider } from './hooks/useWishlist';

function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/auth" element={<AuthPage />} />

                  {/* Main Application Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/seller/:id" element={<SellerProfilePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/chat/:id" element={<ChatPage />} />
                    <Route path="/live" element={<LiveStreamsPage />} />
                    <Route path="/live/:id" element={<LiveStreamViewPage />} />
                    
                    {/* Protected Customer Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/profile/edit" element={<ProfileEditPage />} />
                      <Route path="/settings" element={<AccountSettingsPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/orders/unpaid" element={<UnpaidOrdersPage />} />
                      <Route path="/orders/packed" element={<PackedOrdersPage />} />
                      <Route path="/orders/shipped" element={<ShippedOrdersPage />} />
                      <Route path="/orders/rate" element={<RateOrdersPage />} />
                      <Route path="/order/:id" element={<OrderTrackingPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/loyalty" element={<LoyaltyPage />} />
                    </Route>
                  </Route>

                  {/* Seller Routes */}
                  <Route
                    element={
                      <SellerLayout />
                    }
                  >
                    <Route path="/seller" element={<SellerDashboard />} />
                    <Route path="/seller/products" element={<SellerProducts />} />
                    <Route path="/seller/products/upload" element={<SellerUpload />} />
                    <Route path="/seller/orders" element={<SellerOrders />} />
                    <Route path="/seller/reviews" element={<SellerReviews />} />
                    <Route path="/seller/chat" element={<SellerChat />} />
                    <Route path="/seller/chat/:id" element={<ChatPage />} />
                    <Route path="/seller/live" element={<SellerLive />} />
                    <Route path="/seller/promotions" element={<SellerPromotions />} />
                    <Route path="/seller/profile-edit" element={<SellerProfileEdit />} />
                    <Route path="/seller/notifications" element={<SellerNotifications />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route 
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/categories" element={<AdminCategories />} />
                    <Route path="/admin/reports" element={<AdminReports />} />
                    <Route path="/admin/moderation" element={<AdminModeration />} />
                    <Route path="/admin/complaints" element={<AdminComplaints />} />
                    <Route path="/admin/promotions" element={<AdminPromotions />} />
                    <Route path="/admin/commission" element={<AdminCommission />} />
                    <Route path="/admin/notifications" element={<AdminNotifications />} />
                  </Route>

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </Router>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;
