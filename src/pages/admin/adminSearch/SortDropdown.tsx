// components/SortDropdown.tsx
import React, { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import type { SortOption } from '@/types/filter';

interface SortDropdownProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: string, order: 'asc' | 'desc') => void;
  sortOptions: SortOption[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  sortOptions 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedOption = sortOptions.find(option => option.value === sortBy);

  const handleSortChange = (value: string) => {
    onSortChange(value, sortOrder);
    setIsOpen(false);
  };

  const toggleSortOrder = () => {
    onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <button
          type="button"
          className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : 'Sort by'}
          <ChevronUpDownIcon className="ml-2 h-4 w-4" />
        </button>
        
        <button
          type="button"
          className="ml-2 p-2 rounded-md border border-gray-300 bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleSortOrder}
          title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        >
          {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {sortOptions.map(option => (
              <button
                key={option.value}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  sortBy === option.value
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;