'use client';

import { useState, useEffect } from 'react';
import { vinApi } from '@/lib/api';

interface VinRecord {
  id: string;
  vin: string;
  mileage: number;
  summary: string;
  date: string;
}

interface PaginatedResponse {
  data: VinRecord[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export function useVinHistory(initialPage = 1, initialLimit = 10) {
  const [records, setRecords] = useState<VinRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    pages: 1
  });
  
  const fetchRecords = async (page = pagination.page, limit = pagination.limit, search?: string) => {
    setLoading(true);
    
    try {
      // Add this when backend implements search
      // const query = search 
      //   ? `/vin-records?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}` 
      //   : `/vin-records?page=${page}&limit=${limit}`;
      
      const response = await vinApi.getVinRecords(page, limit);
      const result = response.data as PaginatedResponse;
      
      setRecords(result.data || []);
      setPagination({
        page: result.page || page,
        limit: result.limit || limit,
        total: result.total || 0,
        pages: result.pages || 1
      });
      setError(null);
    } catch (error: any) {
      console.error('Failed to fetch VIN records:', error);
      setError(error.response?.data?.detail || 'Failed to load VIN history.');
    } finally {
      setLoading(false);
    }
  };
  
  // Initial fetch
  useEffect(() => {
    fetchRecords(initialPage, initialLimit);
  }, [initialPage, initialLimit]);
  
  const nextPage = () => {
    if (pagination.page < pagination.pages) {
      const nextPage = pagination.page + 1;
      fetchRecords(nextPage);
    }
  };
  
  const prevPage = () => {
    if (pagination.page > 1) {
      const prevPage = pagination.page - 1;
      fetchRecords(prevPage);
    }
  };
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.pages) {
      fetchRecords(page);
    }
  };
  
  const search = (term: string) => {
    fetchRecords(1, pagination.limit, term);
  };
  
  return {
    records,
    loading,
    error,
    pagination,
    nextPage,
    prevPage,
    goToPage,
    search,
    refresh: fetchRecords
  };
}