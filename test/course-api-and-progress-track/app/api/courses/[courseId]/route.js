// {
// 	"success": true,
// 	"message": "Course retrieved successfully",
// 	"data": {
// 		"courseId": "course-1",
// 		"title": "Course Title course-1",
// 		"thumbnail": "https://placehold.co/800x450?text=Course&font=roboto",
// 		"description": "This is a detailed description for Course Title course-1. Learn everything you need about this course.",
// 		"categories": [
// 			"Software Engineering",
// 			"Java",
// 			"OOP"
// 		],
// 		"level": "Beginner",
// 		"instructors": [
// 			{
// 				"id": "inst_955",
// 				"name": "Dr. Perera",
// 				"profileImage": "https://placehold.co/100x100?text=Perera"
// 			},
// 			{
// 				"id": "inst_976",
// 				"name": "Ms. Sanduni",
// 				"profileImage": "https://placehold.co/100x100?text=Sanduni"
// 			}
// 		],
// 		"chapters": [
// 			{
// 				"chapterId": "ch1",
// 				"title": "Introduction to OOP",
// 				"type": "chapter",
// 				"content": [
// 					{
// 						"type": "note",
// 						"data": {
// 							"html": "<h2>What is OOP?</h2><p>OOP stands for <strong>Object-Oriented Programming</strong>.</p>"
// 						}
// 					},
// 					{
// 						"type": "video",
// 						"data": {
// 							"title": "What is OOP?",
// 							"url": "https://example.com/videos/intro-oop"
// 						}
// 					},
// 					{
// 						"type": "quiz",
// 						"data": {
// 							"questions": [
// 								{
// 									"questionId": "q1",
// 									"questionText": "What does OOP stand for?",
// 									"options": [
// 										"Object-Oriented Programming",
// 										"Open Output Processing",
// 										"Ordered Operation Protocol"
// 									],
// 									"correctAnswer": "Object-Oriented Programming"
// 								},
// 								{
// 									"questionId": "q2",
// 									"questionText": "Which of the following is not an OOP concept?",
// 									"options": [
// 										"Encapsulation",
// 										"Polymorphism",
// 										"Iteration"
// 									],
// 									"correctAnswer": "Iteration"
// 								}
// 							]
// 						}
// 					},
// 					{
// 						"type": "flashcards",
// 						"data": [
// 							{
// 								"front": "Encapsulation",
// 								"back": "Wrapping data and methods into a single unit (class)."
// 							},
// 							{
// 								"front": "Inheritance",
// 								"back": "Mechanism where one class acquires properties of another."
// 							}
// 						]
// 					}
// 				],
// 				"checkInStatus": true,
// 				"progress": 100
// 			},
// 			{
// 				"chapterId": "ch2",
// 				"title": "Classes and Objects",
// 				"type": "chapter",
// 				"content": [
// 					{
// 						"type": "note",
// 						"data": {
// 							"html": "<p>A class is a blueprint for creating objects.</p>"
// 						}
// 					}
// 				],
// 				"checkInStatus": true,
// 				"progress": 40
// 			}
// 		],
// 		"totalProgress": 70
// 	}
// }

// Function to create a course object with user-specific progress
function createCourseDetail(courseId, title, thumbnail, level, userProgress = {}) {
  return {
    courseId,
    title,
    thumbnail,
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
            type: "note",
            data: {
              html: "<h2>What is OOP?</h2><p>OOP stands for <strong>Object-Oriented Programming</strong>.</p>"
            }
          },
          {
            type: "video",
            data: {
              title: "What is OOP?",
              url: "https://example.com/videos/intro-oop"
            }
          },
          {
            type: "quiz",
            data: {
              questions: [
                {
                  questionId: "q1",
                  questionText: "What does OOP stand for?",
                  options: ["Object-Oriented Programming", "Open Output Processing", "Ordered Operation Protocol"],
                  correctAnswer: "Object-Oriented Programming"
                },
                {
                  questionId: "q2",
                  questionText: "Which of the following is not an OOP concept?",
                  options: ["Encapsulation", "Polymorphism", "Iteration"],
                  correctAnswer: "Iteration"
                }
              ]
            }
          },
          {
            type: "flashcards",
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
          { type: "note", data: { html: "<p>A class is a blueprint for creating objects.</p>" } }
        ],
        checkInStatus: userProgress.ch2 ? true : false,
        progress: userProgress.ch2 || 0
      }
    ],
    // Optional: total course progress for this user
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
  const { courseId } = params;

  // Mock user progress for demo
  const userProgress = {
    ch1: 100,
    ch2: 40
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
