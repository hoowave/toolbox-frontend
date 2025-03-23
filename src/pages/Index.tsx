import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';

const ServiceSlide = ({ title, description, icon, link }: {
  title: string;
  description: string;
  icon: string;
  link: string;
}) => (
  <motion.div
    className="min-w-full px-4 md:px-8"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <Link to={link}>
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 h-[250px] md:h-[300px] flex flex-col items-center justify-center space-y-4 hover:shadow-xl transition-shadow">
        <div className="text-3xl md:text-4xl mb-2 md:mb-4">{icon}</div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 text-center max-w-md">{description}</p>
      </div>
    </Link>
  </motion.div>
);

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [review, setReview] = useState('');
  const [reviews] = useState([
    { id: 1, text: "URL 단축 서비스가 정말 편리해요!", date: "2024-03-15" },
    { id: 2, text: "API 테스트 도구가 직관적이고 사용하기 쉬워요.", date: "2024-03-14" }
  ]);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  
  const slides = [
    {
      title: "URL 단축 서비스",
      description: "긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 안전하고 신뢰할 수 있는 URL 단축 서비스를 제공합니다.",
      icon: "🔗",
      link: "/cut-url"
    },
    {
      title: "API 요청 테스트",
      description: "API 엔드포인트를 쉽고 빠르게 테스트해보세요. 다양한 HTTP 메소드와 파라미터를 지원합니다.",
      icon: "🔍",
      link: "/apiTest"
    },
    {
      title: "문의하기",
      description: "서비스 이용 중 궁금하신 점이나 불편사항이 있으시다면 언제든 문의해주세요.",
      icon: "✉️",
      link: "/contact"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast({
      type: 'error',
      message: '현재 개발 중인 기능입니다.'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-bold text-gray-800 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          Welcome to <span className="text-blue-600">ToolBox</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          누구나 필요한 서비스를, 누구나 쉽게 사용할 수 있도록.
        </motion.p>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          현재 베타 버전으로 운영중입니다. 기능이 정상적으로 작동하지 않을 수 있습니다.
        </motion.p>
      </motion.section>

      {/* Service Slider */}
      <motion.section 
        className="py-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <ServiceSlide key={index} {...slide} />
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="이전 슬라이드"
          >
            <span className="text-gray-600">←</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="다음 슬라이드"
          >
            <span className="text-gray-600">→</span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* Service Benefits */}
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-12 shadow-xl">
          <motion.div 
            className="max-w-3xl mx-auto space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="space-y-6">
              <motion.h2 
                className="text-3xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                간편한 사용
              </motion.h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  긴 URL 및 API 통신 테스트 시 필요한 서비스를 광고, 회원가입 없이 바로바로 사용해보세요.
                </p>
                <p className="text-lg leading-relaxed">
                  본 서비스는 어떠한 개인정보도 수집하지 않으며, 모든 기능을 익명으로 자유롭게 이용하실 수 있습니다.
                </p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-white/70">
                본 서비스를 사용함에 있어 모든 책임은 개인에게 있습니다.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">사용자 후기</h2>
          
          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="서비스 사용 후기를 남겨주세요"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={100}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                등록
              </button>
            </div>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">{review.text}</p>
                <p className="text-sm text-gray-500 mt-2">익명 - {review.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default Index; 