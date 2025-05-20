import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apotheosis-be.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/refresh`, {
            refresh_token: refreshToken
          });
          
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          
          // Update the authorization header
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/signin';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const authApi = {
  signup: (data: { email: string; password: string }) => {
    return api.post('/signup', data);
  },
  signin: (data: { email: string; password: string }) => {
    return api.post('/signin', data);
  },
  refresh: (refreshToken: string) => {
    return api.post('/refresh', { refresh_token: refreshToken });
  },
};

export const vinApi = {
  getVinInfo: (vin: string, mileage: number) => {
    return api.get(`/velocity-get?vin=${vin}&mileage=${mileage}`);
  },
  getVinRecords: (page: number = 1, limit: number = 10) => {
    return api.get(`/vin-records?page=${page}&limit=${limit}`);
  },
};

export default api;