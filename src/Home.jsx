import React from 'react';
import News from './News';
import Specialists from './Specialists';
import Services from './Services';
import Media from './Media';
import { waLink } from './theme';

export default function Home({ onOpenSpecialist, onOpenService, onOpenNews }) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-10 pb-16 md:py-24 rounded-b-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
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
            <div className="flex-1 relative w-full max-w-[280px] md:max-w-md mx-auto mb-6 md:mb-0">
              <div className="absolute inset-0 bg-abc-yellow rounded-full blur-3xl opacity-30 transform scale-110"></div>
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800" alt="Наш центр" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 border-4 md:border-8 border-white w-full object-cover aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* Секции с передачей функций */}
      <section id="news"><News onOpenNews={onOpenNews} /></section>
      <section id="specialists"><Specialists onOpenSpecialist={onOpenSpecialist} /></section>
      <section id="services"><Services onOpenService={onOpenService} /></section>
      <section id="media"><Media /></section>
    </div>
  );
}