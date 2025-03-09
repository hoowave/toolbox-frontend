import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getTestData, postTestData } from '../services/apiTestService';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import { GetTestResponse, PostTestResponse } from '../types/apiTest';

const ApiTest = () => {
  const [getId, setGetId] = useState('1');
  const [postData, setPostData] = useState('{\n  "responseData": {\n    "key": "value"\n  }\n}');
  const [getResult, setGetResult] = useState<GetTestResponse | null>(null);
  const [postResult, setPostResult] = useState<PostTestResponse | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isGetDocsOpen, setIsGetDocsOpen] = useState(false);
  const [isPostDocsOpen, setIsPostDocsOpen] = useState(false);

  const handleGetTest = async () => {
    setIsLoading(true);
    try {
      const response = await getTestData(Number(getId));
      setGetResult(response);
      setToast({
        type: response.responseType === 'SUCCESS' ? 'success' : 'error',
        message: response.message
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: '요청 처리 중 오류가 발생했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostTest = async () => {
    setIsLoading(true);
    try {
      const requestData = JSON.parse(postData);
      const response = await postTestData(requestData);
      setPostResult(response);
      setToast({
        type: response.responseType === 'SUCCESS' ? 'success' : 'error',
        message: response.message
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: '요청 처리 중 오류가 발생했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title Section */}
      <motion.div
        className="text-center mb-12"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          API 테스트
        </motion.h1>
        <p className="text-gray-600">
          간단한 GET/POST 요청을 테스트해보세요.
        </p>
      </motion.div>

      {/* API Documentation */}
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        variants={itemVariants}
      >
        <button
          onClick={() => setIsDocsOpen(!isDocsOpen)}
          className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-800">API 명세서</h2>
          <motion.span
            animate={{ rotate: isDocsOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl"
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {isDocsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 space-y-6">
                {/* GET Documentation */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsGetDocsOpen(!isGetDocsOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-700">GET 요청</h3>
                    <motion.span
                      animate={{ rotate: isGetDocsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isGetDocsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-white">
                          <p className="text-sm font-medium text-gray-600 mb-2">Endpoint:</p>
                          <code className="block bg-gray-800 text-white p-2 rounded">
                            GET /api-test/{'{1-10}'}
                          </code>
                          <p className="text-sm font-medium text-gray-600 mt-4 mb-2">Response:</p>
                          <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
{`{
  "responseType": "SUCCESS",
  "data": {
    "id": 1,
    "name": "bbororo",
    "age": 20,
    "gender": "male"
  },
  "message": "GET 요청이 완료되었습니다."
}`}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* POST Documentation */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsPostDocsOpen(!isPostDocsOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-700">POST 요청</h3>
                    <motion.span
                      animate={{ rotate: isPostDocsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isPostDocsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-white">
                          <p className="text-sm font-medium text-gray-600 mb-2">Endpoint:</p>
                          <code className="block bg-gray-800 text-white p-2 rounded">
                            POST /api-test
                          </code>
                          <p className="text-sm font-medium text-gray-600 mt-4 mb-2">Request Body:</p>
                          <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
{`{
  "responseData": {
    "key": "value"
  }
}`}
                          </pre>
                          <p className="text-sm font-medium text-gray-600 mt-4 mb-2">Response:</p>
                          <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
{`{
  "responseType": "SUCCESS",
  "data": {
    "responseData": {
      "key": "value"
    }
  },
  "message": "POST 요청이 완료되었습니다."
}`}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Test Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        {/* GET Test */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">GET 테스트</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="getId" className="block text-sm font-medium text-gray-700 mb-2">
                ID 입력 (1-10)
              </label>
              <input
                type="number"
                id="getId"
                min="1"
                max="10"
                value={getId}
                onChange={(e) => setGetId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleGetTest}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg text-white ${
                isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? '요청 중...' : 'GET 요청 보내기'}
            </button>
            {getResult && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">응답 결과:</p>
                <pre className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(getResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </motion.div>

        {/* POST Test */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">POST 테스트</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="postData" className="block text-sm font-medium text-gray-700 mb-2">
                요청 데이터 (JSON)
              </label>
              <textarea
                id="postData"
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <button
              onClick={handlePostTest}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg text-white ${
                isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? '요청 중...' : 'POST 요청 보내기'}
            </button>
            {postResult && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">응답 결과:</p>
                <pre className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(postResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <Toast toast={toast} onClose={handleCloseToast} />
    </motion.div>
  );
};

export default ApiTest; 