export type Course = {
  id: string;
  title: string;
  students: number;
  status: 'Published' | 'Draft';
  lastUpdated: string;
};

export const courses: Course[] = [
  { id: 'C001', title: 'Java OOP', students: 125, status: 'Published', lastUpdated: '2024-05-15' },
  { id: 'C002', title: 'Data Structures & Algorithms', students: 210, status: 'Published', lastUpdated: '2024-05-20' },
  { id: 'C003', title: 'Advanced React', students: 88, status: 'Published', lastUpdated: '2024-04-30' },
  { id: 'C004', title: 'Introduction to SQL', students: 150, status: 'Draft', lastUpdated: '2024-05-22' },
  { id: 'C005', title: 'Cloud Computing Fundamentals', students: 95, status: 'Published', lastUpdated: '2024-05-18' },
  { id: 'C006', title: 'Machine Learning Basics', students: 76, status: 'Draft', lastUpdated: '2024-05-25' },
];

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Instructor' | 'Student';
    status: 'Active' | 'Inactive';
    lastLogin: string;
    avatarUrl: string;
};

export const users: User[] = [
    { id: 'U001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-25 10:30 AM', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
    { id: 'U002', name: 'Bob Williams', email: 'bob@example.com', role: 'Instructor', status: 'Active', lastLogin: '2024-05-24 08:00 PM', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
    { id: 'U003', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', status: 'Active', lastLogin: '2024-05-25 02:15 PM', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
    { id: 'U004', name: 'Diana Miller', email: 'diana@example.com', role: 'Instructor', status: 'Inactive', lastLogin: '2024-04-10 11:00 AM', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
    { id: 'U005', name: 'Ethan Davis', email: 'ethan@example.com', role: 'Student', status: 'Active', lastLogin: '2024-05-22 09:45 AM', avatarUrl: 'https://picsum.photos/seed/user5/100/100' },
    { id: 'U006', name: 'Fiona Wilson', email: 'fiona@example.com', role: 'Student', status: 'Active', lastLogin: '2024-05-25 11:20 AM', avatarUrl: 'https://picsum.photos/seed/user6/100/100' },
];
