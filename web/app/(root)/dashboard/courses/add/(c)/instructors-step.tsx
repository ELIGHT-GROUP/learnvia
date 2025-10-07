'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function InstructorsStep() {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructors',
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Instructors</CardTitle>
           <CardDescription>
            Add at least one instructor for this course.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-4 relative bg-background/50">
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-destructive hover:text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`instructors.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., inst_123" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`instructors.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={control}
                  name={`instruct/ors.${index}.profileImage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ id: '', name: '', profileImage: 'https://picsum.photos/seed/3/100/100' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Instructor
          </Button>
            {errors.instructors && typeof errors.instructors.message === 'string' && (
              <p className="text-sm font-medium text-destructive">
                {errors.instructors.message}
              </p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
