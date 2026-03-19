import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Pages
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

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

// Layout wrapper
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
    <WhatsAppFloat />
  </>
);

// ✅ PartsWrapper forces AllParts to remount on URL changes
const PartsWrapper = () => {
  const location = useLocation();
  return <AllParts key={location.pathname + location.search} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />

                {/* ✅ Updated /parts route */}
                <Route path="/parts" element={<PartsWrapper />} />

                <Route path="/parts/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/request-part" element={<RequestPart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* ADMIN ROUTES */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
