import { UrlShortenRequest, UrlShortenResponse } from '../types/api';
import { API_BASE_URL } from '../config';

export const shortenUrl = async (request: UrlShortenRequest): Promise<UrlShortenResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cut-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    return data as UrlShortenResponse;
  } catch (error) {
    return {
      responseType: 'ERROR',
      message: '서버와의 통신 중 오류가 발생했습니다.',
    };
  }
}; 