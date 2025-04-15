import axios from 'axios';
import { File as FileType, FileFilters } from '../types/file';

export interface StorageStats {
  total_uploads: number;
  unique_files: number;
  total_upload_size: number;
  actual_storage_used: number;
  storage_saved: number;
  storage_saved_percentage: number;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const fileService = {
  async uploadFile(file: File): Promise<FileType> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/files/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getFiles(filters?: FileFilters): Promise<FileType[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.fileType) {
        params.append('fileType', filters.fileType);
      }
      if (filters.sizeRange.min > 0) {
        params.append('minSize', filters.sizeRange.min.toString());
      }
      if (filters.sizeRange.max < Infinity) {
        params.append('maxSize', filters.sizeRange.max.toString());
      }
      if (filters.dateRange.start) {
        params.append('startDate', filters.dateRange.start);
      }
      if (filters.dateRange.end) {
        params.append('endDate', filters.dateRange.end);
      }
    }

    const response = await axios.get(`${API_URL}/files/`, { params });
    return response.data;
  },

  async deleteFile(id: string): Promise<void> {
    await axios.delete(`${API_URL}/files/${id}/`);
  },

  async downloadFile(fileUrl: string, filename: string): Promise<void> {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob',
      });
      
      // Create a blob URL and trigger download
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw new Error('Failed to download file');
    }
  },

  async getFileStats(): Promise<StorageStats> {
    const response = await axios.get(`${API_URL}/files/stats/`);
    return response.data;
  },
}; 