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
      <header className="sticky top-0 w-full z-50 border-b border-slate-200 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold ml-2 text-slate-900">
                Dealerscript
              </span>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user?.email === 'admin@admin.com' && (
              <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
            <div className="relative">
              <button onClick={onNotificationClick} className="relative text-slate-600 hover:text-slate-900 transition-colors">
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
                  <Link href="/settings" className="flex items-center space-x-2 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-300">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{user?.email}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to User Settings</p>
                </TooltipContent>
              </Tooltip>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout} 
                className="text-sm border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </nav>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-slate-200 py-4">
            <div className="container mx-auto px-4 space-y-4">
              <Link 
                href="/dashboard" 
                className="block py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              {user?.email === 'admin@admin.com' && (
                <Link 
                  href="/admin" 
                  className="block py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <div className="py-2 border-t border-slate-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href="/settings" 
                      className="flex items-center space-x-2 mb-3 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-600" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{user?.email}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to User Settings</p>
                  </TooltipContent>
                </Tooltip>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout} 
                  className="text-sm border-slate-300 text-slate-700 w-full justify-start hover:bg-slate-50 hover:border-slate-400"
                >
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