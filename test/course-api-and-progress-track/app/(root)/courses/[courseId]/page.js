"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./courseDetail.module.css";

const CourseDetailPage = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div className={styles.loading}>Loading course...</div>;
  if (!course) return <div className={styles.error}>Course not found</div>;

  return (
    <div className={styles.pageWrapper}>
      <aside className={styles.sidebar}>
        <h2>Chapters</h2>
        <ul>
          {course.chapters.map((chapter) => (
            <li key={chapter.chapterId} className={styles.chapterItem}>
              <span>{chapter.title}</span>
              <span className={styles.progress}>{chapter.progress}%</span>
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
            <span className={styles.courseLevel}>{course.level}</span>
          </div>
        </div>

        <div className={styles.courseDescription}>
          <h2>About this course</h2>
          <p>{course.description}</p>
        </div>

        <div className={styles.courseContent}>
          <h2>Course Content</h2>
          {course.chapters.map((chapter) => (
            <div key={chapter.chapterId} className={styles.chapter}>
              <h3 className={styles.chapterTitle}>
                {chapter.title} - {chapter.progress}%
              </h3>
              <ul className={styles.lessonsList}>
                {chapter.content.map((lesson, idx) => (
                  <li key={idx} className={styles.lessonItem}>
                    {lesson.type === "note" && (
                      <span
                        dangerouslySetInnerHTML={{ __html: lesson.data.html }}
                      />
                    )}
                    {lesson.type === "video" && (
                      <span>
                        🎬 {lesson.data.title} -{" "}
                        <a href={lesson.data.url} target="_blank">
                          Watch
                        </a>
                      </span>
                    )}
                    {lesson.type === "quiz" && (
                      <span>📝 Quiz: {lesson.data.questions.length} questions</span>
                    )}
                    {lesson.type === "flashcards" && (
                      <span>📇 Flashcards: {lesson.data.length}</span>
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
