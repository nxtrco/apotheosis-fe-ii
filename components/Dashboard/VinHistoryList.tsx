'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { vinApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Search, Car, Filter, Calendar, Clock, Eye, Download, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { VehicleSummaryModal } from './VehicleSummaryModal';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VinRecord {
  _id: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  description: string;
  created_at: string;
  status: 'completed' | 'pending' | 'failed';
}

interface VinHistoryListProps {
  refreshFlag: boolean;
  newestVinId?: string | null;
}

export function VinHistoryList({ refreshFlag, newestVinId }: VinHistoryListProps) {
  const [records, setRecords] = useState<VinRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    return matchesSearch && matchesStatus
  });

  const handleViewRecord = (record: VinRecord) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleDeleteRecord = (recordId: string) => {
    setRecords(records.filter(r => r._id !== recordId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700">Unknown</Badge>
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading VIN history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Search & Filter</CardTitle>
          <CardDescription className="text-slate-600">
            Find specific VIN records in your history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-slate-700 font-medium">Search</Label>
              <div className="relative">
                <Input
                  id="search"
                  placeholder="Search by VIN, make, or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          VIN Records ({filteredRecords.length})
        </h3>
        <Button 
          variant="outline" 
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <Download className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg">
            <CardContent className="py-12 text-center">
              <Car className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No records found</h3>
              <p className="text-slate-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start by looking up a VIN to see your history here.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRecords.map((record) => (
            <Card key={record._id} className="bg-white/70 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">
                          {record.year} {record.make} {record.model}
                        </h4>
                        <p className="text-sm text-slate-600 font-mono">{record.vin}</p>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span>Mileage: {record.mileage}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(record.created_at)}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 line-clamp-2">{record.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewRecord(record)}
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteRecord(record._id)}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Vehicle Summary Modal */}
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
    </div>
  );
}