// src/config/filterConfigs.ts
import type { FilterConfig } from '@/types/filter';

export const usersFilterConfig: FilterConfig = {
  sortOptions: [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'lastLogin', label: 'Last Login' }
  ],
  filterSections: [
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'RIDER', label: 'Rider' },
        { value: 'DRIVER', label: 'Driver' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'multi-select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'blocked', label: 'Blocked' }
      ]
    },
    {
      key: 'createdAt',
      label: 'Registration Date',
      type: 'date-range'
    },
    {
      key: 'emailVerified',
      label: 'Email Verification',
      type: 'select',
      options: [
        { value: 'true', label: 'Verified' },
        { value: 'false', label: 'Not Verified' }
      ]
    }
  ]
};