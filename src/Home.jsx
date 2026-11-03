import React from 'react';

export default function Home({ onNavigate }) {
  return (
    <div>
      <section className="relative bg-white overflow-hidden py-20 md:py-32 rounded-b-[3rem] shadow-sm">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block py-2 px-4 rounded-full bg-abc-green/30 text-abc-dark text-sm font-black uppercase tracking-wider mb-6">Добро пожаловать!</span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-abc-dark">
                Раскрываем потенциал <span className="text-abc-blue">вашего ребенка</span> 🎈
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto md:mx-0 font-medium">
                Международный центр развития. Опытные специалисты, современные методики и море радости.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button onClick={() => onNavigate('services')} className="bg-abc-yellow hover:bg-yellow-300 text-abc-dark px-8 py-4 rounded-2xl font-black text-lg transition shadow-lg shadow-abc-yellow/40 hover:-translate-y-1">Наши услуги</button>
                <button onClick={() => onNavigate('specialists')} className="bg-abc-blue hover:bg-sky-300 text-abc-dark px-8 py-4 rounded-2xl font-black text-lg transition shadow-lg shadow-abc-blue/40 hover:-translate-y-1">Специалисты</button>
              </div>
            </div>
            <div className="flex-1 relative animate-float">
              <div className="absolute inset-0 bg-abc-yellow rounded-full blur-3xl opacity-20"></div>
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800" alt="Дети" className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}