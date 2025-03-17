import { BoardResponse, BoardDetailResponse, CategoryType, BoardDetail } from '../types/board';
import { API_BASE_URL } from '../config';

interface GetBoardsParams {
  category: CategoryType;
  page?: number;
}

export const boardService = {
  getBoards: async ({ category, page = 1 }: GetBoardsParams): Promise<BoardResponse> => {
    const url = `${API_BASE_URL}/boards?category=${category}&page=${page}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching boards:', error);
      throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    }
  },

  getBoardDetail: async (id: number): Promise<BoardDetailResponse> => {
    const url = `${API_BASE_URL}/boards/${id}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }

      return await response.json();
    } catch (error) {
      throw new Error('게시글을 불러오는데 실패했습니다.');
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