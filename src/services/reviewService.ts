import { API_BASE_URL } from '../config';
import { ApiResponse } from '../types/api';

export interface Review {
  id: number;
  status: 'VISIBLE' | 'HIDDEN';
  author: string;
  content: string;
  star: number;
  createdAt: string;
}

interface ReviewListResponse {
  content: Review[];
  pageNumber: number;
  totalPageNumber: number;
  totalNumber: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface CreateReviewRequest {
  author: string;
  content: string;
  star: number;
}

export const reviewService = {
  async getReviews(page: number = 1): Promise<ApiResponse<ReviewListResponse>> {
    const response = await fetch(`${API_BASE_URL}/reviews?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    return response.json();
  },

  async createReview(data: CreateReviewRequest): Promise<ApiResponse<Review>> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        author: data.author,
        content: data.content,
        star: data.star
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create review');
    }

    return response.json();
  }
}; 