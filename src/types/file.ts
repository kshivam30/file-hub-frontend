export interface FileDetails {
  uuid: string;
  original_filename: string;
  sha256_hash: string;
  file_size: number;
  mime_type: string;
  upload_count: number;
  created_at: string;
  last_accessed: string;
}

export interface File {
  uuid: string;
  original_filename: string;
  sha256_hash: string;
  file_size: number;
  mime_type: string;
  upload_count: number;
  created_at: string;
  last_accessed: string;
  file: string;
}

export interface FileFilters {
  search: string;
  fileType: string;
  sizeRange: {
    min: number;
    max: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

export const DEFAULT_FILTERS: FileFilters = {
  search: '',
  fileType: '',
  sizeRange: {
    min: 0,
    max: Infinity
  },
  dateRange: {
    start: '',
    end: ''
  }
}; 