import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Home from './components/Home';
import Stats from './components/Stats';
import { getLongURL } from './services/urlService';
import { useEffect } from 'react';

function Redirector() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const longUrl = getLongURL(code);
      window.location.href = longUrl;
    } catch (error) {
      alert(error.message);
      navigate('/');
    }
  }, [code, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:code" element={<Redirector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
