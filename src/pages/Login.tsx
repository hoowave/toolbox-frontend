import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import { useAuth } from '../contexts/AuthContext';

interface FormErrors {
  userId?: string;
  password?: string;
}

interface LoginResponse {
  responseType: 'SUCCESS' | 'ERROR';
  data: {
    token: string;
    userId: string;
    role: 'USER' | 'ADMIN';
  };
  message: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.userId) {
      newErrors.userId = '아이디를 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await login(formData) as LoginResponse;

        if (response.responseType === "SUCCESS" && response.data) {
          // AuthContext의 login 함수 호출
          authLogin(response);
          
          setToast({
            type: 'success',
            message: `${response.data.userId}님 환영합니다!`
          });

          // 토스트 메시지를 보여주고 홈으로 이동
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 500);
        } else {
          setToast({
            type: 'error',
            message: response.message || '로그인에 실패했습니다.'
          });
        }
      } catch (error) {
        setToast({
          type: 'error',
          message: '로그인 처리 중 오류가 발생했습니다.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 에러 메시지 초기화
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-gray-600">ToolBox에 오신 것을 환영합니다</p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                  errors.userId ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.userId && (
                <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
            >
              {isLoading ? '처리중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm mb-2 text-gray-600">
                아직 계정이 없으신가요?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  회원가입하기
                </Link>
              </p>
              <div className="text-sm text-gray-600">
                비밀번호를 잊으셨나요?{' '}
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </motion.div>
  );
};

export default Login; 