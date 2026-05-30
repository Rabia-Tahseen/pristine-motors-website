import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/* PUBLIC PAGES */
import Index from "./pages/Index";
import AllParts from "./pages/AllParts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import RequestPart from "./pages/RequestPart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cars from "./pages/Cars";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* ADMIN PAGES */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <WhatsAppFloat />
  </>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <AdminAuthProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <Routes>

                <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
                <Route path="/parts" element={<PublicLayout><AllParts /></PublicLayout>} />
                <Route path="/parts/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
                <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
                <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
                <Route path="/order-confirmation" element={<PublicLayout><OrderConfirmation /></PublicLayout>} />
                <Route path="/request-part" element={<PublicLayout><RequestPart /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/cars" element={<PublicLayout><Cars /></PublicLayout>} />

                {/* ✅ profile now has Navbar and Footer */}
                <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* ADMIN */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="requests" element={<AdminRequests />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />

              </Routes>
            </BrowserRouter>

          </AdminAuthProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
