/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FilterChips.tsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { FilterConfig } from '@/types/filter';

interface FilterChipsProps {
  filters: Record<string, any>;
  onRemove: (filterKey: string) => void;
  onClearAll: () => void;
  filterConfig: FilterConfig;
}

const FilterChips: React.FC<FilterChipsProps> = ({ 
  filters, 
  onRemove, 
  onClearAll, 
  filterConfig 
}) => {
  const getFilterLabel = (key: string, value: any): string => {
    const section = filterConfig.filterSections.find(s => s.key === key);
    
    if (!section) return `${key}: ${value}`;
    
    if (section.type === 'multi-select') {
      return `${section.label}: ${value.map((v: string) => {
        const option = section.options?.find(o => o.value === v);
        return option ? option.label : v;
      }).join(', ')}`;
    }
    
    if (section.type === 'select') {
      const option = section.options?.find(o => o.value === value);
      return `${section.label}: ${option ? option.label : value}`;
    }
    
    if (section.type === 'date-range') {
      return `${section.label}: ${value.from} to ${value.to}`;
    }
    
    return `${section.label}: ${value}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-500">Active filters:</span>
      
      {Object.entries(filters).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        
        return (
          <span
            key={key}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {getFilterLabel(key, value)}
            <button
              type="button"
              className="ml-1.5 inline-flex rounded-full flex-shrink-0 p-0.5 hover:bg-blue-200 transition-colors"
              onClick={() => onRemove(key)}
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </span>
        );
      })}
      
      {Object.keys(filters).length > 0 && (
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          onClick={onClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterChips;