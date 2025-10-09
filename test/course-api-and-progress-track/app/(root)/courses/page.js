"use client";
import React, { useEffect, useState } from 'react';
import './coursesPage.css';
import Link from 'next/link';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3020/api/courses', {
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="courses-container">
      {courses.map(course => (
        <Link href={`/courses/${course.courseId}`} key={course.courseId}>
        <div className="course-card">
          <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
          <h3 className="course-title">{course.title}</h3>
          <p className="course-level">{course.level}</p>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default CoursesPage;
