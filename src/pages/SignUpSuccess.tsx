import { motion } from 'framer-motion';
import { Link, useLocation, Navigate } from 'react-router-dom';

interface LocationState {
  userData: {
    name: string;
    userId: string;
    email: string;
    phone: string;
  };
}

const SignUpSuccess = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.userData) {
    return <Navigate to="/signup" replace />;
  }

  const { name, userId, email, phone } = state.userData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="text-5xl">🎉</span>
          </motion.div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">회원가입을 축하합니다!</h2>
          <p className="mt-2 text-gray-600">{name}님, ToolBox의 회원이 되신 것을 환영합니다.</p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">가입 정보</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">이름</p>
                <p className="mt-1 text-sm text-gray-900">{name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">아이디</p>
                <p className="mt-1 text-sm text-gray-900">{userId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">이메일</p>
                <p className="mt-1 text-sm text-gray-900">{email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">전화번호</p>
                <p className="mt-1 text-sm text-gray-900">{phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              to="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              로그인하기
            </Link>
            <Link
              to="/"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              홈으로 가기
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUpSuccess; 