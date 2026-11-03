import React, { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Specialists from './Specialists';
import Services from './Services';
import News from './News';
import Media from './Media';
import Login from './Login';
import AdminPanel from './AdminPanel';
import MediaPanel from './MediaPanel';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('abc_role');
    const savedCode = localStorage.getItem('abc_code');
    const savedName = localStorage.getItem('abc_name');
    if (savedRole && savedCode) {
      setUser({ role: savedRole, code: savedCode, name: savedName });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('abc_role', userData.role);
    localStorage.setItem('abc_code', userData.code);
    localStorage.setItem('abc_name', userData.name);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('abc_role');
    localStorage.removeItem('abc_code');
    localStorage.removeItem('abc_name');
    setCurrentPage('home');
  };

  if (user?.role === 'admin') return <AdminPanel user={user} onLogout={handleLogout} />;
  if (user?.role === 'media') return <MediaPanel user={user} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen bg-abc-bg text-abc-dark font-sans">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} onLoginClick={() => setShowLogin(true)} />
      
      <main className="animate-fade-in">
        {/* Главная страница теперь содержит ВСЕ секции */}
        {currentPage === 'home' && <Home />}
        
        {/* Оставляем отдельные страницы для ПК-навигации */}
        {currentPage === 'specialists' && <Specialists />}
        {currentPage === 'services' && <Services />}
        {currentPage === 'news' && <News />}
        {currentPage === 'media' && <Media />}
      </main>

      <footer className="bg-white border-t border-abc-green/30 py-12 text-center mt-12">
        <h3 className="text-3xl font-black text-abc-dark mb-2">Центр ABC</h3>
        <p className="text-gray-500 font-bold">Международный центр развития</p>
        <p className="text-xs text-gray-400 mt-6">© 2026 Все права защищены</p>
      </footer>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
    </div>
  );
}