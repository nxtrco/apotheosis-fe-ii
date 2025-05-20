'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNavbar } from '@/components/Dashboard/Navbar';
import { VinForm } from '@/components/Dashboard/VinForm';
import { VinHistoryList } from '@/components/Dashboard/VinHistoryList';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [newestVinId, setNewestVinId] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect to signin if not authenticated and not loading
    if (!isAuthenticated && !loading) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]);
  
  const handleVinLookupSuccess = (newVinId: string) => {
    setNotificationCount((c) => c + 1);
    setRefreshFlag((f) => !f); // This will trigger the useEffect in VinHistoryList
    setNewestVinId(newVinId);
  };
  
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Don't render the dashboard until authenticated
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardNavbar
        notificationCount={notificationCount}
        onNotificationClick={handleNotificationClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid md:grid-cols-12 gap-8">
          {/* VIN Form */}
          <div className="md:col-span-5 lg:col-span-4">
            <VinForm onSuccess={handleVinLookupSuccess} />
          </div>
          
          {/* VIN History List */}
          <div className="md:col-span-7 lg:col-span-8">
            <VinHistoryList refreshFlag={refreshFlag} newestVinId={newestVinId} />
          </div>
        </div>
      </main>
    </div>
  );
}