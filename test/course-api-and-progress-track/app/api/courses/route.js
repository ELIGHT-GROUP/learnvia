// app/api/courses/route.js


// course object be like this
//   "courseId": "java-oop-101",
//   "title": "Java OOP",
//   "thumbnail": "https://placehold.co/800x450?text=Hello+World&font=roboto",
//   "level": "Beginner",


// Function to create a single course object
function createCourse(courseId, title, thumbnail, level) {
  return {
    courseId,
    title,
    thumbnail,
    level,
  };
}

const dummyCourses = [];
for (let i = 1; i <= 10; i++) {
  const course = createCourse(
    `course-${i}`,
    `Course Title ${i}`,
    `https://placehold.co/800x450?text=Course+${i}&font=roboto`,
    i % 2 === 0 ? "Intermediate" : "Beginner"
  );
  dummyCourses.push(course);
}


export async function GET() {
  return Response.json({
    success: true,
    message: "Courses retrieved successfully",
    data: dummyCourses,
  });
}
