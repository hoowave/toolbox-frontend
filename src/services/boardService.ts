import { BoardResponse, BoardDetailResponse, CategoryType, BoardDetail } from '../types/board';
import { API_BASE_URL } from '../config';

interface GetBoardsParams {
  category: CategoryType;
  page?: number;
}

export const boardService = {
  getBoards: async ({ category, page }: { category: CategoryType; page: number }): Promise<BoardResponse> => {
    const url = `${API_BASE_URL}/boards?category=${category}&page=${page}`;
    console.log('Requesting URL:', url);
    
    try {
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch boards: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  },

  getBoardDetail: async (id: number): Promise<BoardDetailResponse> => {
    const url = `${API_BASE_URL}/boards/${id}`;
    console.log('Requesting URL:', url);
    
    try {
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch board detail: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  },

  createBoard: async (data: Omit<BoardDetail, 'id' | 'hit' | 'status' | 'createdAt'>): Promise<BoardDetailResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }

      return await response.json();
    } catch (error) {
      throw new Error('게시글 작성에 실패했습니다.');
    }
  },

  updateBoard: async (id: number, data: Partial<BoardDetail>): Promise<BoardDetailResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }

      return await response.json();
    } catch (error) {
      throw new Error('게시글 수정에 실패했습니다.');
    }
  },

  deleteBoard: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }
    } catch (error) {
      throw new Error('게시글 삭제에 실패했습니다.');
    }
  }
}; 