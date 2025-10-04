
// Function to create a course object with user-specific progress
function createCourseDetail(courseId, title, thumbnail, level, userProgress = {}) {
  return {
    courseId,
    title,
    thumbnail,
    banner: `https://placehold.co/800x450?text=${title}&font=roboto`,
    duration: "4 hours",
    description: `This is a detailed description for ${title}. Learn everything you need about this course.`,
    categories: ["Software Engineering", "Java", "OOP"],
    level,
    instructors: [
      {
        id: `inst_${Math.floor(Math.random() * 1000)}`,
        name: "Dr. Perera",
        profileImage: "https://placehold.co/100x100?text=Perera"
      },
      {
        id: `inst_${Math.floor(Math.random() * 1000)}`,
        name: "Ms. Sanduni",
        profileImage: "https://placehold.co/100x100?text=Sanduni"
      }
    ],
    chapters: [
      {
        chapterId: "ch1",
        title: "Introduction to OOP",
        type: "chapter",
        content: [
          {
            id: "ch1_note1",
            title: "What is OOP?",
            type: "note",
            checkStatus: userProgress.ch1Note1 || false,
            data: {
              html: "<h2>What is OOP?</h2><p>OOP stands for <strong>Object-Oriented Programming</strong>.</p>"
            }
          },
          {
            id: "ch1_video1",
            title: "What is OOP? Video",
            type: "video",
            checkStatus: userProgress.ch1Video1 || false,
            data: {
              url: "https://example.com/videos/intro-oop"
            }
          },
          {
            id: "ch1_quiz1",
            title: "OOP Basics Quiz",
            type: "quiz",
            checkStatus: userProgress.ch1Quiz1 || false,
            data: {
              questions: [
                {
                  questionId: "q1",
                  questionText: "What does OOP stand for?",
                  options: [
                    "Object-Oriented Programming",
                    "Open Output Processing",
                    "Ordered Operation Protocol"
                  ],
                  correctAnswer: "Object-Oriented Programming",
                  marks: 5,             // points for this question
                  answered: null,       // what user answered
                  isCorrect: null,      // true/false after submission
                  explanation: "OOP stands for Object-Oriented Programming, which uses classes and objects."
                },
                {
                  questionId: "q2",
                  questionText: "Which of the following is not an OOP concept?",
                  options: ["Encapsulation", "Polymorphism", "Iteration"],
                  correctAnswer: "Iteration",
                  marks: 5,
                  answered: null,
                  isCorrect: null,
                  explanation: "Iteration is a general programming concept, not specific to OOP."
                }
              ],
              totalMarks: 10  // sum of all question marks
            }
          },
          {
            id: "ch1_flash1",
            title: "OOP Flashcards",
            type: "flashcards",
            checkStatus: userProgress.ch1Flash1 || false,
            data: [
              { front: "Encapsulation", back: "Wrapping data and methods into a single unit (class)." },
              { front: "Inheritance", back: "Mechanism where one class acquires properties of another." }
            ]
          }
        ],
        checkInStatus: userProgress.ch1 ? true : false,
        progress: userProgress.ch1 || 0
      },
      {
        chapterId: "ch2",
        title: "Classes and Objects",
        type: "chapter",
        content: [
          {
            id: "ch2_note1",
            title: "Classes and Objects Note",
            type: "note",
            checkStatus: userProgress.ch2Note1 || false,
            data: { html: "<p>A class is a blueprint for creating objects.</p>" }
          }
        ],
        checkInStatus: userProgress.ch2 ? true : false,
        progress: userProgress.ch2 || 0
      }
    ],
    totalProgress: calculateTotalProgress(userProgress)
  };
}

// Helper to calculate total course progress
function calculateTotalProgress(userProgress) {
  const values = Object.values(userProgress);
  if (!values.length) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / values.length);
}

// GET handler
export async function GET(request, { params }) {
  const { courseId } = await params;

  // Mock user progress for demo
  const userProgress = {
    ch1: 100,
    ch1Note1: true,
    ch1Video1: true,
    ch1Quiz1: true,
    ch1Flash1: true,
    ch2: 40,
    ch2Note1: true
  };

  const course = createCourseDetail(
    courseId,
    `Course Title ${courseId}`,
    "https://placehold.co/800x450?text=Course&font=roboto",
    "Beginner",
    userProgress
  );

  return Response.json({
    success: true,
    message: "Course retrieved successfully",
    data: course
  });
}
