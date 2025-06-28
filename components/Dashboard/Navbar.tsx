'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, LogOut, Menu, User, X, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/lib/auth';

interface DashboardNavbarProps {
  notificationCount: number;
  onNotificationClick?: () => void;
}

export function DashboardNavbar({ notificationCount, onNotificationClick }: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <TooltipProvider>
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Car className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold ml-2">Apotheosis vehicle listings</h1>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link> */}
          {user?.email === 'admin@admin.com' && (
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
          <div className="relative">
            <button onClick={onNotificationClick} className="relative">
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/settings" className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md transition-colors">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{user?.email}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to User Settings</p>
              </TooltipContent>
            </Tooltip>
            <Button variant="ghost" size="sm" onClick={logout} className="text-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/40 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              href="/dashboard" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {user?.email === 'admin@admin.com' && (
              <Link 
                href="/admin" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
            <div className="py-2 border-t border-border/40">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href="/settings" 
                    className="flex items-center space-x-2 mb-3 hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="bg-primary/10 p-1 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{user?.email}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to User Settings</p>
                </TooltipContent>
              </Tooltip>
              <Button variant="ghost" size="sm" onClick={logout} className="text-sm w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
    </TooltipProvider>
  );
}