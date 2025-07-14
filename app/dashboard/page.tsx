'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, TrendingUp, Users, Car, Activity, Zap } from 'lucide-react';
import { DashboardNavbar as Navbar } from '@/components/Dashboard/Navbar';
import VinForm from '@/components/Dashboard/VinForm';
import { VinHistoryList } from '@/components/Dashboard/VinHistoryList';
import { vinApi } from '@/lib/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount, setNotificationCount] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [newestVinId, setNewestVinId] = useState<string | null>(null);
  const [totalVins, setTotalVins] = useState(0);
  const [lastVinLookup, setLastVinLookup] = useState<{
    vin: string;
    timestamp: string;
  } | null>(() => {
    // Try to get last VIN from localStorage on component mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lastVinLookup');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Fetch total VIN count when the page loads or refreshFlag changes
  useEffect(() => {
    const fetchTotalVins = async () => {
      try {
        const response = await vinApi.getVinRecords(1, 1); // Get just one record to get total count
        const total = response.data.data.pagination?.total || 0;
        setTotalVins(total);
      } catch (error) {
        console.error('Failed to fetch total VINs:', error);
      }
    };
    fetchTotalVins();
  }, [refreshFlag]);

  // Update last VIN lookup when a new VIN is decoded
  const handleVinDecodeSuccess = (vin: string) => {
    const newLookup = {
      vin,
      timestamp: new Date().toISOString()
    };
    setLastVinLookup(newLookup);
    localStorage.setItem('lastVinLookup', JSON.stringify(newLookup));
    setActiveTab('history');
    setRefreshFlag(f => !f);
  };

  // Format the timestamp to "X time ago"
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const lookupTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - lookupTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar notificationCount={notificationCount} />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Welcome back! Here's what's happening with your vehicle data.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total VINs */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600">Total VINs</p>
                <p className="text-2xl font-bold text-slate-900">{totalVins.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Lifetime decoded VINs</p>
              </div>
            </CardContent>
          </Card>

          {/* Active Reports - Coming Soon */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <BarChart className="h-5 w-5 text-slate-600" />
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Coming Soon</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600">Active Reports</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
                <p className="text-sm text-slate-500">Feature in development</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Value - Coming Soon */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-slate-600" />
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Coming Soon</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600">Market Value</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
                <p className="text-sm text-slate-500">Feature in development</p>
              </div>
            </CardContent>
          </Card>

          {/* API Calls - Coming Soon */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-slate-600" />
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Coming Soon</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600">API Calls</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
                <p className="text-sm text-slate-500">Feature in development</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="vin-lookup" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              VIN Lookup
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">Recent Activity</CardTitle>
                  <CardDescription className="text-slate-600">
                    Your latest VIN lookups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lastVinLookup ? (
                      <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Car className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">VIN Lookup: {lastVinLookup.vin}</p>
                          <p className="text-xs text-slate-600">{getTimeAgo(lastVinLookup.timestamp)}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg">
                        <p className="text-slate-600">No recent VIN lookups</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">Quick Actions</CardTitle>
                  <CardDescription className="text-slate-600">
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setActiveTab('vin-lookup')}
                    >
                      <Car className="mr-2 h-5 w-5" />
                      New VIN Lookup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vin-lookup" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">VIN Lookup</CardTitle>
                <CardDescription className="text-slate-600">
                  Enter a VIN to get comprehensive vehicle information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VinForm onDecodeSuccess={(vin) => handleVinDecodeSuccess(vin)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">VIN History</CardTitle>
                <CardDescription className="text-slate-600">
                  View your previous VIN lookups and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VinHistoryList refreshFlag={refreshFlag} newestVinId={newestVinId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}