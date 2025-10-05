export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    details?: any;
  };
};

export const success = <T>(data: T, message?: string): ApiSuccess<T> => ({
  success: true,
  data,
  message,
});

export const fail = (message: string, details?: any): ApiError => ({
  success: false,
  error: { message, details },
});

export default { success, fail };
