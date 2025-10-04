"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CourseInfoStep } from "./course-info-step";
import { InstructorsStep } from "./instructors-step";
import { ChaptersStep } from "./chapters-step";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Schemas for content data
const NoteDataSchema = z.object({
  mode: z.enum(["note", "html"]),
  content: z.string(),
});

const VideoDataSchema = z.object({
  source: z.enum(["youtube", "direct"]),
  url: z.string().url(),
  duration: z.string().min(1, "Duration is required."),
});

const QuizQuestionSchema = z.object({
  questionId: z.string().min(1),
  questionText: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
  options: z.array(z.string()).min(1),
  correctAnswer: z.string().min(1),
  marks: z.number().positive(),
});

const QuizDataSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});

const FlashcardsDataSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
});

const ContentSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    checkStatus: z.boolean(),
    type: z.enum(["note", "video", "quiz", "flashcards"]),
    data: z.any(),
  })
  .refine(
    (val) => {
      switch (val.type) {
        case "note":
          return NoteDataSchema.safeParse(val.data).success;
        case "video":
          return VideoDataSchema.safeParse(val.data).success;
        case "quiz":
          return QuizDataSchema.safeParse(val.data).success;
        case "flashcards":
          return FlashcardsDataSchema.safeParse(val.data).success;
        default:
          return false;
      }
    },
    {
      message: "Invalid data for the selected content type.",
      path: ["data"],
    }
  );

const courseSchema = z.object({
  courseId: z.string().min(1, "Course ID is required."),
  title: z.string().min(1, "Title is required."),
  thumbnail: z.string().url("Must be a valid URL."),
  banner: z.string().url("Must be a valid URL."),
  duration: z.string().min(1, "Duration is required."),
  description: z.string().min(1, "Description is required."),
  categories: z.array(z.string()).min(1, "At least one category is required."),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  instructors: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        profileImage: z.string().url(),
      })
    )
    .min(1, "At least one instructor is required."),
  chapters: z
    .array(
      z.object({
        chapterId: z.string().min(1),
        title: z.string().min(1),
        type: z.literal("chapter"),
        content: z.array(ContentSchema).optional(),
        checkInStatus: z.boolean(),
        progress: z.number(),
      })
    )
    .min(1, "At least one chapter is required.")
    .optional(),
  totalProgress: z.number(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Course Information",
    fields: [
      "courseId",
      "title",
      "thumbnail",
      "banner",
      "duration",
      "description",
      "categories",
      "level",
    ],
  },
  {
    id: "Step 2",
    name: "Instructors",
    fields: ["instructors"],
  },
  {
    id: "Step 3",
    name: "Chapters & Content",
    fields: ["chapters"],
  },
];

export function AddCourseForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();

  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseId: "",
      title: "",
      thumbnail: "",
      banner: "",
      duration: "",
      description: "",
      level: "Beginner",
      categories: [],
      instructors: [],
      chapters: [],
      totalProgress: 0,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const processForm = (data: CourseFormValues) => {
    console.log("Form Data:", JSON.stringify(data, null, 2));
    toast.success("Course Created!");
    // Here you would typically send the data to your backend
    // For now, we'll just log it and redirect.
    router.push("/courses");
  };

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as (keyof CourseFormValues)[], {
      shouldFocus: true,
    });

    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((step) => step + 1);
      }
    } else {
      console.log("Validation errors", errors);
      toast.error("Validation Error");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardContent className="p-6">
          <nav className="mb-8">
            <ol className="flex items-center justify-around space-x-2 text-sm font-medium text-gray-500">
              {steps.map((step, index) => (
                <li key={step.name} className="flex items-center">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      currentStep > index
                        ? "bg-primary text-primary-foreground"
                        : currentStep === index
                        ? "border-2 border-primary text-primary"
                        : "border border-gray-300"
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      "ml-2",
                      currentStep >= index && "text-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
          <form onSubmit={handleSubmit(processForm)}>
            {currentStep === 0 && <CourseInfoStep />}
            {currentStep === 1 && <InstructorsStep />}
            {currentStep === 2 && <ChaptersStep />}

            <div className="mt-8 pt-5">
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Create Course</Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
