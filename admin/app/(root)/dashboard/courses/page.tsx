import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { CoursesTable } from "./(c)/courses-table";

export const metadata: Metadata = {
  title: "Learvia Admin - Courses",
  description: "Manage courses on the Learvia platform.",
};

export default function CoursesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Course Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Create, edit, and manage all available courses.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/courses/add">
            <PlusCircle />
            Add Course
          </Link>
        </Button>
      </div>

      <CoursesTable />
    </div>
  );
}
