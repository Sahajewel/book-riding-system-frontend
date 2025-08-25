/* eslint-disable @typescript-eslint/no-explicit-any */
// types/filter.ts
export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSection {
  key: string;
  label: string;
  type: 'select' | 'multi-select' | 'date-range' | 'text';
  options?: FilterOption[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  sortOptions: SortOption[];
  filterSections: FilterSection[];
}

export interface FilterParams {
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filters: Record<string, any>;
}

export interface AdminSearchFilterProps {
  resourceType: string;
  onFilterChange: (filters: FilterParams) => void;
  filterConfig: FilterConfig;
}