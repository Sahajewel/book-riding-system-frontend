// src/pages/rider/Profile.tsx
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const RiderProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profile on mount
 

 // Fetch profile
useEffect(() => {
  axios.get("http://localhost:5000/api/v1/riders/profile", { withCredentials: true })
    .then(res => {
      setName(res.data.data.name);
      setPhone(res.data.data.phone);
    })
    .catch(err => toast.error(err.response?.data?.message || "Failed to fetch profile"));
}, []);

// Update profile
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await axios.put(
      "http://localhost:5000/api/v1/riders/profile", // ✅ Fixed endpoint
      { name, phone, password },
      { withCredentials: true }
    );
    toast.success("Profile updated successfully!");
    setPassword("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default RiderProfile;
