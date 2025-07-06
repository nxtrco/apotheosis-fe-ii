'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, TrendingUp, Users, Car, Activity, Zap } from 'lucide-react';
import { DashboardNavbar as Navbar } from '@/components/Dashboard/Navbar';
import VinForm from '@/components/Dashboard/VinForm';
import { VinHistoryList } from '@/components/Dashboard/VinHistoryList';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount, setNotificationCount] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [newestVinId, setNewestVinId] = useState<string | null>(null);

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total VINs</CardTitle>
              <Car className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1,234</div>
              <p className="text-xs text-slate-600">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Reports</CardTitle>
              <BarChart className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">89</div>
              <p className="text-xs text-slate-600">
                +5% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Market Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$2.4M</div>
              <p className="text-xs text-slate-600">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">API Calls</CardTitle>
              <Zap className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">45.2K</div>
              <p className="text-xs text-slate-600">
                +23% from last week
              </p>
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
                    Your latest VIN lookups and reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Car className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">VIN Lookup: 1HGBH41JXMN109186</p>
                        <p className="text-xs text-slate-600">2 minutes ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <BarChart className="h-4 w-4 text-cyan-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Market Report Generated</p>
                        <p className="text-xs text-slate-600">15 minutes ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">New</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">API Usage Updated</p>
                        <p className="text-xs text-slate-600">1 hour ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">Info</Badge>
                    </div>
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
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Car className="mr-2 h-5 w-5" />
                      New VIN Lookup
                    </Button>
                    
                    <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-semibold rounded-xl transition-all duration-300">
                      <BarChart className="mr-2 h-5 w-5" />
                      Generate Report
                    </Button>
                    
                    <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-semibold rounded-xl transition-all duration-300">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      View Analytics
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
                <VinForm />
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