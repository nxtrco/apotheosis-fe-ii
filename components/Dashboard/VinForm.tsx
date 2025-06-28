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

interface VinFormProps {
  onSuccess?: (summary: string) => void;
}

export function VinForm({ onSuccess }: VinFormProps) {
  const [formData, setFormData] = useState({
    vin: '',
    mileage: '',
  });
  const [errors, setErrors] = useState<{
    vin?: string;
    mileage?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For VIN, convert to uppercase and limit to 17 chars
    if (name === 'vin') {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase().slice(0, 17) }));
    } 
    // For mileage, only allow numbers
    else if (name === 'mileage') {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // VIN validation
    if (!formData.vin) {
      newErrors.vin = 'VIN is required';
    } else if (formData.vin.length !== 17) {
      newErrors.vin = 'VIN must be exactly 17 characters';
    }
    
    // Mileage validation
    if (!formData.mileage) {
      newErrors.mileage = 'Mileage is required';
    } else if (parseInt(formData.mileage) < 0) {
      newErrors.mileage = 'Mileage cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSummary(null);
    
    try {
      const response = await vinApi.getVinInfo(
        formData.vin, 
        parseInt(formData.mileage)
      );
      const data = response.data.data;
      
      if (data && (data.gpt_description || data.summary)) {
        // After successful lookup, fetch the latest VIN records to get the new record's ID
        const recordsResponse = await vinApi.getVinRecords(1, 1);
        const newVinId = recordsResponse.data.data.records[0]?._id;
        if (onSuccess && newVinId) onSuccess(newVinId);

        // CLEAR THE ERROR HERE
        setErrors({});

        toast({
          title: 'Success',
          description: 'Vehicle information retrieved and added to history!',
        });
      } else {
        throw new Error('No summary found in response');
      }
    } catch (error: any) {
      console.error('VIN lookup error:', error);
      
      setErrors({ 
        general: error.response?.data?.detail || 
                'An error occurred while retrieving vehicle information.' 
      });
      
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 
                    'Failed to retrieve vehicle information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiSuccess = (markdown: string) => {
    setSummary(markdown);
    setModalOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vehicle Lookup</CardTitle>
        <CardDescription>
          Enter a VIN number and current mileage to get a unique detailed vehicle listing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {errors.general}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="vin">VIN</Label>
            <Input
              id="vin"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              placeholder="e.g. 1HGCM82633A123456"
              className={errors.vin ? "border-destructive" : ""}
              maxLength={17}
            />
            {errors.vin && (
              <p className="text-destructive text-xs mt-1">{errors.vin}</p>
            )}
            {/* <p className="text-xs text-muted-foreground">
              The Vehicle Identification Number is a 17-character code unique to each vehicle.
            </p> */}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mileage">Current Mileage</Label>
            <Input
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="e.g. 75000"
              className={errors.mileage ? "border-destructive" : ""}
            />
            {errors.mileage && (
              <p className="text-destructive text-xs mt-1">{errors.mileage}</p>
            )}
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              'Looking up information...'
            ) : (
              <span className="flex items-center gap-2">
                Get description now <Sparkles className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
        
        {summary && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Vehicle Summary</h3>
            <p className="text-sm">{summary}</p>
          </div>
        )}
      </CardContent>
      <VehicleSummaryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={`VIN: ${selectedRecord?.vin}`}
        markdown={selectedRecord?.description || ''}
      />
    </Card>
  );
}