import { UsersTable } from './(c)/users-table';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learvia Admin - Users',
  description: 'Manage users on the Learvia platform.',
};

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="mt-1 text-muted-foreground">
            View, create, and manage user accounts and roles.
          </p>
        </div>
        <Button variant="default">
          <PlusCircle />
          Add User
        </Button>
      </div>
      <UsersTable />
    </div>
  );
}
