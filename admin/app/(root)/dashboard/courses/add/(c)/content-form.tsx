'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentFormProps {
  chapterIndex: number;
}

const ContentDetails = ({ chapterIndex, contentIndex, type }: { chapterIndex: number, contentIndex: number, type: string }) => {
    const { control, watch } = useFormContext();
    const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
      control,
      name: `chapters.${chapterIndex}.content.${contentIndex}.data.questions`
    });

    const noteMode = watch(`chapters.${chapterIndex}.content.${contentIndex}.data.mode`);
    const videoSource = watch(`chapters.${chapterIndex}.content.${contentIndex}.data.source`);

    switch (type) {
      case 'note':
        return (
          <div className="space-y-4">
             <FormField
                control={control}
                name={`chapters.${chapterIndex}.content.${contentIndex}.data.mode`}
                defaultValue="note"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Note Mode</FormLabel>
                        <FormControl>
                            <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="note">Simple Editor</TabsTrigger>
                                    <TabsTrigger value="html">HTML</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={control}
              name={`chapters.${chapterIndex}.content.${contentIndex}.data.content`}
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{noteMode === 'html' ? 'HTML Content' : 'Note Content'}</FormLabel>
                  <FormControl>
                      <Textarea placeholder={noteMode === 'html' ? '<p>Enter your HTML here...</p>' : "Enter note content here..."} {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 'video':
        return (
          <div className="space-y-4">
            <FormField
                control={control}
                name={`chapters.${chapterIndex}.content.${contentIndex}.data.source`}
                defaultValue="youtube"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Video Source</FormLabel>
                        <FormControl>
                            <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                                    <TabsTrigger value="direct">Direct Video Link</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </FormControl>
                         <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={control}
                name={`chapters.${chapterIndex}.content.${contentIndex}.data.url`}
                defaultValue=""
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                        <Input placeholder={videoSource === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://example.com/video.mp4'} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={control}
                name={`chapters.${chapterIndex}.content.${contentIndex}.data.duration`}
                defaultValue=""
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 10:30" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          </div>
        );
      case 'quiz':
        return (
            <div className='space-y-4'>
                 <h4 className="text-md font-semibold">Quiz Questions</h4>
                 {questionFields.map((question, qIndex) => (
                    <div key={question.id} className="p-3 border rounded-md space-y-3 bg-white">
                        <div className="flex justify-between items-center">
                            <h5 className="font-medium">Question {qIndex + 1}</h5>
                             <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeQuestion(qIndex)}
                                >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.content.${contentIndex}.data.questions.${qIndex}.questionId`}
                            render={({ field }) => <FormItem><FormLabel>Question ID</FormLabel><FormControl><Input placeholder="q1" {...field} /></FormControl><FormMessage /></FormItem>}
                        />
                         <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.content.${contentIndex}.data.questions.${qIndex}.questionText`}
                            render={({ field }) => <FormItem><FormLabel>Question Text</FormLabel><FormControl><Input placeholder="What is...?" {...field} /></FormControl><FormMessage /></FormItem>}
                        />
                        <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.content.${contentIndex}.data.questions.${qIndex}.imageUrl`}
                            render={({ field }) => <FormItem><FormLabel>Image URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl><FormMessage /></FormItem>}
                        />
                        <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.content.${contentIndex}.data.questions.${qIndex}.options`}
                            render={({ field }) => <FormItem><FormLabel>Options (comma-separated)</FormLabel><FormControl><Input placeholder="A,B,C" {...field} onChange={e => field.onChange(e.target.value.split(','))} value={Array.isArray(field.value) ? field.value.join(',') : ''} /></FormControl><FormMessage /></FormItem>}
                        />
                        <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.content.${contentIndex}.data.questions.${qIndex}.correctAnswer`}
                            render={({ field }) => <FormItem><FormLabel>Correct Answer</FormLabel><FormControl><Input placeholder="A" {...field} /></FormControl><FormMessage /></FormItem>}
                        />
                        <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.content.${contentIndex}.data.questions.${qIndex}.marks`}
                            render={({ field }) => <FormItem><FormLabel>Marks</FormLabel><FormControl><Input type="number" placeholder="5" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/></FormControl><FormMessage /></FormItem>}
                        />
                        </div>
                    </div>
                 ))}
                 <Button type="button" variant="outline" size="sm" onClick={() => appendQuestion({ questionId: '', questionText: '', imageUrl: '', options: [], correctAnswer: '', marks: 0 })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                 </Button>
            </div>
        );
      case 'flashcards':
        return (
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={control}
                    name={`chapters.${chapterIndex}.content.${contentIndex}.data.front`}
                    defaultValue=""
                    render={({ field }) => <FormItem><FormLabel>Front</FormLabel><FormControl><Textarea placeholder="Front text" {...field} /></FormControl><FormMessage /></FormItem>}
                />
                 <FormField
                    control={control}
                    name={`chapters.${chapterIndex}.content.${contentIndex}.data.back`}
                    defaultValue=""
                    render={({ field }) => <FormItem><FormLabel>Back</FormLabel><FormControl><Textarea placeholder="Back text" {...field} /></FormControl><FormMessage /></FormItem>}
                />
            </div>
        );
      default:
        return null;
    }
  };

export function ContentForm({ chapterIndex }: ContentFormProps) {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.content`,
  });

  const watchFieldArray = watch(`chapters.${chapterIndex}.content`);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const handleContentTypeChange = (value: string, index: number) => {
    setValue(`chapters.${chapterIndex}.content.${index}.type`, value);
    // Reset data object when type changes
    switch (value) {
        case 'note':
            setValue(`chapters.${chapterIndex}.content.${index}.data`, { mode: 'note', content: '' });
            break;
        case 'video':
             setValue(`chapters.${chapterIndex}.content.${index}.data`, { source: 'youtube', url: '', duration: '' });
            break;
        case 'quiz':
             setValue(`chapters.${chapterIndex}.content.${index}.data`, { questions: [] });
            break;
        case 'flashcards':
             setValue(`chapters.${chapterIndex}.content.${index}.data`, { front: '', back: '' });
            break;
        default:
             setValue(`chapters.${chapterIndex}.content.${index}.data`, {});
            break;
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Chapter Content</h3>
      {controlledFields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-md space-y-4 relative bg-background/70">
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
              name={`chapters.${chapterIndex}.content.${index}.id`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>Content ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ch1_note1" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`chapters.${chapterIndex}.content.${index}.title`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>Content Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Content title" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`chapters.${chapterIndex}.content.${index}.type`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select onValueChange={(value) => handleContentTypeChange(value, index)} defaultValue={formField.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="flashcards">Flashcards</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           <input
            type="hidden"
            {...control.register(`chapters.${chapterIndex}.content.${index}.checkStatus`)}
          />
          {field.type && <ContentDetails chapterIndex={chapterIndex} contentIndex={index} type={field.type} />}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ 
            id: '', 
            title: '', 
            type: 'note', 
            checkStatus: true,
            data: {
                mode: 'note',
                content: ''
            }
        })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Content
      </Button>
    </div>
  );
}
