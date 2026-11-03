import React from 'react';
import { waLink } from './theme';

export default function Header({ currentPage, setCurrentPage, onLoginClick }) {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'specialists', label: 'Специалисты' },
    { id: 'services', label: 'Услуги' },
    { id: 'news', label: 'Новости' },
    { id: 'media', label: 'Медиа' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-abc-green/30">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-12 h-12 bg-abc-yellow rounded-2xl flex items-center justify-center text-2xl font-black shadow-md shadow-abc-yellow/50 rotate-3">🎈</div>
          <div>
            <h1 className="text-xl font-black text-abc-dark">Центр ABC</h1>
            <span className="text-[10px] text-abc-blue font-bold uppercase tracking-wider">Развитие детей</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`text-sm font-bold transition-all px-3 py-2 rounded-xl ${currentPage === item.id ? 'bg-abc-green text-abc-dark' : 'text-gray-500 hover:bg-abc-bg hover:text-abc-dark'}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={onLoginClick} className="p-2.5 text-gray-400 hover:text-abc-dark bg-white rounded-full shadow-sm hover:shadow-md transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>
          <a href={waLink()} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 bg-abc-yellow hover:bg-yellow-300 text-abc-dark px-6 py-3 rounded-2xl font-black text-sm transition shadow-lg shadow-abc-yellow/40 hover:-translate-y-1">
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}