'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { User, ArrowLeft, Settings, Shield, Bell, Globe, CreditCard, Key, Trash2, Save } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { settingsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardNavbar as Navbar } from '@/components/Dashboard/Navbar';

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Account Settings
    username: '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Dealership Information
    dealershipName: '',
    dealershipAddress: '',
    dealershipPhone: '',
    dealershipSlogan: '',
    dealershipMetadata: '',
    

    
    // System Settings
    characterLimit: '500',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const [privacy, setPrivacy] = useState({
    profile: 'public',
    data: 'private'
  });

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const [accountRes, dealershipRes, systemRes] = await Promise.all([
          settingsApi.getAccount(),
          settingsApi.getDealership(),
          settingsApi.getSystem(),
        ]);
        const account = accountRes.data?.data || {};
        const dealership = dealershipRes.data?.data || {};
        const system = systemRes.data?.data || {};
        setFormData(prev => ({
          ...prev,
          username: account.username || '',
          email: account.email || '',
          dealershipName: dealership.dealershipName || '',
          dealershipAddress: dealership.dealershipAddress || '',
          dealershipPhone: dealership.dealershipPhone || '',
          dealershipSlogan: dealership.dealershipSlogan || '',
          dealershipMetadata: dealership.dealershipMetadata || '',
          characterLimit: system.characterLimit ? String(system.characterLimit) : prev.characterLimit,
        }));
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load settings. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const accountData = {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };
      
      const response = await settingsApi.updateAccount(accountData);
      
      toast({
        title: 'Success',
        description: 'Account settings updated successfully!',
      });
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      
    } catch (error: any) {
      console.error('Failed to update account:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update account settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDealershipUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const dealershipData = {
        dealershipName: formData.dealershipName,
        dealershipAddress: formData.dealershipAddress,
        dealershipPhone: formData.dealershipPhone,
        dealershipSlogan: formData.dealershipSlogan,
        dealershipMetadata: formData.dealershipMetadata,
      };
      
      const response = await settingsApi.updateDealership(dealershipData);
      
      toast({
        title: 'Success',
        description: 'Dealership information updated successfully!',
      });
      
    } catch (error: any) {
      console.error('Failed to update dealership:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update dealership information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const systemData = {
        characterLimit: parseInt(formData.characterLimit),
      };
      
      const response = await settingsApi.updateSystem(systemData);
      
      toast({
        title: 'Success',
        description: 'System settings updated successfully!',
      });
      
    } catch (error: any) {
      console.error('Failed to update system settings:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update system settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/dashboard'}
            className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            ← Back to Dashboard
          </Button>
        </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Settings
          </h1>
          <p className="text-xl text-slate-600">
            Manage your account preferences and security settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <a href="#profile" className="flex items-center space-x-3 p-3 rounded-lg bg-slate-100 text-slate-900 font-medium">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </a>
                  <a href="#security" className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                  </a>
                  <a href="#notifications" className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </a>
                  <a href="#privacy" className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Globe className="h-5 w-5" />
                    <span>Privacy</span>
                  </a>
                  <a href="#billing" className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <CreditCard className="h-5 w-5" />
                    <span>Billing</span>
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Settings Form */}
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <User className="h-6 w-6" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Update your account information and password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-slate-700 font-medium">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-slate-700 font-medium">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Update Account Settings
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Dealership Information Form */}
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Settings className="h-6 w-6" />
                  <span>Dealership Information</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Configure your dealership details and branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDealershipUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dealershipName" className="text-slate-700 font-medium">Dealership Name</Label>
                    <Input
                      id="dealershipName"
                      name="dealershipName"
                      value={formData.dealershipName}
                      onChange={handleChange}
                      placeholder="Enter dealership name"
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dealershipAddress" className="text-slate-700 font-medium">Dealership Address</Label>
                    <Textarea
                      id="dealershipAddress"
                      name="dealershipAddress"
                      value={formData.dealershipAddress}
                      onChange={handleChange}
                      placeholder="Enter dealership address"
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dealershipPhone" className="text-slate-700 font-medium">Phone Number</Label>
                      <Input
                        id="dealershipPhone"
                        name="dealershipPhone"
                        value={formData.dealershipPhone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dealershipSlogan" className="text-slate-700 font-medium">Slogan</Label>
                      <Input
                        id="dealershipSlogan"
                        name="dealershipSlogan"
                        value={formData.dealershipSlogan}
                        onChange={handleChange}
                        placeholder="Enter dealership slogan"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dealershipMetadata" className="text-slate-700 font-medium">Additional Information</Label>
                    <Textarea
                      id="dealershipMetadata"
                      name="dealershipMetadata"
                      value={formData.dealershipMetadata}
                      onChange={handleChange}
                      placeholder="Enter any additional dealership information"
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Update Dealership Information
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* System Settings Form */}
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Shield className="h-6 w-6" />
                  <span>System Settings</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Configure system preferences and limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSystemUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="characterLimit" className="text-slate-700 font-medium">Character Limit</Label>
                    <Input
                      id="characterLimit"
                      name="characterLimit"
                      type="number"
                      value={formData.characterLimit}
                      onChange={handleChange}
                      placeholder="Enter character limit"
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
                    />
                    <p className="text-sm text-slate-600">Maximum number of characters allowed in text fields</p>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Update System Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 