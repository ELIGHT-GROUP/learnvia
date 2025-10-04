import type { Metadata } from 'next';
import { AddCourseForm } from './(c)/add-course-form';

export const metadata: Metadata = {
  title: 'Learvia Admin - Add Course',
  description: 'Add a new course to the Learvia platform.',
};

export default function AddCoursePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Course</h1>
          <p className="mt-1 text-muted-foreground">
            Fill out the form below to create a new course.
          </p>
        </div>
      </div>
      <AddCourseForm />
    </div>
  );
}
