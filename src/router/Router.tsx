import { Routes, Route, Navigate } from 'react-router-dom';
import Index from '../pages/Index';
import CutUrl from '../pages/CutUrl';
import ApiTest from '../pages/ApiTest';
import About from '../pages/About';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import Profile from '../pages/Profile';
import Notice from '../pages/Notice';
import Contact from '../pages/Contact';
import Faq from '../pages/FAQ';
import BoardDetail from '../pages/BoardDetail';
import NotFound from '../pages/NotFound';
import BoardWrite from '../pages/BoardWrite';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cut-url" element={<CutUrl />} />
      <Route path="/apiTest" element={<ApiTest />} />
      
      {/* Notice 라우트 */}
      <Route path="/notice" element={<Navigate to="/notice/1" replace />} />
      <Route path="/notice/:page" element={<Notice />} />
      <Route path="/notice/details/:id" element={<BoardDetail />} />
      
      {/* Contact 라우트 */}
      <Route path="/contact" element={<Navigate to="/contact/1" replace />} />
      <Route path="/contact/:page" element={<Contact />} />
      <Route path="/contact/details/:id" element={<BoardDetail />} />
      <Route path="/contact/write" element={<BoardWrite />} />

      <Route path="/faq" element={<Faq />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/success" element={<SignUpSuccess />} />
      <Route path="/profile" element={<Profile />} />

      {/* 404 페이지 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;