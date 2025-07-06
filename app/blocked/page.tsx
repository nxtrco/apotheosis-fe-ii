'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Blocked() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-3xl font-bold text-slate-900">Dealerscript</span>
          </Link>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Access Denied
            </CardTitle>
            <CardDescription className="text-slate-600 text-lg">
              Your account has been temporarily suspended due to policy violations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Reason for Suspension:</h3>
              <p className="text-red-700 text-sm">
                Multiple failed login attempts detected. Your account has been locked for security purposes.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">What you can do:</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Contact support to unlock your account</li>
                <li>• Reset your password if forgotten</li>
                <li>• Review our security policies</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Shield className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
              
              <Link href="/signin">
                <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-semibold rounded-xl transition-all duration-300">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Sign In
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 