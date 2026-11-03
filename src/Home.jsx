import React from 'react';
import News from './News';
import Specialists from './Specialists';
import Services from './Services';
import Media from './Media';
import { waLink } from './theme';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. БЛОК О НАШЕМ ЦЕНТРЕ (Hero) */}
      <section className="relative bg-white overflow-hidden pt-10 pb-16 md:py-24 rounded-b-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
            
            {/* Текстовая часть */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block py-1.5 px-4 rounded-full bg-abc-green/30 text-abc-dark text-xs md:text-sm font-black uppercase tracking-wider mb-6">Добро пожаловать!</span>
              <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4 md:mb-6 text-abc-dark">
                Раскрываем потенциал <span className="text-abc-blue">вашего ребенка</span> 🎈
              </h1>
              <p className="text-sm md:text-lg text-gray-500 mb-8 max-w-lg mx-auto md:mx-0 font-medium">
                Центр ABC — это международный центр развития. Мы объединили лучших специалистов и современные методики, чтобы каждый ребенок рос счастливым и уверенным в себе.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href={waLink()} target="_blank" rel="noreferrer" className="bg-abc-yellow hover:bg-yellow-300 text-abc-dark px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-black text-base md:text-lg transition shadow-lg shadow-abc-yellow/40 hover:-translate-y-1">
                  Записаться на прием
                </a>
                <a href="#services" className="bg-white border-2 border-abc-blue text-abc-blue hover:bg-abc-blue/10 px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-black text-base md:text-lg transition">
                  Узнать об услугах
                </a>
              </div>
            </div>

            {/* Фото (уменьшено для телефона) */}
            <div className="flex-1 relative w-full max-w-[280px] md:max-w-md mx-auto mb-6 md:mb-0">
              <div className="absolute inset-0 bg-abc-yellow rounded-full blur-3xl opacity-30 transform scale-110"></div>
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800" 
                alt="Наш центр" 
                className="rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 border-4 md:border-8 border-white w-full object-cover aspect-square" 
              />
              <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 animate-float">
                <p className="text-abc-dark font-black text-sm md:text-lg">100% 💖</p>
                <p className="text-[10px] md:text-xs text-gray-500 font-bold">Счастливые дети</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. НАШИ НОВОСТИ */}
      <section id="news">
        <News />
      </section>

      {/* 3. НАШИ СПЕЦИАЛИСТЫ */}
      <section id="specialists">
        <Specialists />
      </section>

      {/* 4. НАШИ УСЛУГИ */}
      <section id="services">
        <Services />
      </section>

      {/* 5. МЕДИА (Видео) */}
      <section id="media">
        <Media />
      </section>
    </div>
  );
}