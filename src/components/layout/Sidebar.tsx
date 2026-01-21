import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  UserCog, 
  FileText, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/clientes', icon: Users, label: 'Gestión Clientes' },
  { path: '/seguimiento', icon: Sparkles, label: 'Seguimiento' },
  { path: '/chats', icon: MessageSquare, label: 'Chats' },
  { path: '/usuarios', icon: UserCog, label: 'Usuarios' },
  { path: '/plantillas', icon: FileText, label: 'Mensajes Masivos' },
];

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find(item => location.pathname.startsWith(item.path));

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b border-sidebar-border">
          <span className={cn(
            "font-bold text-xl text-primary transition-opacity",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            Orbit
          </span>
          {collapsed && (
            <span className="font-bold text-xl text-primary">O</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "orbit-nav-item",
                  isActive && "active",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-primary">Orbit</span>
            <span className="text-muted-foreground">|</span>
            {currentPage && (
              <div className="flex items-center gap-2 text-foreground">
                <currentPage.icon className="h-4 w-4" />
                <span>{currentPage.label}</span>
              </div>
            )}
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
