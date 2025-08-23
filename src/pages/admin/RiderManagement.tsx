// src/pages/admin/RiderManagement.tsx

import { useGetRidersQuery } from "@/redux/admin/admin.api";
import type { IRider } from "@/types/rider.interface";


export default function RiderManagement() {
  const { data: riders, isLoading } = useGetRidersQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rider Management</h1>
      <table className="w-full border">
        <thead>
          <tr className="">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {riders?.data?.map((rider: IRider) => (
            <tr key={rider._id} className="border">
              <td className="p-2 border">{rider.name}</td>
              <td className="p-2 border">{rider.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
