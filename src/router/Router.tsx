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

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cut-url" element={<CutUrl />} />
      <Route path="/apiTest" element={<ApiTest />} />
      
      {/* Notice 라우트 */}
      <Route path="/notice" element={<Navigate to="/notice/page/1" replace />} />
      <Route path="/notice/page/:page" element={<Notice />} />
      
      {/* Contact 라우트 */}
      <Route path="/contact" element={<Navigate to="/contact/page/1" replace />} />
      <Route path="/contact/page/:page" element={<Contact />} />

      {/* 게시글 상세 라우트 */}
      <Route path="/boards/:id" element={<BoardDetail />} />

      <Route path="/faq" element={<Faq />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/success" element={<SignUpSuccess />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Router;