import { GetUsersParams } from "@/types/api-user-type";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_VERSION = "v1";
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "";

export const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/${API_VERSION}/auth/google?redirect_uri=${FRONTEND_URL}/auth/success`,
  },
  users: {
    me: `${BASE_URL}/${API_VERSION}/users/me`,
    byId: (id: string) => `${BASE_URL}/${API_VERSION}/users/${id}`,
    get_all: (params: GetUsersParams) =>
      `${BASE_URL}/${API_VERSION}/users?page=${params.page}&limit=${
        params.limit
      }&search=${params.search || ""}`,
  },
};
