import { SignUpResponse, LoginResponse, LoginRequest } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

interface SignUpRequest {
  name: string;
  userId: string;
  password: string;
  email: string;
  phone: string;
}

export const signUp = async (userData: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data as SignUpResponse;
  } catch (error) {
    return {
      responseType: 'ERROR',
      message: '서버와의 통신 중 오류가 발생했습니다.'
    };
  }
};

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data as LoginResponse;
  } catch (error) {
    return {
      responseType: 'ERROR',
      message: '서버와의 통신 중 오류가 발생했습니다.'
    };
  }
}; 