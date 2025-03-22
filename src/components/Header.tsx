import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface DropdownMenuProps {
  items: { label: string; to?: string; onClick?: () => void }[];
  isOpen: boolean;
}

const DropdownMenu = ({ items, isOpen }: DropdownMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.1 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg py-2 mt-2 z-50"
        >
          {items.map((item, index) => (
            item.to ? (
              <Link
                key={index}
                to={item.to}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {item.label}
              </button>
            )
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const menuItems = {
    features: [
      { label: 'URL 줄이기', to: '/cut-url' },
      { label: 'API 테스트', to: '/apiTest' }
    ],
    notice: [
      { label: '공지사항', to: '/notice' },
      { label: '문의하기', to: '/contact' },
      { label: 'FAQ', to: '/faq' }
    ],
    developer: [
      { label: '소개', to: '/about' },
      { label: '기술블로그', to: 'https://github.com/hoowave' },
      { label: 'Github', to: 'https://github.com/hoowave' }
    ],
    user: [
      { label: '프로필', to: '/profile' },
      { label: '로그아웃', onClick: () => handleLogout() }
    ]
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const getMenuStyle = (menuName: string) => {
    const baseStyle = "font-medium transition-all duration-100";
    const activeStyle = activeDropdown === menuName 
      ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
      : "text-gray-800 hover:text-blue-600";
    return `${baseStyle} ${activeStyle}`;
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-2 sm:py-0">
          <div className="hidden sm:block sm:w-1/5"></div>

          <div className="flex items-center justify-center space-x-4 sm:space-x-8 lg:space-x-16 flex-1 w-full sm:w-auto order-2 sm:order-none">
            <div 
              className="relative px-2 sm:px-4 py-2 sm:py-4 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/"
                className={`${getMenuStyle('home')} block py-2 text-sm sm:text-base`}
              >
                홈
              </Link>
            </div>

            <div 
              className="relative px-2 sm:px-4 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('features')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to={menuItems.features[0].to}
                className={`${getMenuStyle('features')} block py-2 text-sm sm:text-base`}
              >
                서비스
              </Link>
              <DropdownMenu items={menuItems.features} isOpen={activeDropdown === 'features'} />
            </div>

            <div 
              className="relative px-2 sm:px-4 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('notice')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to={menuItems.notice[0].to}
                className={`${getMenuStyle('notice')} block py-2 text-sm sm:text-base whitespace-nowrap`}
              >
                공지 및 문의
              </Link>
              <DropdownMenu items={menuItems.notice} isOpen={activeDropdown === 'notice'} />
            </div>

            <div 
              className="relative px-2 sm:px-4 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('developer')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to={menuItems.developer[0].to}
                className={`${getMenuStyle('developer')} block py-2 text-sm sm:text-base`}
              >
                개발자
              </Link>
              <DropdownMenu items={menuItems.developer} isOpen={activeDropdown === 'developer'} />
            </div>
          </div>

          <div className="flex items-center justify-end w-full sm:w-1/5 order-1 sm:order-none mb-2 sm:mb-0">
            {user ? (
              <div
                className="relative px-2 sm:px-4 cursor-pointer"
                onMouseEnter={() => handleMouseEnter('user')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Link 
                    to="/profile"
                    className="px-2 sm:px-4 py-2 text-gray-800 hover:text-blue-600 font-medium transition-colors text-sm sm:text-base"
                  >
                    {user.userId}님
                    {user.role === 'ADMIN' && (
                      <span className="ml-1 text-xs text-blue-600">(관리자)</span>
                    )}
                  </Link>
                  <button 
                    className="p-1 sm:p-2 text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  >
                    <svg 
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-100 ${activeDropdown === 'user' ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <DropdownMenu items={menuItems.user} isOpen={activeDropdown === 'user'} />
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4 px-2 sm:px-4">
                <Link
                  to="/signup"
                  className="px-3 py-1 sm:px-4 sm:py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
                >
                  회원가입
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm sm:text-base"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 