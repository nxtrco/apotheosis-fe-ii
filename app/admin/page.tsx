'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield, Users, ArrowLeft, Search, UserCheck, UserX, Eye, Activity, TrendingUp, CheckCircle, Clock, AlertTriangle, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/api';
import { DashboardNavbar as Navbar } from '@/components/Dashboard/Navbar';

interface User {
  _id: string;
  email: string;
  account_status: 'active' | 'deactivated';
  // created_at: string;
  // last_login?: string;
  vin_records_count?: number;
}

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive',
      });
    }
  }, [user, router, toast]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role !== 'admin') return;
      
      setIsLoading(true);
      try {
        const response = await adminApi.getUsers();
        setUsers(response.data.data || response.data);
      } catch (error: any) {
        console.error('Failed to fetch users:', error);
        toast({
          title: 'Error',
          description: error.response?.data?.detail || 'Failed to load users',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user, toast]);

  const handleStatusChange = async (userId: string, newStatus: 'active' | 'deactivated') => {
    setUpdatingUserId(userId);
    try {
      // Call the API to update user status
      await adminApi.updateUserStatus(userId, newStatus);
      
      // Update local state on success
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === userId ? { ...u, account_status: newStatus } : u
        )
      );

      toast({
        title: 'Status Updated',
        description: `User status changed to ${newStatus}`,
      });
    } catch (error: any) {
      console.error('Failed to update user status:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update user status',
        variant: 'destructive',
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.account_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Debug: Log user object to see its structure
  console.log('Admin page - User object:', user);
  console.log('Admin page - User email:', user?.email);
  console.log('Admin page - User role:', user?.role);
  console.log('Admin page - Is admin check:', user?.role === 'admin');

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    console.log('Admin page - Access denied, redirecting...');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar notificationCount={0} />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Debug Header */}
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Debug:</strong> User: {JSON.stringify(user)}, Email: {user?.email}, Is Admin: {user?.role === 'admin' ? 'YES' : 'NO'}
          </p>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Manage your platform, users, and system settings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{users.filter(u => u.account_status === 'active').length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">API Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{users.reduce((total, user) => total + (user.vin_records_count || 0), 0)}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">System Health</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">99.9%</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">System Status</CardTitle>
              <CardDescription className="text-slate-600">
                Real-time monitoring of platform services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-slate-900">API Gateway</p>
                      <p className="text-sm text-slate-600">All endpoints operational</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-slate-900">Database</p>
                      <p className="text-sm text-slate-600">Connection stable</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-slate-900">Cache Service</p>
                      <p className="text-sm text-slate-600">High latency detected</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">Warning</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-slate-900">Email Service</p>
                      <p className="text-sm text-slate-600">Service unavailable</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700">Critical</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  Manage Users
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
                  onClick={() => router.push('/admin/settings')}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  System Settings
                </Button>
                
                <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-semibold rounded-xl transition-all duration-300">
                  <Activity className="mr-2 h-5 w-5" />
                  View Logs
                </Button>
                
                <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-semibold rounded-xl transition-all duration-300">
                  <Shield className="mr-2 h-5 w-5" />
                  Security Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <div className="mt-8">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">User Management</CardTitle>
              <CardDescription className="text-slate-600">
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Debug Info */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Debug Info:</strong> Users loaded: {users.length}, Loading: {isLoading.toString()}, 
                    Filtered: {filteredUsers.length}, Search: "{searchTerm}", Status: {statusFilter}
                  </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search" className="text-slate-700 font-medium">Search Users</Label>
                    <Input
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by email..."
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                    />
                  </div>
                  <div className="sm:w-48">
                    <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                    <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'deactivated') => setStatusFilter(value)}>
                      <SelectTrigger className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900">
                        <SelectValue placeholder="All users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All users</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="deactivated">Deactivated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-slate-900">User</TableHead>
                        <TableHead className="text-slate-900">Email</TableHead>
                        <TableHead className="text-slate-900">Status</TableHead>
                        <TableHead className="text-slate-900">VIN Records</TableHead>
                        <TableHead className="text-slate-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-slate-400">Loading users...</TableCell>
                        </TableRow>
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user._id} className="hover:bg-slate-50 transition-colors">
                            <TableCell className="font-medium text-slate-900">{user.email}</TableCell>
                            <TableCell className="text-slate-700">{user.email}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={user.account_status === 'active' ? 'default' : 'destructive'}
                                className={user.account_status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}
                              >
                                {user.account_status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-700">{user.vin_records_count || 0}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                  disabled={updatingUserId === user._id}
                                  onClick={() => handleStatusChange(user._id, user.account_status === 'active' ? 'deactivated' : 'active')}
                                >
                                  {user.account_status === 'active' ? (
                                    <UserX className="h-4 w-4 mr-1" />
                                  ) : (
                                    <UserCheck className="h-4 w-4 mr-1" />
                                  )}
                                  {user.account_status === 'active' ? 'Deactivate' : 'Activate'}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-slate-400">No users found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 