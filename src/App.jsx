import React, { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Specialists from './Specialists';
import SpecialistPage from './SpecialistPage';
import Services from './Services';
import ServicePage from './ServicePage'; // Новая страница для услуг
import News from './News';
import NewsPage from './NewsPage'; // Новая страница для новостей
import Media from './Media';
import Login from './Login';
import AdminPanel from './AdminPanel';
import MediaPanel from './MediaPanel';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  
  // Стейты для открытия конкретных карточек
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('abc_role');
    const savedCode = localStorage.getItem('abc_code');
    const savedName = localStorage.getItem('abc_name');
    if (savedRole && savedCode) setUser({ role: savedRole, code: savedCode, name: savedName });
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

  // Функции для перехода
  const openSpecialist = (spec) => { setSelectedSpecialist(spec); setCurrentPage('specialist-page'); window.scrollTo(0, 0); };
  const openService = (serv) => { setSelectedService(serv); setCurrentPage('service-page'); window.scrollTo(0, 0); };
  const openNews = (newsItem) => { setSelectedNews(newsItem); setCurrentPage('news-page'); window.scrollTo(0, 0); };

  if (user?.role === 'admin') return <AdminPanel user={user} onLogout={handleLogout} />;
  if (user?.role === 'media') return <MediaPanel user={user} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen bg-abc-bg text-abc-dark font-sans">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} onLoginClick={() => setShowLogin(true)} />
      
      <main className="animate-fade-in">
        {currentPage === 'home' && (
          <Home 
            onOpenSpecialist={openSpecialist} 
            onOpenService={openService} 
            onOpenNews={openNews} 
          />
        )}
        
        {currentPage === 'specialists' && <Specialists onOpenSpecialist={openSpecialist} />}
        {currentPage === 'services' && <Services onOpenService={openService} />}
        {currentPage === 'news' && <News onOpenNews={openNews} />}
        {currentPage === 'media' && <Media />}

        {/* Отдельные страницы */}
        {currentPage === 'specialist-page' && selectedSpecialist && <SpecialistPage specialist={selectedSpecialist} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'service-page' && selectedService && <ServicePage service={selectedService} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'news-page' && selectedNews && <NewsPage newsItem={selectedNews} onBack={() => setCurrentPage('home')} />}
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