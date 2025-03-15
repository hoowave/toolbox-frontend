import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoardDetail as BoardDetailType, getBoardStatusInfo } from '../types/board';
import { format } from 'date-fns';
import { boardService } from '../services/boardService';

const BoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (!id) return;
      
      try {
        const response = await boardService.getBoardDetail(Number(id));
        setBoard(response.data);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoardDetail();
  }, [id]);

  const formatDate = (dateStr: string) => {
    try {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const hour = dateStr.substring(8, 10);
      const minute = dateStr.substring(10, 12);
      
      const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
      );
      
      return format(date, 'yyyy.MM.dd HH:mm');
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-600">
        {error || '게시글을 찾을 수 없습니다.'}
      </div>
    );
  }

  const statusInfo = getBoardStatusInfo(board.status);

  if (statusInfo) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.className}`}>
            {statusInfo.message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← 목록으로
            </button>
            <span className="text-sm text-gray-500">
              조회수: {board.hit}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {board.title}
          </h1>

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
            <div className="text-sm text-gray-600">
              작성자: {board.author}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(board.createdAt)}
            </div>
          </div>

          <div className="prose max-w-none">
            {board.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardDetail; 