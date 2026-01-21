import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GestionClientes from "./pages/GestionClientes";
import SeguimientoClientes from "./pages/SeguimientoClientes";
import Chats from "./pages/Chats";
import Usuarios from "./pages/Usuarios";
import Plantillas from "./pages/Plantillas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout wrapper for authenticated pages
function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes with Sidebar */}
          <Route path="/dashboard" element={
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          } />
          <Route path="/clientes" element={
            <AuthenticatedLayout>
              <GestionClientes />
            </AuthenticatedLayout>
          } />
          <Route path="/seguimiento" element={
            <AuthenticatedLayout>
              <SeguimientoClientes />
            </AuthenticatedLayout>
          } />
          <Route path="/chats" element={
            <AuthenticatedLayout>
              <Chats />
            </AuthenticatedLayout>
          } />
          <Route path="/usuarios" element={
            <AuthenticatedLayout>
              <Usuarios />
            </AuthenticatedLayout>
          } />
          <Route path="/plantillas" element={
            <AuthenticatedLayout>
              <Plantillas />
            </AuthenticatedLayout>
          } />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
