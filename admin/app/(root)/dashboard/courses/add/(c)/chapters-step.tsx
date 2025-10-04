'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { ContentForm } from './content-form';

export function ChaptersStep() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Chapters</h2>
      <Accordion type="multiple" className="w-full">
        {fields.map((chapter, index) => (
          <AccordionItem value={`item-${index}`} key={chapter.id}>
            <AccordionTrigger className="flex justify-between items-center">
              Chapter {index + 1}: {` `}
              <input
                {...register(`chapters.${index}.title`)}
                placeholder="Chapter Title"
                className="font-normal text-sm ml-2 flex-grow bg-transparent outline-none"
              />
              <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-muted/50 rounded-b-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={control}
                    name={`chapters.${index}.chapterId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ch1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <input type="hidden" {...register(`chapters.${index}.type`)} value="chapter" />
                  <input type="hidden" {...register(`chapters.${index}.checkInStatus`)} />
                  <input type="hidden" {...register(`chapters.${index}.progress`)} />
              </div>
              <ContentForm chapterIndex={index} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ 
            chapterId: '', 
            title: '', 
            type: 'chapter',
            content: [],
            checkInStatus: false,
            progress: 0,
        })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Chapter
      </Button>
    </div>
  );
}
