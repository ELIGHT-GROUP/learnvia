import { GetUsersParams } from "@/types/api-user-type";
import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";

export const getMe = async () => {
  const response = await axiosClient.get(ENDPOINTS.users.me);
  return response.data.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosClient.get(ENDPOINTS.users.byId(id));
  return response.data.data;
};

export const getUsers = async (params: GetUsersParams) => {
  const response = await axiosClient.get(ENDPOINTS.users.get_all(params));
  return response.data.data;
};
