import { GetTestResponse, PostTestRequest, PostTestResponse } from '../types/apiTest';
import { API_BASE_URL } from '../config';

export const getTestData = async (id: number): Promise<GetTestResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api-test/${id}`);
    const data = await response.json();
    return data as GetTestResponse;
  } catch (error) {
    return {
      responseType: 'ERROR',
      data: {
        id: 0,
        name: '',
        age: 0,
        gender: ''
      },
      message: '서버와의 통신 중 오류가 발생했습니다.'
    };
  }
};

export const postTestData = async (requestData: PostTestRequest): Promise<PostTestResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api-test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();
    return data as PostTestResponse;
  } catch (error) {
    return {
      responseType: 'ERROR',
      data: {
        responseData: {}
      },
      message: '서버와의 통신 중 오류가 발생했습니다.'
    };
  }
}; 