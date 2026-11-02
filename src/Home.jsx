import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Home({ onNavigate }) {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase.from('news').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(3);
      if (data) setLatestNews(data);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <section className="relative bg-abc-navy text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-abc-navy via-abc-navy/90 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-abc-gold/20 text-abc-goldLight text-xs font-bold uppercase tracking-wider mb-6 border border-abc-gold/30">Добро пожаловать в центр ABC</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">Раскрываем потенциал <span className="text-abc-goldLight">вашего ребенка</span></h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">Международный центр развития. Опытные специалисты, современные методики и индивидуальный подход к каждому.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('services')} className="bg-abc-gold hover:bg-abc-goldLight text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl hover:-translate-y-1">Наши услуги</button>
              <button onClick={() => onNavigate('specialists')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition">Наши специалисты</button>
            </div>
          </div>
        </div>
      </section>

      {/* Последние новости */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-abc-navy">Последние новости</h2>
            <p className="text-gray-500 mt-2">Что нового происходит в нашем центре</p>
          </div>
          <button onClick={() => onNavigate('news')} className="hidden md:block text-abc-blue font-bold hover:underline">Все новости →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map(news => (
            <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition">
              {news.cover_photo ? (
                <img src={news.cover_photo} alt="" className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-4xl">📰</div>
              )}
              <div className="p-6">
                <span className="text-xs font-bold text-abc-gold uppercase">{new Date(news.created_at).toLocaleDateString()}</span>
                <h3 className="text-xl font-bold mt-2 mb-2 line-clamp-2">{news.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3">{news.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}