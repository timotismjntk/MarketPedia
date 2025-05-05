import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/layout/BottomNavigation";
import { CartProvider } from "./hooks/useCart";
import { AuthProvider } from "./hooks/useAuth";
import { ProductsProvider } from "./hooks/useProducts";
import { NotificationsProvider } from "./hooks/useNotifications";
import MainLayout from "./components/layout/MainLayout";
import SellerLayout from "./components/layout/SellerLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SellerProfilePage from "./pages/SellerProfilePage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import LoyaltyPage from "./pages/LoyaltyPage";

// Seller Pages
import SellerDashboardPage from "./pages/seller/DashboardPage";
import SellerProductsPage from "./pages/seller/ProductsPage";
import SellerOrdersPage from "./pages/seller/OrdersPage";
import SellerPromotionsPage from "./pages/seller/PromotionsPage";
import SellerChatPage from "./pages/seller/ChatPage";
import SellerLiveStreamPage from "./pages/seller/LiveStreamPage";
import SellerUploadPage from "./pages/seller/UploadPage";
import SellerReviewsPage from "./pages/seller/ReviewsPage";
import SellerProfileEditPage from "./pages/seller/ProfileEditPage";
import SellerNotificationsPage from "./pages/seller/NotificationsPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import AdminCategoriesPage from "./pages/admin/CategoriesPage";
import AdminPromotionsPage from "./pages/admin/PromotionsPage";
import AdminReportsPage from "./pages/admin/ReportsPage";
import AdminComplaintsPage from "./pages/admin/ComplaintsPage";
import AdminModerationPage from "./pages/admin/ModerationPage";
import AdminNotificationsPage from "./pages/admin/NotificationsPage";
import AdminCommissionPage from "./pages/admin/CommissionPage";

// Order Status Pages
import UnpaidOrdersPage from "./pages/orders/UnpaidOrdersPage";
import PackedOrdersPage from "./pages/orders/PackedOrdersPage";
import ShippedOrdersPage from "./pages/orders/ShippedOrdersPage";
import RateOrdersPage from "./pages/orders/RateOrdersPage";

// Account Settings Page
import AccountSettingsPage from "./pages/AccountSettingsPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <NotificationsProvider>
          <ProductsProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/auth" element={<AuthPage />} />
                  
                  {/* Main App Routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Index />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="product/:id" element={<ProductDetailPage />} />
                    <Route path="seller/:id" element={<SellerProfilePage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="profile/edit" element={<ProfileEditPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/unpaid" element={<UnpaidOrdersPage />} />
                    <Route path="orders/packed" element={<PackedOrdersPage />} />
                    <Route path="orders/shipped" element={<ShippedOrdersPage />} />
                    <Route path="orders/rate" element={<RateOrdersPage />} />
                    <Route path="order/:id" element={<OrderTrackingPage />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="settings/account" element={<AccountSettingsPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="chat/:id" element={<ChatPage />} />
                    <Route path="loyalty" element={<LoyaltyPage />} />
                  </Route>
                  
                  {/* Seller Routes */}
                  <Route 
                    path="/seller" 
                    element={
                      // <ProtectedRoute requiredRole="seller">
                        <SellerLayout />
                      // </ProtectedRoute>
                    }
                  >
                    <Route index element={<SellerDashboardPage />} />
                    <Route path="profile/edit" element={<SellerProfileEditPage />} />
                    <Route path="products" element={<SellerProductsPage />} />
                    <Route path="orders" element={<SellerOrdersPage />} />
                    <Route path="promotions" element={<SellerPromotionsPage />} />
                    <Route path="reviews" element={<SellerReviewsPage />} />
                    <Route path="chat" element={<SellerChatPage />} />
                    <Route path="chat/:id" element={<SellerChatPage />} />
                    <Route path="live" element={<SellerLiveStreamPage />} />
                    <Route path="upload" element={<SellerUploadPage />} />
                    <Route path="notifications" element={<SellerNotificationsPage />} />
                  </Route>
                  
                  {/* Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      // <ProtectedRoute requiredRole="admin">
                        <AdminLayout />
                      // </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="categories" element={<AdminCategoriesPage />} />
                    <Route path="promotions" element={<AdminPromotionsPage />} />
                    <Route path="reports" element={<AdminReportsPage />} />
                    <Route path="complaints" element={<AdminComplaintsPage />} />
                    <Route path="moderation" element={<AdminModerationPage />} />
                    <Route path="notifications" element={<AdminNotificationsPage />} />
                    <Route path="settings/commission" element={<AdminCommissionPage />} />
                  </Route>
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </ProductsProvider>
        </NotificationsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
