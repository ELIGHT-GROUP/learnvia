"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./courseDetail.module.css";

const CourseDetailPage = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState({});
  const { courseId } = params;

  useEffect(() => {
    fetch(`/api/courses/${courseId}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCourse(data.data);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  if (loading) return <div className={styles.loading}>Loading course...</div>;
  if (!course) return <div className={styles.error}>Course not found</div>;

  return (
    <div className={styles.pageWrapper}>
      <aside className={styles.sidebar}>
        <h2>Chapters</h2>
        <ul className={styles.chaptersList}>
          {course.chapters.map((chapter) => (
            <li key={chapter.chapterId}>
              <div 
                className={styles.chapterHeader}
                onClick={() => toggleChapter(chapter.chapterId)}
              >
                <div className={styles.chapterInfo}>
                  <span className={styles.dropdownIcon}>
                    {expandedChapters[chapter.chapterId] ? '▼' : '►'}
                  </span>
                  <span>{chapter.title}</span>
                </div>
                <span className={styles.progress}>{chapter.progress}%</span>
              </div>
              
              {expandedChapters[chapter.chapterId] && (
                <ul className={styles.contentList}>
                  {chapter.content.map((item, idx) => (
                    <li key={item.id || `${chapter.chapterId}_item_${idx}`} className={styles.contentItem}>
                      {item.type === "note" && <span>📝 {item.title || "Note"}</span>}
                      {item.type === "video" && <span>🎬 {item.title || item.data.title || "Video"}</span>}
                      {item.type === "quiz" && <span>📋 {item.title || "Quiz"}</span>}
                      {item.type === "flashcards" && <span>📇 {item.title || "Flashcards"}</span>}
                      {item.checkStatus && <span className={styles.checkMark}>✓</span>}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.container}>
        <Link href="/courses" className={styles.backLink}>
          ← Back to Courses
        </Link>

        <div className={styles.courseHeader}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className={styles.courseBanner}
          />
          <div className={styles.courseInfo}>
            <h1 className={styles.courseTitle}>{course.title}</h1>
            <div className={styles.courseMetadata}>
              <span className={styles.courseLevel}>{course.level}</span>
              {course.categories && (
                <div className={styles.categories}>
                  {course.categories.map((category, idx) => (
                    <span key={idx} className={styles.category}>{category}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.courseDescription}>
          <h2>About this course</h2>
          <p>{course.description}</p>
        </div>

        {course.instructors && course.instructors.length > 0 && (
          <div className={styles.instructors}>
            <h2>Instructors</h2>
            <div className={styles.instructorsList}>
              {course.instructors.map((instructor) => (
                <div key={instructor.id} className={styles.instructor}>
                  <img 
                    src={instructor.profileImage} 
                    alt={instructor.name} 
                    className={styles.instructorImage}
                  />
                  <span className={styles.instructorName}>{instructor.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.courseContent}>
          <h2>Course Content</h2>
          {course.chapters.map((chapter) => (
            <div key={chapter.chapterId} className={styles.chapter}>
              <h3 className={styles.chapterTitle}>
                {chapter.title} - {chapter.progress}%
              </h3>
              <ul className={styles.lessonsList}>
                {chapter.content.map((lesson, idx) => (
                  <li key={lesson.id || idx} className={styles.lessonItem}>
                    {lesson.type === "note" && (
                      <span
                        dangerouslySetInnerHTML={{ __html: lesson.data.html }}
                      />
                    )}
                    {lesson.type === "video" && (
                      <span>
                        🎬 {lesson.title || lesson.data.title} -{" "}
                        <a href={lesson.data.url} target="_blank" rel="noopener noreferrer">
                          Watch
                        </a>
                      </span>
                    )}
                    {lesson.type === "quiz" && (
                      <span>📝 Quiz: {lesson.data.questions.length} questions</span>
                    )}
                    {lesson.type === "flashcards" && (
                      <span>📇 Flashcards: {lesson.data.length || lesson.data.length}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.totalProgress}>
          Total Progress: {course.totalProgress}%
        </div>
      </main>
    </div>
  );
};

export default CourseDetailPage;
