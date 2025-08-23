// src/pages/admin/DriverManagement.tsx
import { Button } from "@/components/ui/button";
import { useApproveDriverMutation, useGetDriversQuery, useSuspendDriverMutation } from "@/redux/admin/admin.api";
import type { IDriver } from "@/types/driver.interface";


export default function DriverManagement() {
  const { data: drivers, isLoading } = useGetDriversQuery(undefined);
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Driver Management</h1>
      <table className="w-full border">
        <thead>
          <tr className="">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">License</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>

      {drivers?.data?.map((driver: IDriver) => (
  <tr key={driver._id} className="border">
    <td className="p-2 border">{driver.name}</td>
    <td className="p-2 border">{driver.driverInfo.licenseNumber}</td>
    <td className="p-2 border">
      {driver.driverStatus === "suspended" ? "Suspended" : "Active"}
    </td>
    <td className="p-2 border space-x-2">
      <Button size="sm" onClick={() => approveDriver(driver._id)}>Approve</Button>
      <Button size="sm" variant="destructive" onClick={() => suspendDriver(driver._id)}>Suspend</Button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}
