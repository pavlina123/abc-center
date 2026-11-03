import React, { useState } from 'react';
import News from './News';
import Specialists from './Specialists';
import Services from './Services';
import Media from './Media';
import { waLink } from './theme';
import heroVideo from './assets/hero.mp4'; // <--- Подключаем твое видео

const helpItems = [
  { title: "Логопедия", desc: "Коррекция речи", icon: "🗣️", color: "bg-abc-green" },
  { title: "Психология", desc: "Работа со страхами", icon: "🧠", color: "bg-abc-blue" },
  { title: "Подготовка", desc: "К школе", icon: "🎒", color: "bg-abc-yellow" },
  { title: "Творчество", desc: "Развитие талантов", icon: "🎨", color: "bg-abc-mango" },
  { title: "Нейропсихология", desc: "Внимание и память", icon: "⚡", color: "bg-abc-pink" },
  { title: "Английский", desc: "Для детей", icon: "🇬🇧", color: "bg-abc-lilac" }
];

export default function Home({ onOpenSpecialist, onOpenService, onOpenNews }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden bg-puzzle-pattern">
      
      {/* HERO SECTION С ВИДЕО */}
      <section className="relative bg-white/80 backdrop-blur-sm pt-10 pb-16 md:py-24 rounded-b-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            
            {/* Текстовая часть */}
            <div className="flex-1 text-center md:text-left relative">
              <div className="absolute -top-10 -left-6 text-5xl animate-float hidden md:block">☀️</div>
              
              <span className="inline-block py-1.5 px-4 rounded-full bg-abc-green/20 text-abc-dark text-xs md:text-sm font-black uppercase tracking-wider mb-6">Международный центр развития</span>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6 text-abc-dark">
                Помогаем детям раскрыть <span className="text-abc-blue">свой потенциал</span> 🎈
              </h1>
              
              <p className="text-sm md:text-lg text-gray-600 mb-6 max-w-lg mx-auto md:mx-0 font-medium">
                Комплексная поддержка в обучении и развитии. Научно обоснованные подходы, ABA-терапия и индивидуальный уход для каждого ребенка.
              </p>

              {/* Бейджики */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-abc-dark"><span className="text-abc-green">✔</span> Опытные специалисты</span>
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-abc-dark"><span className="text-abc-green">✔</span> ABA-терапия</span>
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-abc-dark"><span className="text-abc-green">✔</span> Индивидуальный подход</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href={waLink()} target="_blank" rel="noreferrer" className="bg-abc-yellow hover:bg-yellow-400 text-abc-dark px-8 py-4 rounded-2xl font-black text-base md:text-lg transition shadow-lg shadow-abc-yellow/40 hover:-translate-y-1 animate-pulse">
                  Записаться на консультацию
                </a>
              </div>
            </div>
            
            {/* ВИДЕО ВМЕСТО ФОТО */}
            <div className="flex-1 w-full max-w-[320px] md:max-w-xl mx-auto mb-6 md:mb-0 relative">
              <div className="absolute -top-6 -right-4 text-5xl animate-float hidden md:block" style={{ animationDelay: '1s' }}>☁️</div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-abc-blue rounded-full blur-3xl opacity-20 transform scale-110"></div>
                
                {/* Тут тег video */}
                <video 
                  src={heroVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
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
          className="bg-abc-yellow hover:bg-yellow-400 text-abc-dark px-8 py-4 rounded-full font-black text-xl transition-all shadow-md flex items-center gap-3 mx-auto"
        >
          {showHelp ? 'Скрыть' : 'Чем мы помогаем?'} 
          <svg className={`w-6 h-6 transition-transform duration-300 ${showHelp ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        {showHelp && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-8">
            {helpItems.map((item, i) => (
              <div 
                key={i} 
                className={`${item.color} p-4 md:p-6 rounded-3xl shadow-lg border-b-4 border-black/10 animate-bounce-in flex flex-col items-center justify-center text-center`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl mb-3 bg-white/40 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">{item.icon}</div>
                <h3 className="font-black text-abc-dark text-sm md:text-lg mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-abc-dark/80 font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="news"><News onOpenNews={onOpenNews} /></section>
      <section id="specialists"><Specialists onOpenSpecialist={onOpenSpecialist} /></section>
      <section id="services"><Services onOpenService={onOpenService} /></section>
      <section id="media"><Media /></section>
    </div>
  );
}