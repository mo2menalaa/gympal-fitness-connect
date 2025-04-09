
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserOnboarding from "./pages/UserOnboarding";
import CoachDiscovery from "./pages/CoachDiscovery";
import Dashboard from "./pages/Dashboard";
import CoachDashboard from "./pages/CoachDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import CoachSetup from "./pages/CoachSetup";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* User Routes */}
          <Route element={<AuthRoute requiredRole="user" />}>
            <Route path="/onboarding" element={<UserOnboarding />} />
            <Route path="/coaches" element={<CoachDiscovery />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          {/* Coach Routes */}
          <Route element={<AuthRoute requiredRole="coach" />}>
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            <Route path="/coach/setup" element={<CoachSetup />} />
          </Route>
          
          {/* Moderator Routes */}
          <Route element={<AuthRoute requiredRole="moderator" />}>
            <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
          </Route>
          
          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
