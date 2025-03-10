import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* About Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About ToolBox</h3>
            <p className="text-gray-600 text-sm">
              누구나 필요한 서비스를 쉽고 안전하게<br />
              사용할 수 있도록 제공하는 플랫폼입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/cut-url" 
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  URL 단축
                </Link>
              </li>
              <li>
                <Link 
                  to="/apiTest" 
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  API 테스트
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  개발자 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center justify-center">
                <span>📧</span>
                <a href="mailto:tkdgns519@gmail.com" className="hover:text-blue-600 transition-colors ml-2">
                  Email
                </a>
              </li>
              <li className="flex items-center justify-center">
                <span>💻</span>
                <a 
                  href="https://github.com/hoowave" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors ml-2"
                >
                  GitHub
                </a>
              </li>
              <li className="flex items-center justify-center">
                <span>📝</span>
                <a 
                  href="https://hoowave.tistory.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors ml-2"
                >
                  Tech Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="text-center pt-8 mt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600 text-sm">
            © {currentYear} ToolBox by <span className="text-blue-600">hoowave</span>. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            본 서비스는 개인 포트폴리오 용도로 제작되었습니다.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 