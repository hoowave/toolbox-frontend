import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { shortenUrl } from '../services/urlService';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import isURL from 'validator/lib/isURL';

const CutUrl = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(false);

  const validateUrl = useCallback((input: string) => {
    return isURL(input, {
      require_protocol: false,
      require_valid_protocol: true,
      protocols: ['http', 'https'],
      require_host: true,
      allow_underscores: true,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false
    });
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setIsValidUrl(validateUrl(newUrl));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !isValidUrl) return;

    setIsLoading(true);
    setShortUrl(null);
    
    try {
      const response = await shortenUrl({ originalUrl: url });
      
      setToast({
        type: response.responseType === 'SUCCESS' ? 'success' : 'error',
        message: response.message
      });

      if (response.responseType === 'SUCCESS' && response.data) {
        setShortUrl(response.data.transUrl);
        setUrl('');
        setIsValidUrl(false);
      }
    } catch (error) {
      setToast({
        type: 'error',
        message: '오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // 애니메이션 variants 정의
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
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
          URL 단축 서비스
        </motion.h1>
        <p className="text-gray-600">
          긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요.
        </p>
      </motion.div>

      {/* URL Input Form */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              단축할 URL 입력
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/very-long-url..."
                    className={`w-full px-4 h-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      url && !isValidUrl ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {url && !isValidUrl && (
                    <p className="absolute top-12 left-0 text-sm text-red-500">
                      올바른 URL 형식이 아닙니다
                    </p>
                  )}
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isLoading || !url || !isValidUrl}
                className={`px-6 h-11 rounded-lg text-white transition-colors shrink-0 ${
                  isLoading || !url || !isValidUrl
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                whileHover={!isLoading && url && isValidUrl ? { scale: 1.05 } : {}}
                whileTap={!isLoading && url && isValidUrl ? { scale: 0.95 } : {}}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {isLoading ? '처리중...' : '단축하기'}
              </motion.button>
            </div>
          </div>
        </form>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg"
          >
            <p className="text-sm text-gray-600 mb-2">변환된 URL:</p>
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {shortUrl}
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">주요 기능</h2>
          <motion.ul className="space-y-3 text-gray-600">
            {['긴 URL을 짧은 형태로 변환', '클릭 한 번으로 링크 복사', '광고 없는 깨끗한 리다이렉션'].map((feature, index) => (
              <motion.li 
                key={index}
                className="flex items-start space-x-2"
                variants={featureItemVariants}
                custom={index}
              >
                <span className="text-blue-600">•</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">사용 시 주의사항</h2>
          <motion.ul className="space-y-3 text-gray-600">
            {[
              '올바른 URL 형식을 입력해주세요',
              '악의적인 목적의 URL은 차단될 수 있습니다',
              '단축된 URL은 영구적으로 보관되지 않을 수 있습니다'
            ].map((warning, index) => (
              <motion.li 
                key={index}
                className="flex items-start space-x-2"
                variants={featureItemVariants}
                custom={index}
              >
                <span className="text-red-500">•</span>
                <span>{warning}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* How to Use Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg p-8"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-semibold mb-6">사용 방법</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "1️⃣", text: "변환하고 싶은 URL을 입력하세요" },
            { emoji: "2️⃣", text: "단축하기 버튼을 클릭하세요" },
            { emoji: "3️⃣", text: "생성된 단축 URL을 사용하세요" }
          ].map((step, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={featureItemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.5 }}
              >
                {step.emoji}
              </motion.div>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Toast toast={toast} />
    </motion.div>
  );
};

export default CutUrl; 