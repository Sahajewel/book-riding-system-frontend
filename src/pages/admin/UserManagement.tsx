// src/pages/admin/UserManagement.tsx
import { Button } from "@/components/ui/button";
import { useBlockUserMutation, useDeleteUserMutation, useGetUsersQuery, useUnblockUserMutation } from "@/redux/admin/admin.api";
import type { IUser } from "@/types/user.interface";


export default function UserManagement() {
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <table className="w-full border">
        <thead>
          <tr className="">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>

          {users?.data?.data?.map((user:IUser) => (
            <tr key={user._id} className="border">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">{user.isBlocked ? "Blocked" : "Active"}</td>
              <td className="p-2 border space-x-2">
                {user.isBlocked ? (
                  <Button size="sm" onClick={() => unblockUser(user._id)}>Unblock</Button>
                ) : (
                  <Button size="sm" onClick={() => blockUser(user._id)}>Block</Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => deleteUser(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
