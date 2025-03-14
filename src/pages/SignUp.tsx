import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import { signUp } from '../services/authService';

interface FormErrors {
  name?: string;
  userId?: string;
  password?: string;
  email?: string;
  phone?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 입력 필드별 유효성 검사 기준 표시
  const validationRules = {
    name: '2~20자 이내로 입력해주세요.',
    userId: '4~20자 이내로 입력해주세요.',
    password: '8~20자 이내의 영문, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.',
    email: '유효한 이메일 주소를 입력해주세요.',
    phone: '010-XXXX-XXXX 형식으로 입력해주세요.'
  };

  // 입력값 변경 시 해당 필드의 에러 초기화
  useEffect(() => {
    setErrors({});
  }, [formData]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // 이름 검증
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.length < 2 || formData.name.length > 20) {
      newErrors.name = '이름은 2~20자 이내로 입력해주세요.';
    }

    // 아이디 검증
    if (!formData.userId) {
      newErrors.userId = '아이디를 입력해주세요.';
    } else if (formData.userId.length < 4 || formData.userId.length > 20) {
      newErrors.userId = '아이디는 4~20자 이내로 입력해주세요.';
    }

    // 비밀번호 검증
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8 || formData.password.length > 20) {
      newErrors.password = '비밀번호는 8~20자 이내로 입력해주세요.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // 전화번호 검증
    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = '전화번호는 010-XXXX-XXXX 형식이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await signUp(formData);

        setToast({
          type: response.responseType.toLowerCase() as 'success' | 'error',
          message: response.message
        });

        if (response.responseType === "SUCCESS" && 'data' in response) {
          // 성공 페이지로 이동
          navigate('/signup/success', {
            state: { userData: response.data }
          });
        } else {
          // 에러 처리
          if (response.message.includes('아이디')) {
            setErrors(prev => ({
              ...prev,
              userId: response.message
            }));
          }
        }
      } catch (error) {
        setToast({
          type: 'error',
          message: '회원가입 처리 중 오류가 발생했습니다.'
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
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length >= 3) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    if (value.length >= 8) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }
    value = value.slice(0, 13);
    
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const renderInputField = (
    name: keyof typeof formData,
    label: string,
    type: string = 'text',
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void = handleChange
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handler}
        placeholder={name === 'phone' ? '010-XXXX-XXXX' : ''}
        className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <p className={`mt-1 text-sm ${errors[name] ? 'text-red-500' : 'text-gray-500'}`}>
        {name === 'userId' && errors[name]?.includes('이미 존재') 
          ? errors[name] 
          : validationRules[name]}
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-gray-600">ToolBox의 회원이 되어주세요</p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderInputField('name', '이름')}
            {renderInputField('userId', '아이디')}
            {renderInputField('password', '비밀번호', 'password')}
            {renderInputField('email', '이메일', 'email')}
            {renderInputField('phone', '전화번호', 'text', handlePhoneChange)}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
            >
              {isLoading ? '처리중...' : '가입하기'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                로그인하기
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </motion.div>
  );
};

export default SignUp; 