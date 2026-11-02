import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('news').select('*').eq('status', 'published').order('created_at', { ascending: false });
      if (data) setNews(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-abc-navy mb-4">Новости и события</h1>
        <p className="text-gray-500">Будьте в курсе жизни нашего центра</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition">
            {item.cover_photo ? (
              <img src={item.cover_photo} alt="" className="w-full h-56 object-cover" />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-5xl">📰</div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-abc-gold uppercase mb-2">{new Date(item.created_at).toLocaleDateString('ru-RU')}</span>
              <h3 className="text-xl font-bold text-abc-navy mb-3 leading-tight">{item.title}</h3>
              <p className="text-gray-600 text-sm flex-1">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}