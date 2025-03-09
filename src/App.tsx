import './App.css'
import Router from './router/Router';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <div className="App">
	<Router />
	<ScrollToTop />
    </div>
  );
};

export default App;
