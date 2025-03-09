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
  type: ToastType;
  message: string;
} 