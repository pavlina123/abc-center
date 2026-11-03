import React, { useState } from 'react';
import News from './News'; // <--- Добавили Новости
import { waLink } from './theme';

const helpItems = [
  { title: "Логопедия", desc: "Коррекция речи", icon: "🗣️" },
  { title: "Психология", desc: "Работа со страхами", icon: "🧠" },
  { title: "Подготовка", desc: "К школе", icon: "🎒" },
  { title: "Творчество", desc: "Развитие талантов", icon: "🎨" },
  { title: "Нейропсихология", desc: "Внимание и память", icon: "⚡" },
  { title: "Английский", desc: "Для детей", icon: "🇬🇧" }
];

export default function Home({ onOpenNews }) { // <--- Передали функцию для открытия новостей
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-white pt-10 pb-16 md:py-24 rounded-b-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block py-1.5 px-4 rounded-full bg-abc-green/30 text-abc-dark text-xs md:text-sm font-black uppercase tracking-wider mb-6 animate-float">Добро пожаловать!</span>
              <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4 md:mb-6 text-abc-dark">
                Раскрываем потенциал <span className="text-abc-blue">вашего ребенка</span> 🎈
              </h1>
              <p className="text-sm md:text-lg text-gray-500 mb-8 max-w-lg mx-auto md:mx-0 font-medium">
                Центр ABC — это международный центр развития. Мы объединили лучших специалистов и современные методики.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href={waLink()} target="_blank" rel="noreferrer" className="bg-abc-yellow hover:bg-yellow-300 text-abc-dark px-8 py-4 rounded-2xl font-black text-base md:text-lg transition shadow-lg shadow-abc-yellow/40 hover:-translate-y-1 animate-pulse">
                  Записаться на прием
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-[320px] md:max-w-xl mx-auto mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-abc-blue rounded-full blur-3xl opacity-20 transform scale-110"></div>
                <img 
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000" 
                  alt="Наш центр" 
                  className="rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 border-4 md:border-8 border-white w-full object-cover aspect-[4/3] md:aspect-video" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЧЕМ МЫ ПОМОГАЕМ */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="bg-abc-green/40 hover:bg-abc-green/60 text-abc-dark px-8 py-4 rounded-full font-black text-xl transition-all shadow-md flex items-center gap-3 mx-auto"
        >
          {showHelp ? 'Скрыть' : 'Чем мы помогаем?'} 
          <svg className={`w-6 h-6 transition-transform duration-300 ${showHelp ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        {showHelp && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-8">
            {helpItems.map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border border-abc-blue/20 animate-scale-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-4xl md:text-5xl mb-3">{item.icon}</div>
                <h3 className="font-black text-abc-dark text-sm md:text-lg mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ДОБАВИЛИ НОВОСТИ */}
      <section id="news">
        <News onOpenNews={onOpenNews} />
      </section>
    </div>
  );
}