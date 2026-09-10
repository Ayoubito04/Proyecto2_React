import './App.css';
import Header from './components/Header/Header.jsx';
import Aside from './components/Aside/Aside.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './components/main/main.jsx';
import useScrollReveal from './hooks/useScrollReveal.js';

function App() {
  // Activa la aparición progresiva de los bloques marcados con data-reveal
  useScrollReveal();

  return (
    <>
      <Header />
      <div className="page_layout">
        <Aside />
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App;
