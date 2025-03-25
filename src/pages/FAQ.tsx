import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: 'URL 단축',
      question: 'URL 단축 서비스는 어떻게 사용하나요?',
      answer: '메인 메뉴에서 "URL 단축" 서비스를 선택한 후, 단축하고 싶은 URL을 입력하시면 됩니다. 변환된 URL은 즉시 사용 가능하며, 클립보드에 자동으로 복사됩니다.'
    },
    {
      id: 2,
      category: 'URL 단축',
      question: '단축된 URL의 유효기간은 얼마인가요?',
      answer: '단축된 URL은 생성일로부터 1년간 유효합니다. 1년 이후에는 자동으로 만료되며, 필요한 경우 새로운 URL을 생성하셔야 합니다.'
    },
    {
      id: 3,
      category: 'API 테스트',
      question: 'API 테스트 도구는 어떤 HTTP 메소드를 지원하나요?',
      answer: 'GET, POST, PUT, DELETE 등 주요 HTTP 메소드를 모두 지원합니다. 각 메소드별로 헤더, 파라미터, 바디 등을 설정할 수 있습니다.'
    },
    {
      id: 4,
      category: 'API 테스트',
      question: 'API 응답 결과는 어떻게 확인하나요?',
      answer: '요청 후 받은 응답은 상태 코드, 헤더, 바디 등 상세한 정보와 함께 화면에 표시됩니다. JSON 형식의 응답은 자동으로 포맷팅되어 보기 쉽게 표시됩니다.'
    },
    {
      id: 5,
      category: '계정',
      question: '회원가입은 필수인가요?',
      answer: '기본적인 URL 단축과 API 테스트는 회원가입 없이 이용 가능합니다. 다만, 히스토리 저장, 자주 사용하는 API 저장 등의 추가 기능을 사용하시려면 회원가입이 필요합니다.'
    },
    {
      id: 6,
      category: '계정',
      question: '비밀번호를 잊어버렸어요.',
      answer: '로그인 페이지에서 "비밀번호 찾기" 버튼을 클릭하시면, 가입 시 등록한 이메일로 비밀번호 재설정 링크를 받으실 수 있습니다.'
    }
  ];

  const categories = ['전체', ...new Set(faqItems.map(item => item.category))];
  
  const filteredItems = activeCategory === '전체' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const handleToggle = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">자주 묻는 질문</h1>
        <p className="mt-2 text-gray-600">ToolBox 서비스 이용에 대한 궁금증을 해결하세요</p>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]'
                : 'bg-white text-gray-700 shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ 아이템 */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={false}
            className="bg-white rounded-xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] overflow-hidden"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] transition-all duration-200"
            >
              <span className="text-left font-medium text-gray-900">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: activeId === item.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {activeId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200"
                >
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ; 