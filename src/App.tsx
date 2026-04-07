import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import HotelDetails from "./pages/HotelDetails.tsx";
import HotelDonationForm from "./pages/HotelDonationForm.tsx";
import ManageDonations from "./pages/ManageDonations.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProfileCompletionModal from "./components/ProfileCompletionModal.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProfileCompletionModal />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/hotels/:hotelName" element={<HotelDetails />} />
            <Route path="/donate-hotel" element={<HotelDonationForm />} />
            <Route path="/manage-donations" element={<ManageDonations />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
