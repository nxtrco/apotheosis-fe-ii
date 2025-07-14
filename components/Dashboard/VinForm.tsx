'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { vinApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { VehicleSummaryModal } from '@/components/Dashboard/VehicleSummaryModal';
import { Badge } from '@/components/ui/badge';
import { Car, Search, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface VinData {
  vin: string;
  make: string;
  model: string;
  year: string;
  trim: string;
  engine: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  color: string;
  price: string;
  marketValue: string;
  history: string[];
  features: string[];
}

// Add prop for callback
interface VinFormProps {
  onDecodeSuccess?: () => void;
}

export default function VinForm({ onDecodeSuccess }: VinFormProps) {
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [vinData, setVinData] = useState<VinData | null>(null);
  // Remove showModal, vinData, and VehicleSummaryModal logic

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!vin.trim()) {
      setError('Please enter a VIN');
      setIsLoading(false);
      return;
    }

    if (vin.length !== 17) {
      setError('VIN must be exactly 17 characters');
      setIsLoading(false);
      return;
    }

    if (!mileage.trim()) {
      setError('Please enter a mileage');
      setIsLoading(false);
      return;
    }

    try {
      // Make the actual API call
      await vinApi.getVinInfo(vin, parseInt(mileage));
      
      // Show success toast
      toast({
        title: 'Success',
        description: 'VIN decoded successfully.',
      });
      
      // On success, call the callback
      if (onDecodeSuccess) onDecodeSuccess();
    } catch (err: any) {
      console.error('Failed to decode VIN:', err);
      setError(err.response?.data?.message || 'Failed to fetch VIN data. Please try again.');
      
      toast({
        title: 'Error',
        description: 'Failed to decode VIN. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="vin" className="text-slate-700 font-medium text-lg">
              Vehicle Identification Number (VIN)
            </Label>
            <div className="relative">
              <Input
                id="vin"
                type="text"
                placeholder="Enter 17-character VIN (e.g., 1HGBH41JXMN109186)"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500 text-lg py-4 pl-12 pr-4"
                maxLength={17}
                disabled={isLoading}
                required
              />
              <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="mileage" className="text-slate-700 font-medium text-lg">
              Mileage
            </Label>
            <Input
              id="mileage"
              type="number"
              placeholder="Enter mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500 text-lg py-4 pl-4 pr-4"
              min={0}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Enter the 17-character VIN found on your vehicle's dashboard, door jamb, or registration documents, and the current mileage.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Decoding VIN...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Decode VIN
            </>
          )}
        </Button>
      </form>

      {/* Quick VIN Examples */}
      <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Quick Examples</CardTitle>
          <CardDescription className="text-slate-600">
            Try these sample VINs to see the decoder in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => setVin('1HGBH41JXMN109186')}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-left justify-start"
              disabled={isLoading}
            >
              <div className="text-left">
                <p className="font-medium">Honda Civic</p>
                <p className="text-sm text-slate-600">1HGBH41JXMN109186</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setVin('5YJSA1E47HF000000')}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-left justify-start"
              disabled={isLoading}
            >
              <div className="text-left">
                <p className="font-medium">Tesla Model S</p>
                <p className="text-sm text-slate-600">5YJSA1E47HF000000</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setVin('WBA8A9C50FD123456')}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-left justify-start"
              disabled={isLoading}
            >
              <div className="text-left">
                <p className="font-medium">BMW 3 Series</p>
                <p className="text-sm text-slate-600">WBA8A9C50FD123456</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setVin('1FADP3F22FL123456')}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-left justify-start"
              disabled={isLoading}
            >
              <div className="text-left">
                <p className="font-medium">Ford Focus</p>
                <p className="text-sm text-slate-600">1FADP3F22FL123456</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">What You'll Get</CardTitle>
          <CardDescription className="text-slate-600">
            Comprehensive vehicle information and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Vehicle Specifications</h4>
                  <p className="text-sm text-slate-600">Make, model, year, trim, engine, and more</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Market Analysis</h4>
                  <p className="text-sm text-slate-600">Current market value and pricing trends</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Vehicle History</h4>
                  <p className="text-sm text-slate-600">Accident history, ownership records</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Feature List</h4>
                  <p className="text-sm text-slate-600">Complete list of vehicle features and options</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Detailed Report</h4>
                  <p className="text-sm text-slate-600">Comprehensive PDF report with all data</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Export Options</h4>
                  <p className="text-sm text-slate-600">Export data in multiple formats</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Summary Modal */}
      {/* Remove VehicleSummaryModal usage */}
    </div>
  );
}