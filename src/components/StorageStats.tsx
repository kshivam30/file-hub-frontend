import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fileService } from '../services/fileService';
import type { StorageStats as StorageStatsType } from '../services/fileService';
import { ArrowDownIcon, DocumentDuplicateIcon, ServerIcon } from '@heroicons/react/24/outline';

export const StorageStats: React.FC = () => {
  const { data: stats, isLoading } = useQuery<StorageStatsType>({
    queryKey: ['fileStats'],
    queryFn: fileService.getFileStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  if (isLoading || !stats) {
    return (
      <div className="bg-white shadow rounded-lg p-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Storage Savings Card */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <ArrowDownIcon className="h-6 w-6 text-green-600" />
            <h4 className="ml-2 text-sm font-medium text-green-800">Storage Saved</h4>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-green-900">
              {formatSize(stats.storage_saved)}
            </p>
            <p className="text-sm text-green-600">
              {stats.storage_saved_percentage.toFixed(1)}% reduction in storage
            </p>
          </div>
        </div>

        {/* File Statistics Card */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-6 w-6 text-blue-600" />
            <h4 className="ml-2 text-sm font-medium text-blue-800">File Statistics</h4>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Total Uploads:</span>
              <span className="text-sm font-medium text-blue-900">{stats.total_uploads}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Unique Files:</span>
              <span className="text-sm font-medium text-blue-900">{stats.unique_files}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Duplicates Prevented:</span>
              <span className="text-sm font-medium text-blue-900">
                {stats.total_uploads - stats.unique_files}
              </span>
            </div>
          </div>
        </div>

        {/* Storage Usage Card */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <ServerIcon className="h-6 w-6 text-purple-600" />
            <h4 className="ml-2 text-sm font-medium text-purple-800">Storage Usage</h4>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-purple-600">Total Size:</span>
              <span className="text-sm font-medium text-purple-900">
                {formatSize(stats.total_upload_size)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-purple-600">Actual Storage:</span>
              <span className="text-sm font-medium text-purple-900">
                {formatSize(stats.actual_storage_used)}
              </span>
            </div>
          </div>
          {/* Storage Usage Bar */}
          <div className="mt-3">
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${100 - stats.storage_saved_percentage}%`,
                }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-purple-600 text-right">
              {(100 - stats.storage_saved_percentage).toFixed(1)}% of potential storage used
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 