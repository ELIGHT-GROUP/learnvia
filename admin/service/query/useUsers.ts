import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMe, getUserById, getUsers } from "../functions/user.service";
import { GetUsersParams } from "@/types/api-user-type";

export const useUserMe = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getMe,
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};

export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(params),
  });
};