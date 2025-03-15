import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-gray-600">
          요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound; 