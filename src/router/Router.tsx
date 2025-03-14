import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import CutUrl from '../pages/CutUrl';
import ApiTest from '../pages/ApiTest';
import Board from '../pages/Board';
import About from '../pages/About';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import Profile from '../pages/Profile';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cut-url" element={<CutUrl />} />
      <Route path="/apiTest" element={<ApiTest />} />
      <Route path="/board" element={<Board />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/success" element={<SignUpSuccess />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Router;