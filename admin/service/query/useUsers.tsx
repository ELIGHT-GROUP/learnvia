import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  getMe,
  getUserById,
  getUsers,
  updateUser,
  updateUserRole,
} from "../functions/user.service";
import { GetUsersParams } from "@/types/api-user-type";
import { toast } from "sonner";

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
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const promise = updateUserRole(id, role);
      toast.promise(promise, {
        loading: "Updating user role...",
        success: "User role updated successfully!",
        error: "Failed to update user role.",
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      const promise = deleteUser(id);
      toast.promise(promise, {
        loading: "Deleting user...",
        success: "User deleted successfully!",
        error: "Failed to delete user.",
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
