import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DropdownMenuProps {
  items: { label: string; to: string }[];
  isOpen: boolean;
}

const DropdownMenu = ({ items, isOpen }: DropdownMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg py-2 mt-6 z-50"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = {
    features: [
      { label: 'URL 줄이기', to: '/cut-url' },
      { label: 'API 테스트', to: '/apiTest' }
    ],
    notice: [
      { label: '공지사항', to: '/board' },
      { label: '문의하기', to: '/contact' },
      { label: 'FAQ', to: '/faq' }
    ],
    developer: [
      { label: '소개', to: '/about' },
      { label: '기술블로그', to: 'https://blog.example.com' },
      { label: 'Github', to: 'https://github.com' }
    ]
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const getMenuStyle = (menuName: string) => {
    const baseStyle = "font-medium transition-all duration-200";
    const activeStyle = activeDropdown === menuName 
      ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
      : "text-gray-800 hover:text-blue-600";
    return `${baseStyle} ${activeStyle}`;
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6">
        <div className="flex justify-center items-center h-16 space-x-16">
          <Link 
            to="/" 
            className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
          >
            홈
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('features')}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              to={menuItems.features[0].to}
              className={getMenuStyle('features')}
            >
              서비스
            </Link>
            <DropdownMenu items={menuItems.features} isOpen={activeDropdown === 'features'} />
          </div>

          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('notice')}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              to={menuItems.notice[0].to}
              className={getMenuStyle('notice')}
            >
              공지 및 문의
            </Link>
            <DropdownMenu items={menuItems.notice} isOpen={activeDropdown === 'notice'} />
          </div>

          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('developer')}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              to={menuItems.developer[0].to}
              className={getMenuStyle('developer')}
            >
              개발자
            </Link>
            <DropdownMenu items={menuItems.developer} isOpen={activeDropdown === 'developer'} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 