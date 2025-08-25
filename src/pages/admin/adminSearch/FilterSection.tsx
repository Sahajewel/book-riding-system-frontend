/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FilterSection.tsx
import React from 'react';
import type { FilterSection as FilterSectionType } from '@/types/filter';

interface FilterSectionProps {
  section: FilterSectionType;
  value: any;
  onChange: (value: any) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ section, value, onChange }) => {
  const renderInput = () => {
    switch (section.type) {
      case 'select':
        return (
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">All {section.label}</option>
            {section.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'multi-select':
        return (
          <div className="mt-1 space-y-2">
            {section.options?.map(option => (
              <div key={option.value} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`${section.key}-${option.value}`}
                    name={section.key}
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={value.includes(option.value)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...value, option.value]
                        : value.filter((v: string) => v !== option.value);
                      onChange(newValue);
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`${section.key}-${option.value}`} className="font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'date-range':
        return (
          <div className="mt-1 space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={value?.from || ''}
                onChange={(e) => onChange({ ...value, from: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={value?.to || ''}
                onChange={(e) => onChange({ ...value, to: e.target.value })}
              />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Filter by ${section.label}`}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {section.label}
      </label>
      {renderInput()}
    </div>
  );
};

export default FilterSection;