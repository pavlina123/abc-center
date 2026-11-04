import React, { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Specialists from './Specialists';
import SpecialistPage from './SpecialistPage';
import Services from './Services';
import ServicePage from './ServicePage';
import News from './News';
import NewsPage from './NewsPage';
import Media from './Media';
import Login from './Login';
import AdminPanel from './AdminPanel';
import MediaPanel from './MediaPanel';
import { waLink, PHONE_DISPLAY, ADDRESS, INSTAGRAM_URL, WHATSAPP } from './theme';
import logo from './assets/logo.png';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  
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

  const openSpecialist = (spec) => { setSelectedSpecialist(spec); setCurrentPage('specialist-page'); window.scrollTo(0, 0); };
  const openService = (serv) => { setSelectedService(serv); setCurrentPage('service-page'); window.scrollTo(0, 0); };
  const openNews = (newsItem) => { setSelectedNews(newsItem); setCurrentPage('news-page'); window.scrollTo(0, 0); };

  if (user?.role === 'admin') return <AdminPanel user={user} onLogout={handleLogout} />;
  if (user?.role === 'media') return <MediaPanel user={user} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen bg-abc-bg text-abc-dark font-sans flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} onLoginClick={() => setShowLogin(true)} />
      
      <main className="animate-fade-in flex-1">
        {currentPage === 'home' && (
          <Home onOpenSpecialist={openSpecialist} onOpenService={openService} onOpenNews={openNews} />
        )}
        
        {currentPage === 'specialists' && <Specialists onOpenSpecialist={openSpecialist} />}
        {currentPage === 'services' && <Services onOpenService={openService} />}
        {currentPage === 'news' && <News onOpenNews={openNews} />}
        {currentPage === 'media' && <Media />}

        {currentPage === 'specialist-page' && selectedSpecialist && <SpecialistPage specialist={selectedSpecialist} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'service-page' && selectedService && <ServicePage service={selectedService} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'news-page' && selectedNews && <NewsPage newsItem={selectedNews} onBack={() => setCurrentPage('home')} />}
      </main>

      {/* =========================================
          КРАСИВЫЙ ПОДВАЛ (АДАПТИВНЫЙ)
      ========================================== */}
      <footer className="bg-white border-t border-abc-green/30 pt-12 pb-6 mt-auto relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-abc-green/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-abc-blue/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-10">
            
            {/* Логотип и описание */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
              <img src={logo} alt="Центр ABC" className="h-16 w-auto object-contain mb-4" />
              <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                Международный детский центр развития. Помогаем детям с РАС, ЗПР, СДВГ раскрыть свой потенциал.
              </p>
              <div className="flex gap-3 mt-5">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-abc-pink/10 flex items-center justify-center text-abc-pink hover:bg-abc-pink hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={waLink()} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-abc-green/10 flex items-center justify-center text-abc-green hover:bg-abc-green hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            {/* Две колонки на телефоне */}
            <div className="grid grid-cols-2 gap-6 md:flex md:gap-12 md:w-2/3 md:justify-end text-left">
              
              <div>
                <h4 className="font-black text-sm md:text-lg text-abc-dark mb-3">Разделы</h4>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    { id: 'home', label: 'Главная' },
                    { id: 'specialists', label: 'Специалисты' },
                    { id: 'services', label: 'Услуги' },
                    { id: 'news', label: 'Новости' },
                    { id: 'media', label: 'Медиа' },
                  ].map(item => (
                    <li key={item.id}>
                      <button onClick={() => setCurrentPage(item.id)} className="text-xs md:text-sm text-gray-500 font-bold hover:text-abc-blue transition">
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-black text-sm md:text-lg text-abc-dark mb-3">Контакты</h4>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="text-abc-blue text-sm md:text-xl">📍</span>
                    <span className="text-xs md:text-sm font-bold text-gray-600 leading-tight">{ADDRESS}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-abc-yellow text-sm md:text-xl">📞</span>
                    <a href={`tel:+${WHATSAPP}`} className="text-xs md:text-sm font-bold text-gray-600 hover:text-abc-blue transition">{PHONE_DISPLAY}</a>
                  </li>
                </ul>
                
                <div className="mt-6 md:mt-8">
                  <a href={waLink()} target="_blank" rel="noreferrer" className="inline-block bg-abc-green text-abc-dark px-4 py-2.5 rounded-xl font-black transition shadow-lg shadow-abc-green/30 hover:bg-green-400 w-full md:w-auto text-center text-xs md:text-sm">
                    Записаться
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex justify-center items-center">
            <p className="text-[10px] md:text-xs text-gray-400 font-bold text-center">
              © {new Date().getFullYear()} Международный центр развития ABC. Все права защищены.
            </p>
          </div>

        </div>
      </footer>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
    </div>
  );
}