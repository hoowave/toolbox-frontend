import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryType } from '../types/board';
import { boardService } from '../services/boardService';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';

interface BoardWriteForm {
  title: string;
  content: string;
  author: string;
  category: CategoryType;
}

const BoardWrite = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [form, setForm] = useState<BoardWriteForm>({
    title: '',
    content: '',
    author: '',
    category: (category?.toUpperCase() as CategoryType) || CategoryType.CONTACT
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim() || !form.author.trim()) {
      setToast({
        type: 'error',
        message: '모든 필드를 입력해주세요.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await boardService.createBoard(form);
      navigate(`/${form.category.toLowerCase()}`);
    } catch (error) {
      setToast({
        type: 'error',
        message: '게시글 작성에 실패했습니다.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          {form.category === CategoryType.NOTICE ? '공지사항 작성' : '문의하기'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            작성자
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={form.author}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            value={form.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? '작성 중...' : '작성하기'}
          </button>
        </div>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </motion.div>
  );
};

export default BoardWrite; 