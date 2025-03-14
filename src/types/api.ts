export interface UrlShortenRequest {
  originalUrl: string;
}

export interface UrlShortenResponse {
  responseType: 'SUCCESS' | 'ERROR';
  data?: {
    originalUrl: string;
    transUrl: string;
  };
  message: string;
}

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  type: 'success' | 'error';
  message: string;
}

export interface SignUpSuccessResponse {
  responseType: "SUCCESS";
  data: {
    name: string;
    userId: string;
    email: string;
    phone: string;
  };
  message: string;
}

export interface SignUpErrorResponse {
  responseType: "ERROR";
  message: string;
}

export type SignUpResponse = SignUpSuccessResponse | SignUpErrorResponse;

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginSuccessResponse {
  responseType: "SUCCESS";
  data: {
    userId: string;
    token: string;
  };
  message: string;
}

export interface LoginErrorResponse {
  responseType: "ERROR";
  message: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse; 