'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl">Account Deactivated</CardTitle>
          <CardDescription>
            Your account has been temporarily deactivated by an administrator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="mb-2">
              <strong>What does this mean?</strong>
            </p>
            <p>
              You currently cannot access the platform. This may be due to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Administrative review</li>
              <li>Terms of service violation</li>
              <li>Account security measures</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="mailto:support@apotheosis.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Support
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/signin">
                Back to Sign In
              </Link>
            </Button>
          </div>
          
          <div className="text-center text-xs text-muted-foreground">
            If you believe this is an error, please contact our support team.
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 