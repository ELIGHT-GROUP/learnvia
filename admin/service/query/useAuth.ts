// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   getAuthDataByUser,
//   login,
//   registerPatient,
//   googleAuth,
//   forgetPassword,
//   verifyOtp,
//   sendOtp,
//   changePassword,
// } from "@/services/auth.service";
// import type { GetAuthDataParams } from "@/types/auth-api-type";
// import Cookies from "js-cookie";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { useUserStore } from "@/store/userStore";

// export const useGetAuthDataByUser = (params: GetAuthDataParams) => {
//   return useQuery({
//     queryKey: ["authData", params.userId],
//     queryFn: () => getAuthDataByUser(params),
//   });
// };

// export const useLogin = () => {
//   const queryClient = useQueryClient(); 
//   const navigate = useNavigate();
//   const { setUser, setLoading } = useUserStore();

//   return useMutation({
//     mutationFn: login,
//     onSuccess: (response) => {
//       Cookies.set("authToken", response.data.token, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });
//       setUser(response.data.user);
//       setLoading(false);
//       toast.success(response.message);
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//       navigate("/");
//     },
//     onError: (error: any) => {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };

// export const useRegisterPatient = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: registerPatient,
//     onSuccess: (response) => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success(response.message);
//       navigate(`/auth/signup-details?userId=${response.data._id}`);
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };

// export const useGoogleAuth = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { setUser, setLoading } = useUserStore();

//   return useMutation({
//     mutationFn: googleAuth,
//     onSuccess: (response) => {
//       Cookies.set("authToken", response.data.token, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });
//       setUser(response.data.user);
//       setLoading(false);
//       toast.success(response.message);
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//       navigate("/");
//     },
//     onError: () => {
//       toast.error("Something went wrong");
//     },
//   });
// };

// export const useForgetPassword = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: forgetPassword,
//     onSuccess: (response) => {
//       toast.success(response.message);
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//       navigate("/auth/login");
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };

// export const useVerifyOtp = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: verifyOtp,
//     onSuccess: (response) => {
//       toast.success(response.message);
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };

// export const useSendOtp = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: sendOtp,
//     onSuccess: (response) => {
//       toast.success(response.message);
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };

// export const useChangePasswordAuth = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: changePassword,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//     },
//   });
// };

// export const useLogout = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { clearUser } = useUserStore();

//   return () => {
//     Cookies.remove("authToken");
//     queryClient.clear();
//     clearUser();
//     toast.success("Logged out successfully");
//     navigate("/auth/login");
//   };
// };