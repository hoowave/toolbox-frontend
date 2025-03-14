import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router/Router';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="container mx-auto px-6 py-8 flex-grow">
            <AppRouter />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
