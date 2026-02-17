import apiClient, { handleApiError } from './client';
import { ApiResponse, User } from '../../types/api';

/**
 * Send OTP to phone number
 */
export const sendOTP = async (
  phoneNumber: string,
  purpose: 'registration' | 'login' | 'recovery'
): Promise<{ phoneNumber: string; expiresIn: number }> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/send-otp', {
      phoneNumber,
      purpose,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Verify OTP code
 */
export const verifyOTP = async (
  phoneNumber: string,
  code: string,
  purpose: 'registration' | 'login' | 'recovery'
): Promise<{ phoneNumber: string; verified: boolean }> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/verify-otp', {
      phoneNumber,
      code,
      purpose,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Register new user (with phone OTP)
 */
export const register = async (data: {
  phoneNumber: string;
  fullName: string;
  email?: string;
  password?: string;
  role: 'consumer' | 'rider';
}): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/register', data);

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Register new user with email and password (no OTP required)
 */
export const registerWithPassword = async (data: {
  phoneNumber: string;
  fullName: string;
  email: string;
  password: string;
  role?: 'consumer' | 'rider';
}): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/register-with-password', data);

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Login user (with phone OTP)
 */
export const login = async (
  phoneNumber: string
): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/login', {
      phoneNumber,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Login user with email and password
 */
export const loginWithPassword = async (
  email: string,
  password: string
): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/login-with-password', {
      email,
      password,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/refresh', {
      refreshToken,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Send OTP to email
 */
export const sendEmailOTP = async (
  email: string,
  purpose: 'registration' | 'login' | 'verification'
): Promise<{ email: string; expiresIn: number }> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/send-email-otp', {
      email,
      purpose,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Verify email OTP code
 */
export const verifyEmailOTP = async (
  email: string,
  code: string
): Promise<{ email: string; verified: boolean }> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/verify-email-otp', {
      email,
      code,
    });

    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Logout user
 */
export const logout = async (refreshToken: string): Promise<void> => {
  try {
    await apiClient.post<ApiResponse>('/auth/logout', {
      refreshToken,
    });
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
