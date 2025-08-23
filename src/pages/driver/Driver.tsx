// src/pages/driver/DriverDashboard.tsx
import { Link, Outlet } from "react-router";

const DriverDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Driver Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="availability" className="hover:text-yellow-400">Availability</Link>
          <Link to="rides" className="hover:text-yellow-400">Ride Requests</Link>
          <Link to="history" className="hover:text-yellow-400">Ride History</Link>
          <Link to="earnings" className="hover:text-yellow-400">Earnings</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DriverDashboard;
