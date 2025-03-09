export interface GetTestResponse {
  responseType: 'SUCCESS' | 'ERROR';
  data: {
    id: number;
    name: string;
    age: number;
    gender: string;
  };
  message: string;
}

export interface PostTestRequest {
  responseData: Record<string, any>;
}

export interface PostTestResponse {
  responseType: 'SUCCESS' | 'ERROR';
  data: {
    responseData: Record<string, any>;
  };
  message: string;
} 