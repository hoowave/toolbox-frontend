import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">회원 정보</h2>
          <p className="mt-2 text-gray-600">{user.userId}님의 상세 정보입니다.</p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-3xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">사용자 ID</h3>
              <div className="bg-white p-4 rounded-xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]">
                <p className="text-gray-600">{user.userId}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">인증 토큰</h3>
              <div className="bg-white p-4 rounded-xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap break-all">
                  {user.token}
                </pre>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                * 추후 API 연동 시 더 자세한 회원 정보가 표시될 예정입니다.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile; 