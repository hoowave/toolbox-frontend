import { API_BASE_URL } from '../config';
import { BoardDetail, BoardItem, CategoryType, BoardStatus } from '../types/board';
import { ApiResponse } from '../types/api';

interface GetBoardsParams {
  category: CategoryType;
  page: number;
}

interface CreateBoardRequest {
  category: CategoryType;
  title: string;
  content: string;
}

export const boardService = {
  async getBoards({ category, page }: GetBoardsParams): Promise<ApiResponse<{ content: BoardItem[], totalNumber: number, totalPageNumber: number }>> {
    const response = await fetch(`${API_BASE_URL}/boards?category=${category}&page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }

    return response.json();
  },

  async getBoardDetail(id: number): Promise<ApiResponse<BoardDetail>> {
    const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch board detail');
    }

    return response.json();
  },

  async createBoard(data: CreateBoardRequest, token: string): Promise<ApiResponse<BoardDetail>> {
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        category: data.category,
        title: data.title,
        content: data.content
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create board');
    }

    return response.json();
  },

  async updateBoard(id: number, data: { title?: string; content?: string; status?: BoardStatus }, token: string): Promise<ApiResponse<BoardDetail>> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id,
          ...data
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update board');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating board:', error);
      throw error;
    }
  },

  async deleteBoard(id: number, token: string): Promise<ApiResponse<void>> {
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id,
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to delete board');
    }

    return response.json();
  }
}; 