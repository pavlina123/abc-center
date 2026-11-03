import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function News({ onOpenNews }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('news').select('*').eq('status', 'published').order('created_at', { ascending: false });
      if (data) setNews(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-abc-dark mb-4">Наши новости</h1>
        <p className="text-gray-500 font-medium">Интересные события и жизнь центра.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {news.map(item => (
          <div key={item.id} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-abc-blue/20 flex flex-col">
            <div className="relative h-32 md:h-56 overflow-hidden cursor-pointer" onClick={() => onOpenNews(item)}>
              {item.cover_photo ? (
                <img src={item.cover_photo} alt="" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-abc-bg flex items-center justify-center text-4xl">📰</div>
              )}
            </div>
            <div className="p-3 md:p-5 flex flex-col flex-1">
              <span className="text-[10px] md:text-xs font-black text-abc-blue uppercase">{new Date(item.created_at).toLocaleDateString('ru-RU')}</span>
              <h3 className="text-sm md:text-xl font-black text-abc-dark mt-1 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-[10px] md:text-sm text-gray-500 line-clamp-3 mb-3 text-paragraphs">{item.content}</p>
              <button onClick={() => onOpenNews(item)} className="mt-auto text-abc-dark font-black text-xs md:text-sm hover:text-abc-blue transition text-left">
                Читать далее →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}