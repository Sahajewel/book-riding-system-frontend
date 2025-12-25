/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router";

import type { FilterConfig, FilterParams } from "@/types/filter";
import SortDropdown from "./SortDropdown";

// Add this debounce utility function
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface AdminSearchFilterProps {
  resourceType: string;
  onFilterChange: (filters: FilterParams) => void;
  filterConfig: FilterConfig;
}

const AdminSearchFilter: React.FC<AdminSearchFilterProps> = ({
  resourceType,
  onFilterChange,
  filterConfig,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Use debounced values to prevent too many updates
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedFilters = useDebounce(filters, 300);

  // Initialize filters from URL params on component mount
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    if (params.search) {
      setSearchQuery(params.search);
    }

    if (params.sortBy) {
      setSortBy(params.sortBy);
    }
    if (params.sortOrder) {
      setSortOrder(params.sortOrder as "asc" | "desc");
    }

    const filterKeys = Object.keys(params).filter(
      (key) => key !== "search" && key !== "sortBy" && key !== "sortOrder"
    );

    const initialFilters: Record<string, any> = {};
    filterKeys.forEach((key) => {
      if (params[key].includes(",")) {
        initialFilters[key] = params[key].split(",");
      } else {
        initialFilters[key] = params[key];
      }
    });

    setFilters(initialFilters);
  }, [searchParams]);

  // Create a stable callback for filter changes
  const stableOnFilterChange = useCallback(onFilterChange, []);

  // Update URL and notify parent component when filters change - with debounce
  useEffect(() => {
    // Only update URL if we're on an admin page
    if (!location.pathname.startsWith("/admin")) return;

    const params = new URLSearchParams();

    if (debouncedSearchQuery) {
      params.set("search", debouncedSearchQuery);
    }

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);

    const filterParams: FilterParams = {
      search: debouncedSearchQuery,
      sortBy,
      sortOrder,
      filters: debouncedFilters,
    };

    stableOnFilterChange(filterParams);
  }, [
    debouncedSearchQuery,
    sortBy,
    sortOrder,
    debouncedFilters,
    setSearchParams,
    stableOnFilterChange,
    location.pathname,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterKey: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const removeFilter = (filterKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchQuery("");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* Search and Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex-1">{/* SearchInput component */}</div>

        <div className="flex items-center gap-2">
          <SortDropdown
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={(field: string, order: "asc" | "desc") => {
              setSortBy(field);
              setSortOrder(order);
            }}
            sortOptions={filterConfig.sortOptions} // Use safe config
          />

          {/* Filter toggle button */}
        </div>
      </div>

      {/* Active Filter Chips */}
      {Object.keys(filters).length > 0 && (
        <FilterChips
          filters={filters}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
          filterConfig={safeFilterConfig} // Use safe config
        />
      )}

      {/* Expandable Filter Sections */}
      {showFilters && (
        <div className="mt-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeFilterConfig.filterSections.map(
              (
                section // Use safe config
              ) => (
                <FilterSection
                  key={section.key}
                  section={section}
                  value={
                    filters[section.key] ||
                    (section.type === "multi-select" ? [] : "")
                  }
                  onChange={(value) => handleFilterChange(section.key, value)}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSearchFilter;
