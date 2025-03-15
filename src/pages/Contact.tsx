import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardItem, CategoryType, getBoardStatusInfo } from '../types/board';
import { format } from 'date-fns';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import { boardService } from '../services/boardService';

const Contact = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const [contacts, setContacts] = useState<BoardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await boardService.getBoards({
          category: CategoryType.CONTACT,
          page: currentPage,
        });
        
        setContacts(data.data.content);
        setTotalPages(data.data.totalPageNumber);
        setTotalCount(data.data.totalNumber);
      } catch (err) {
        setError('문의 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching contacts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [currentPage]);

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

  const handleRowClick = (contact: BoardItem) => {
    if (contact.id) {
      navigate(`/boards/${contact.id}`);
    } else {
      setToast({
        type: 'error',
        message: '유효하지 않은 게시글입니다.'
      });
    }
  };

  const handlePageChange = (page: number) => {
    navigate(`/contact/page/${page}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-600">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">문의하기</h1>
        <p className="mt-2 text-gray-600">
          서비스 이용 중 궁금하신 점이나 불편사항을 알려주세요
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                순번
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                작성자
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                작성일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact, index) => {
              const statusInfo = getBoardStatusInfo(contact.status);
              const itemNumber = (currentPage - 1) * 10 + index + 1;
              return (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleRowClick(contact)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-500">{itemNumber}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-500">{contact.author}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs md:max-w-sm lg:max-w-md text-center">
                        {statusInfo ? (
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className} mr-2`}>
                            {statusInfo.text}
                          </span>
                        ) : null}
                        {contact.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-500">{formatDate(contact.createdAt)}</div>
                  </td>
                </motion.tr>
              );
            })}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                  문의내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/write/contact')}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          문의하기
        </button>
        <div className="text-sm text-gray-500">
          총 {totalCount}개의 문의
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            key="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </motion.div>
  );
};

export default Contact; 