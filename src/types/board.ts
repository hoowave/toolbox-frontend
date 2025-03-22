export enum CategoryType {
  NOTICE = 'NOTICE',
  CONTACT = 'CONTACT'
}

export enum BoardStatus {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED'
}

export interface BoardItem {
  id: number;
  author: string;
  title: string;
  hit: number;
  status: BoardStatus;
  createdAt: string;
  category: CategoryType;
}

export interface BoardDetail extends BoardItem {
  content: string;
}

export interface BoardResponse {
  responseType: string;
  data: {
    content: BoardItem[];
    pageNumber: number;
    totalPageNumber: number;
    totalNumber: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  message: string;
}

export interface BoardDetailResponse {
  responseType: string;
  data: BoardDetail;
  message: string;
}

export const getBoardStatusInfo = (status: BoardStatus) => {
  switch (status) {
    case BoardStatus.HIDDEN:
      return { 
        text: '숨김', 
        className: 'bg-yellow-100 text-yellow-800',
        message: '숨겨진 게시글입니다.'
      };
    case BoardStatus.DELETED:
      return { 
        text: '삭제됨', 
        className: 'bg-red-100 text-red-800',
        message: '삭제된 게시글입니다.'
      };
    default:
      return null;
  }
}; 