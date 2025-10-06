type UserRole = "owner" | "admin" | "student" | "instructor";

export interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
  role: UserRole;
  googleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
}
