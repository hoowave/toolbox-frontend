import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import CutUrl from '../pages/CutUrl';
import ApiTest from '../pages/ApiTest';
import Board from '../pages/Board';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../pages/About';

const Router = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="container mx-auto px-6 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cut-url" element={<CutUrl />} />
            <Route path="/apiTest" element={<ApiTest />} />
            <Route path="/board" element={<Board />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Router;