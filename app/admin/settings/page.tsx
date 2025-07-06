'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Shield, 
  Database, 
  Globe, 
  Mail, 
  Lock, 
  Activity, 
  AlertTriangle, 
  Save, 
  RefreshCw,
  Server,
  Key,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DashboardNavbar as Navbar } from '@/components/Dashboard/Navbar';

export default function AdminSettings() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Dealerscript',
    siteDescription: 'Advanced VIN Decoder Platform',
    maintenanceMode: false,
    debugMode: false,
    maxFileSize: '10',
    sessionTimeout: '24',
    apiRateLimit: '1000',
    enableRegistration: true,
    requireEmailVerification: true,
    enableTwoFactor: false,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: '8',
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    maxLoginAttempts: '5',
    lockoutDuration: '30',
    enableIpWhitelist: false,
    ipWhitelist: '',
    enableAuditLog: true,
    dataRetentionDays: '90',
  });

  // API Settings
  const [apiSettings, setApiSettings] = useState({
    enableApiAccess: true,
    apiVersion: 'v1',
    corsOrigins: '*',
    enableRateLimiting: true,
    rateLimitWindow: '15',
    rateLimitMax: '1000',
    enableApiKeys: true,
    keyExpirationDays: '365',
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@dealerscript.com',
    fromName: 'Dealerscript',
    enableSsl: true,
    enableTls: true,
  });

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

  const handleSystemUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Success',
        description: 'System settings updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update system settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecurityUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Success',
        description: 'Security settings updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update security settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Success',
        description: 'API settings updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update API settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Success',
        description: 'Email settings updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update email settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if not admin
  if (!user || user.email !== 'admin@admin.com') {
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin')}
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              ← Back to Admin
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Admin Settings
            </h1>
          </div>
          <p className="text-xl text-slate-600">
            Configure system settings, security policies, and platform preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === 'general' 
                        ? 'bg-slate-100 text-slate-900 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span>General</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === 'security' 
                        ? 'bg-slate-100 text-slate-900 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('api')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === 'api' 
                        ? 'bg-slate-100 text-slate-900 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Key className="h-5 w-5" />
                    <span>API</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('email')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === 'email' 
                        ? 'bg-slate-100 text-slate-900 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                    <Settings className="h-6 w-6" />
                    <span>General Settings</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Configure basic platform settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName" className="text-slate-700 font-medium">Site Name</Label>
                      <Input
                        id="siteName"
                        value={systemSettings.siteName}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription" className="text-slate-700 font-medium">Site Description</Label>
                      <Input
                        id="siteDescription"
                        value={systemSettings.siteDescription}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxFileSize" className="text-slate-700 font-medium">Max File Size (MB)</Label>
                      <Input
                        id="maxFileSize"
                        type="number"
                        value={systemSettings.maxFileSize}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, maxFileSize: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout" className="text-slate-700 font-medium">Session Timeout (hours)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiRateLimit" className="text-slate-700 font-medium">API Rate Limit</Label>
                      <Input
                        id="apiRateLimit"
                        type="number"
                        value={systemSettings.apiRateLimit}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, apiRateLimit: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Maintenance Mode</p>
                        <p className="text-sm text-slate-600">Temporarily disable the platform for maintenance</p>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Debug Mode</p>
                        <p className="text-sm text-slate-600">Enable detailed error logging and debugging</p>
                      </div>
                      <Switch
                        checked={systemSettings.debugMode}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, debugMode: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable Registration</p>
                        <p className="text-sm text-slate-600">Allow new users to register accounts</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableRegistration}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, enableRegistration: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Require Email Verification</p>
                        <p className="text-sm text-slate-600">Users must verify their email before accessing the platform</p>
                      </div>
                      <Switch
                        checked={systemSettings.requireEmailVerification}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-slate-600">Require 2FA for all user accounts</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableTwoFactor}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, enableTwoFactor: checked }))}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSystemUpdate}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    Save General Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                    <Shield className="h-6 w-6" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Configure security policies and authentication requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength" className="text-slate-700 font-medium">Minimum Password Length</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts" className="text-slate-700 font-medium">Max Login Attempts</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lockoutDuration" className="text-slate-700 font-medium">Lockout Duration (minutes)</Label>
                      <Input
                        id="lockoutDuration"
                        type="number"
                        value={securitySettings.lockoutDuration}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, lockoutDuration: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ipWhitelist" className="text-slate-700 font-medium">IP Whitelist</Label>
                    <Textarea
                      id="ipWhitelist"
                      placeholder="Enter IP addresses (one per line)"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      rows={4}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Require Special Characters</p>
                        <p className="text-sm text-slate-600">Passwords must contain special characters</p>
                      </div>
                      <Switch
                        checked={securitySettings.requireSpecialChars}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireSpecialChars: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Require Numbers</p>
                        <p className="text-sm text-slate-600">Passwords must contain numbers</p>
                      </div>
                      <Switch
                        checked={securitySettings.requireNumbers}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireNumbers: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Require Uppercase</p>
                        <p className="text-sm text-slate-600">Passwords must contain uppercase letters</p>
                      </div>
                      <Switch
                        checked={securitySettings.requireUppercase}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireUppercase: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable IP Whitelist</p>
                        <p className="text-sm text-slate-600">Restrict access to specific IP addresses</p>
                      </div>
                      <Switch
                        checked={securitySettings.enableIpWhitelist}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, enableIpWhitelist: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable Audit Log</p>
                        <p className="text-sm text-slate-600">Log all security-related activities</p>
                      </div>
                      <Switch
                        checked={securitySettings.enableAuditLog}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, enableAuditLog: checked }))}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSecurityUpdate}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    Save Security Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* API Settings */}
            {activeTab === 'api' && (
              <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                    <Key className="h-6 w-6" />
                    <span>API Settings</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Configure API access, rate limiting, and authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="apiVersion" className="text-slate-700 font-medium">API Version</Label>
                      <Select value={apiSettings.apiVersion} onValueChange={(value) => setApiSettings(prev => ({ ...prev, apiVersion: value }))}>
                        <SelectTrigger className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">v1</SelectItem>
                          <SelectItem value="v2">v2</SelectItem>
                          <SelectItem value="beta">Beta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="corsOrigins" className="text-slate-700 font-medium">CORS Origins</Label>
                      <Input
                        id="corsOrigins"
                        value={apiSettings.corsOrigins}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, corsOrigins: e.target.value }))}
                        placeholder="* or specific domains"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rateLimitWindow" className="text-slate-700 font-medium">Rate Limit Window (minutes)</Label>
                      <Input
                        id="rateLimitWindow"
                        type="number"
                        value={apiSettings.rateLimitWindow}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimitWindow: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rateLimitMax" className="text-slate-700 font-medium">Rate Limit Max Requests</Label>
                      <Input
                        id="rateLimitMax"
                        type="number"
                        value={apiSettings.rateLimitMax}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimitMax: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keyExpirationDays" className="text-slate-700 font-medium">API Key Expiration (days)</Label>
                      <Input
                        id="keyExpirationDays"
                        type="number"
                        value={apiSettings.keyExpirationDays}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, keyExpirationDays: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable API Access</p>
                        <p className="text-sm text-slate-600">Allow external applications to access the API</p>
                      </div>
                      <Switch
                        checked={apiSettings.enableApiAccess}
                        onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableApiAccess: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable Rate Limiting</p>
                        <p className="text-sm text-slate-600">Limit API requests per time window</p>
                      </div>
                      <Switch
                        checked={apiSettings.enableRateLimiting}
                        onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableRateLimiting: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable API Keys</p>
                        <p className="text-sm text-slate-600">Require API keys for authentication</p>
                      </div>
                      <Switch
                        checked={apiSettings.enableApiKeys}
                        onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableApiKeys: checked }))}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleApiUpdate}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    Save API Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                    <Mail className="h-6 w-6" />
                    <span>Email Settings</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Configure SMTP settings for email notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost" className="text-slate-700 font-medium">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort" className="text-slate-700 font-medium">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername" className="text-slate-700 font-medium">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={emailSettings.smtpUsername}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword" className="text-slate-700 font-medium">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail" className="text-slate-700 font-medium">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromName" className="text-slate-700 font-medium">From Name</Label>
                      <Input
                        id="fromName"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable SSL</p>
                        <p className="text-sm text-slate-600">Use SSL encryption for SMTP connection</p>
                      </div>
                      <Switch
                        checked={emailSettings.enableSsl}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enableSsl: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Enable TLS</p>
                        <p className="text-sm text-slate-600">Use TLS encryption for SMTP connection</p>
                      </div>
                      <Switch
                        checked={emailSettings.enableTls}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enableTls: checked }))}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleEmailUpdate}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    Save Email Settings
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 