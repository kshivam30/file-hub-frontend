import React, { useState, useEffect, useCallback } from 'react';
import { FileFilters } from '../types/file';
import debounce from 'lodash/debounce';

interface FileFiltersProps {
  filters: FileFilters;
  onFilterChange: (filters: FileFilters) => void;
  availableFileTypes: string[];
}

export const FileFilterPanel: React.FC<FileFiltersProps> = ({
  filters,
  onFilterChange,
  availableFileTypes,
}) => {
  // Local state to track input values
  const [localFilters, setLocalFilters] = useState(filters);

  // Update local filters when prop filters change, but only if values actually differ
  useEffect(() => {
    if (
      filters.search !== localFilters.search ||
      filters.fileType !== localFilters.fileType ||
      filters.sizeRange.min !== localFilters.sizeRange.min ||
      filters.sizeRange.max !== localFilters.sizeRange.max ||
      filters.dateRange.start !== localFilters.dateRange.start ||
      filters.dateRange.end !== localFilters.dateRange.end
    ) {
      setLocalFilters(filters);
    }
  }, [filters]);

  // Debounced filter change handler
  const debouncedFilterChange = useCallback(
    debounce((newFilters: FileFilters) => {
      onFilterChange(newFilters);
    }, 500), // 500ms delay
    [onFilterChange]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [debouncedFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...localFilters,
      search: e.target.value,
    };
    setLocalFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...localFilters,
      fileType: e.target.value,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters); // No debounce needed for select
  };

  const handleSizeRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? (field === 'min' ? 0 : Infinity) : parseInt(value, 10);
    const newFilters = {
      ...localFilters,
      sizeRange: {
        ...localFilters.sizeRange,
        [field]: numValue,
      },
    };
    setLocalFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newFilters = {
      ...localFilters,
      dateRange: {
        ...localFilters.dateRange,
        [field]: value,
      },
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters); // No debounce needed for date inputs
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by filename */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search by filename
          </label>
          <input
            type="text"
            id="search"
            value={localFilters.search}
            onChange={handleSearchChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Search files..."
          />
        </div>

        {/* File type filter */}
        <div>
          <label htmlFor="fileType" className="block text-sm font-medium text-gray-700">
            File type
          </label>
          <select
            id="fileType"
            value={localFilters.fileType}
            onChange={handleFileTypeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">All types</option>
            {availableFileTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Size range filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Size range (KB)</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="number"
              value={localFilters.sizeRange.min === 0 ? '' : localFilters.sizeRange.min}
              onChange={(e) => handleSizeRangeChange('min', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Min"
              min="0"
            />
            <input
              type="number"
              value={localFilters.sizeRange.max === Infinity ? '' : localFilters.sizeRange.max}
              onChange={(e) => handleSizeRangeChange('max', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Max"
              min="0"
            />
          </div>
        </div>

        {/* Date range filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload date range</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="date"
              value={localFilters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            <input
              type="date"
              value={localFilters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 