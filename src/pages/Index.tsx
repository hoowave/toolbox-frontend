import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import { ToastMessage } from '../types/api';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAuth } from '../contexts/AuthContext';
import { reviewService, Review } from '../services/reviewService';

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
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [review, setReview] = useState('');
  const [star, setStar] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = async (page: number) => {
    try {
      const response = await reviewService.getReviews(page);
      setReviews(response.data.content);
      setTotalPages(response.data.totalPageNumber);
    } catch (error) {
      console.error('리뷰 목록을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (star === 0) {
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewService.createReview({
        author: user?.userId || "",
        content: review,
        star: star
      });
      
      setReview('');
      setStar(0);
      setToast({
        type: 'success',
        message: '리뷰가 등록되었습니다.'
      });
      fetchReviews(1); // 첫 페이지로 돌아가서 새로고침
    } catch (error) {
      console.error('리뷰 작성 중 오류가 발생했습니다:', error);
      setToast({
        type: 'error',
        message: '리뷰 등록에 실패했습니다.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    return `${year}-${month}-${day} ${hour}:${minute}`;
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
          <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                별점
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    className={`cursor-pointer text-2xl ${
                      value <= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setStar(value)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="서비스 사용 후기를 남겨주세요"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={20}
                  minLength={3}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '등록 중...' : '등록'}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                최소 3글자 이상, 최대 20글자까지 입력 가능합니다.
              </p>
              <p className="text-sm text-gray-500">
                비회원도 작성 가능합니다.
              </p>
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
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        className={`${
                          value <= review.star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {review.author === "" ? "비회원" : review.author} - {formatDate(review.createdAt)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={`page-${page}`}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </motion.section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200"
        overlayClassName="fixed inset-0 bg-gray-100/50 backdrop-blur-sm transition-opacity duration-300"
        closeTimeoutMS={300}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">별점을 주시면 더 좋습니다!</h2>
          <p className="mb-6 text-gray-600">
            별점을 주시면 다른 사용자들에게 더 도움이 될 수 있습니다.
            지금 별점을 선택해주세요.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  className={`cursor-pointer text-3xl ${
                    value <= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setStar(value)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              취소
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                handleReviewSubmit(new Event('submit') as any);
              }}
              disabled={star === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              등록
            </button>
          </div>
        </motion.div>
      </Modal>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default Index; 