// // src/pages/admin/RideOversight.tsx

// import { useGetAllRidesQuery } from "@/redux/admin/admin.api";
// import type { IRide } from "@/types/ride.interface";


// export default function RideOversight() {
//   const { data: rides, isLoading } = useGetAllRidesQuery(undefined);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Ride Oversight</h1>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Rider</th>
//             <th className="p-2 border">Driver</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Fare</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rides?.data?.map((ride: IRide) => (
//             <tr key={ride._id} className="border">
//               <td className="p-2 border">{ride.rider?.name}</td>
//               <td className="p-2 border">{ride.driver?.name}</td>
//               <td className="p-2 border">{ride.status}</td>
//               <td className="p-2 border">{ride.fare}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
