// src/pages/driver/DriverProfile.tsx
import { useState, useEffect } from "react";
import { 
  useGetDriverProfileQuery, 
  useUpdateDriverProfileMutation 
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

const DriverProfile = () => {
  const { data: driverProfile, isLoading } = useGetDriverProfileQuery();
  const [updateDriverProfile, { isLoading: updating }] = useUpdateDriverProfileMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    vehicleNumber: '',
    vehicleType: '',
    licenseNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when profile data loads
  useEffect(() => {
    if (driverProfile) {
      setFormData({
        name: driverProfile.name || '',
        email: driverProfile.email || '',
        password: '',
        confirmPassword: '',
        vehicleNumber: driverProfile.driverInfo?.vehicleNumber || '',
        vehicleType: driverProfile.driverInfo?.vehicleType || '',
        licenseNumber: driverProfile.driverInfo?.licenseNumber || '',
      });
    }
  }, [driverProfile]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle number is required';
    }

    if (!formData.vehicleType.trim()) {
      newErrors.vehicleType = 'Vehicle type is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatePayload: any = {
        name: formData.name,
        email: formData.email,
        driverInfo: {
          vehicleNumber: formData.vehicleNumber,
          vehicleType: formData.vehicleType,
          licenseNumber: formData.licenseNumber,
          isAvailable: driverProfile?.driverInfo?.isAvailable || false,
          isApproved: driverProfile?.driverInfo?.isApproved || false,
        }
      };

      // Only include password if it's provided
      if (formData.password) {
        updatePayload.password = formData.password;
      }

      await updateDriverProfile({
        id: driverProfile?._id?.toString() || '',
        data: updatePayload
      }).unwrap();

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (driverProfile) {
      setFormData({
        name: driverProfile.name || '',
        email: driverProfile.email || '',
        password: '',
        confirmPassword: '',
        vehicleNumber: driverProfile.driverInfo?.vehicleNumber || '',
        vehicleType: driverProfile.driverInfo?.vehicleType || '',
        licenseNumber: driverProfile.driverInfo?.licenseNumber || '',
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Driver Profile
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your personal information and vehicle details
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Driver Status */}
          <div className=" rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Approval Status</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    driverProfile?.driverStatus === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : driverProfile?.driverStatus === 'suspended'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {driverProfile?.driverStatus || 'Pending'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Availability</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    driverProfile?.driverInfo?.isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {driverProfile?.driverInfo?.isAvailable ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Total Earnings</span>
                <div className="mt-1 text-lg font-semibold text-green-600">
                  ${driverProfile?.totalEarnings || '0.00'}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing 
                      ? ' cursor-not-allowed' 
                      : errors.name 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : errors.email 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Password Change */}
          {isEditing && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to keep current password"
                    className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number *
                </label>
                <input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g., ABC-1234"
                  className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : errors.vehicleNumber 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.vehicleNumber && <p className="mt-1 text-sm text-red-600">{errors.vehicleNumber}</p>}
              </div>

              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type *
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : errors.vehicleType 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select vehicle type</option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                </select>
                {errors.vehicleType && <p className="mt-1 text-sm text-red-600">{errors.vehicleType}</p>}
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  License Number *
                </label>
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g., DL-123456789"
                  className={`text-black block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : errors.licenseNumber 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DriverProfile;