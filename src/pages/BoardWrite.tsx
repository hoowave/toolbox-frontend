import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryType } from '../types/board';
import { boardService } from '../services/boardService';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import { useAuth } from '../contexts/AuthContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './BoardWrite.css';

interface BoardWriteForm {
  title: string;
  content: string;
  author: string;
  category: CategoryType;
}

const editorConfiguration = {
  placeholder: '내용을 입력해주세요',
  language: 'ko',
  enterMode: 2, // CKEDITOR.ENTER_BR
  removePlugins: ['Markdown'],
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'undo',
      'redo'
    ]
  }
};

const BoardWrite = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { category } = useParams<{ category: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [form, setForm] = useState<BoardWriteForm>({
    title: '',
    content: '',
    author: user?.userId || '',
    category: (category?.toUpperCase() as CategoryType) || CategoryType.CONTACT
  });

  useEffect(() => {
    if (!user) {
      setToast({
        type: 'error',
        message: '로그인이 필요한 서비스입니다.'
      });
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setForm(prev => ({
      ...prev,
      content: data
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim()) {
      setToast({
        type: 'error',
        message: '제목과 내용을 입력해주세요.'
      });
      return;
    }

    const titleLength = form.title.trim().length;
    const contentLength = form.content.replace(/<[^>]*>/g, '').trim().length;

    if (titleLength < 3 || titleLength > 100) {
      setToast({
        type: 'error',
        message: '제목은 3자 이상 100자 이하로 입력해주세요.'
      });
      return;
    }

    if (contentLength < 10) {
      setToast({
        type: 'error',
        message: '내용은 10자 이상 입력해주세요.'
      });
      return;
    }

    if (!user?.token) {
      setToast({
        type: 'error',
        message: '로그인이 필요한 서비스입니다.'
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await boardService.createBoard({
        category: form.category,
        title: form.title,
        content: form.content
      }, user.token);
      
      setToast({
        type: 'success',
        message: response.message || '게시글 작성이 완료되었습니다.'
      });

      setTimeout(() => {
        navigate(`/${form.category.toLowerCase()}/details/${response.data.id}`);
      }, 1000);
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
      className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {form.category === CategoryType.NOTICE ? '공지사항 작성' : '문의하기'}
            </h1>
            <p className="text-gray-600">
              {form.category === CategoryType.NOTICE 
                ? '공지사항을 작성해주세요.' 
                : '문의하실 내용을 상세히 작성해주세요.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    제목
                  </label>
                  <span className="text-xs text-gray-500">3-100자</span>
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  className="block w-full h-12 px-4 rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  placeholder="제목을 입력해주세요"
                  minLength={3}
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  작성자
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={form.author}
                  disabled
                  className="block w-full h-12 px-4 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  내용
                </label>
                <span className="text-xs text-gray-500">최소 10자</span>
              </div>
              <div className="editor-wrapper">
                <CKEditor<ClassicEditor>
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onChange={handleEditorChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border-2 border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? '작성 중...' : '작성하기'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </motion.div>
  );
};

export default BoardWrite; 