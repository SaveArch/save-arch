import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArchaeologyBackground } from "@/components/ArchaeologyBackground";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import ReportPage from "./pages/ReportPage";
import ThankYouPage from "./pages/ThankYouPage";
import DigitizePage from "./pages/DigitizePage";
import VolunteersPage from "./pages/VolunteersPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ArchaeologyBackground opacity={0.22} />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/digitize" element={<DigitizePage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
