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
import SignupTerms from '../pages/SignupTerms';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cut-url" element={<CutUrl />} />
      <Route path="/apiTest" element={<ApiTest />} />
      
      {/* Notice 라우트 */}
      <Route path="/notice">
        <Route index element={<Navigate to="/notice/1" replace />} />
        <Route path=":page" element={<Notice />} />
        <Route path="details/:id" element={<BoardDetail />} />
      </Route>
      
      {/* Contact 라우트 */}
      <Route path="/contact">
        <Route index element={<Navigate to="/contact/1" replace />} />
        <Route path=":page" element={<Contact />} />
        <Route path="details/:id" element={<BoardDetail />} />
        <Route path="write" element={<BoardWrite />} />
      </Route>

      <Route path="/faq" element={<Faq />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      
      {/* Signup 라우트 */}
      <Route path="/signup">
        <Route index element={<SignupTerms />} />
        <Route path="form" element={<SignUp />} />
        <Route path="success" element={<SignUpSuccess />} />
      </Route>

      <Route path="/profile" element={<Profile />} />

      {/* 404 페이지 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;