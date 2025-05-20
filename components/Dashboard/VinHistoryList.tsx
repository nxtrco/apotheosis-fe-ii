'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { vinApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { VehicleSummaryModal } from './VehicleSummaryModal';

interface VinRecord {
  id: string;
  vin: string;
  mileage: number;
  description: string;
  created_at: string;
}

interface VinHistoryListProps {
  refreshFlag: boolean;
  newestVinId?: string;
}

export function VinHistoryList({ refreshFlag, newestVinId }: VinHistoryListProps) {
  const [records, setRecords] = useState<VinRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<VinRecord | null>(null);
  
  const { toast } = useToast();

  const fetchRecords = async (pageNum: number, search: string = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add search parameter if provided
      let query = `/vin-records?page=${pageNum}&limit=${limit}`;
      if (search) {
        query += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await vinApi.getVinRecords(pageNum, limit);
      
      // Assuming the API returns data and pagination information
      const { records, pagination } = response.data.data;
      
      setRecords(records || []);
      setTotalPages(pagination?.total_pages || 1);
    } catch (error: any) {
      console.error('Failed to fetch VIN records:', error);
      
      setError(
        error.response?.data?.detail || 
        'Failed to load VIN history. Please try again.'
      );
      
      toast({
        title: 'Error',
        description: 'Failed to load VIN history.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(page, searchTerm);
  }, [page, refreshFlag]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    fetchRecords(1, searchTerm);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>VIN History</CardTitle>
          <CardDescription>
            Your recent vehicle history checks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Search by VIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="secondary">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-1/5" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))
            ) : records.length > 0 ? (
              records.map((record, idx) => (
                <div
                  key={record.id}
                  className={`border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer
                    ${record.id === newestVinId && idx === 0 ? 'border-2 border-primary bg-yellow-50' : ''}`}
                  onClick={() => {
                    setSelectedRecord(record);
                    setModalOpen(true);
                  }}
                  title="Click to view full summary"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <h3 className="font-semibold">VIN: {record.vin}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(record.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mileage: {record.mileage.toLocaleString()} miles
                  </p>
                  <p className="text-sm line-clamp-3">{record.description}</p>
                  <span className="text-xs text-primary underline">View Details</span>
                  {record.id === newestVinId && idx === 0 && (
                    <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
                      Newly added
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No VIN records found. Try searching for a vehicle.
              </div>
            )}
          </div>
          
          {!isLoading && records.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Modal for vehicle summary */}
      {selectedRecord && (
        <VehicleSummaryModal
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
            if (!open) setSelectedRecord(null);
          }}
          title={`VIN: ${selectedRecord.vin}`}
          markdown={selectedRecord.description}
        />
      )}
    </>
  );
}