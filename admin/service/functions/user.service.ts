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

export const updateUserRole = async (id: string, role: string) => {
  const response = await axiosClient.put(ENDPOINTS.users.update_role(id), {
    role,
  });
  return response.data.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await axiosClient.put(ENDPOINTS.users.update(id), data);
  return response.data.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosClient.delete(ENDPOINTS.users.delete(id));
  return response.data.data;
};
