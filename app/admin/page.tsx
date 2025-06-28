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
import { Shield, Users, ArrowLeft, Search, UserCheck, UserX, Eye } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/api';

interface User {
  _id: string;
  email: string;
  account_status: 'active' | 'deactivated';
  // created_at: string;
  // last_login?: string;
  vin_records_count?: number;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (user && user.email !== 'admin@admin.com') {
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
      if (user?.email !== 'admin@admin.com') return;
      
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

    if (user?.email === 'admin@admin.com') {
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

  // Don't render if not admin
  if (!user || user.email !== 'admin@admin.com') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-600" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.account_status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deactivated Users</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.account_status === 'deactivated').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts and their access to the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="search">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status-filter">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="deactivated">Deactivated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Users Table */}
            {isLoading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Created</TableHead>
                    <TableHead>Last Login</TableHead> */}
                    <TableHead>VIN Lookups</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.account_status === 'active' ? 'default' : 'destructive'}
                        >
                          {user.account_status}
                        </Badge>
                      </TableCell>
                      {/* <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell> */}
                      {/* <TableCell>
                        {user.last_login 
                          ? new Date(user.last_login).toLocaleDateString()
                          : 'Never'
                        }
                      </TableCell> */}
                      <TableCell>{user.vin_records_count || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.account_status === 'active' ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  disabled={updatingUserId === user._id}
                                >
                                  <UserX className="h-4 w-4 mr-1" />
                                  {updatingUserId === user._id ? 'Updating...' : 'Deactivate'}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Deactivate User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to deactivate {user.email}? 
                                    They will no longer be able to access the platform.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleStatusChange(user._id, 'deactivated')}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={updatingUserId === user._id}
                                  >
                                    {updatingUserId === user._id ? 'Deactivating...' : 'Deactivate'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(user._id, 'active')}
                              disabled={updatingUserId === user._id}
                            >
                              <UserCheck className="h-4 w-4 mr-1" />
                              {updatingUserId === user._id ? 'Updating...' : 'Activate'}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            
            {filteredUsers.length === 0 && !isLoading && (
              <div className="text-center py-8 text-muted-foreground">
                No users found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 