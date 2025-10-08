import { UsersTable } from "./(c)/users-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learvia Admin - Users",
  description: "Manage users on the Learvia platform.",
};

export default function UsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between p-5 gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="mt-1 text-muted-foreground">
            View, create, and manage user accounts and roles.
          </p>
        </div>
      </div>
      <UsersTable />
    </div>
  );
}
