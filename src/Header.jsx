import React from 'react';
import { waLink } from './theme';

export default function Header({ currentPage, setCurrentPage, onLoginClick }) {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'specialists', label: 'Специалисты' },
    { id: 'services', label: 'Услуги' },
    { id: 'news', label: 'Новости' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-abc-blue text-abc-goldLight rounded-lg flex items-center justify-center text-xl font-display font-bold shadow-lg">ABC</div>
          <div>
            <h1 className="text-lg font-display font-bold text-abc-navy leading-none">Центр ABC</h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Международный центр</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`text-sm font-semibold transition-all relative ${currentPage === item.id ? 'text-abc-blue' : 'text-gray-600 hover:text-abc-blue'}`}>
              {item.label}
              {currentPage === item.id && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-abc-gold rounded-full"></span>}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={onLoginClick} className="p-2 text-gray-400 hover:text-abc-blue transition" title="Вход для персонала">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>
          <a href={waLink()} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 bg-abc-blue hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-lg hover:shadow-xl">Записаться</a>
        </div>
      </div>
    </header>
  );
}