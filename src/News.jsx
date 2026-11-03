import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function News() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('news').select('*').eq('status', 'published').order('created_at', { ascending: false });
      if (data) setNews(data);
    };
    fetchData();
  }, []);

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-abc-dark mb-4">Новости и события</h1>
        <p className="text-gray-500 font-medium">Жизнь нашего центра в фотографиях и историях.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map(item => (
          <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-abc-blue/20 group hover:shadow-2xl transition duration-300">
            <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setSelectedNews(item)}>
              {item.cover_photo ? (
                <img src={item.cover_photo} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-abc-bg flex items-center justify-center text-5xl">📰</div>
              )}
            </div>
            <div className="p-6">
              <span className="text-xs font-black text-abc-blue uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString('ru-RU')}</span>
              <h3 className="text-xl font-black text-abc-dark mt-2 mb-3 line-clamp-2">{item.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3">{item.content}</p>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <button onClick={() => setSelectedNews(item)} className="text-abc-dark font-black text-sm hover:text-abc-blue transition">Читать далее →</button>
                <button onClick={() => handleLike(item.id)} className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  <span className="text-xs font-bold">{likes[item.id] || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модалка новости */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] bg-abc-dark/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedNews(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
            {selectedNews.cover_photo && <img src={selectedNews.cover_photo} className="w-full h-64 object-cover" />}
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-black text-abc-blue bg-abc-bg px-3 py-1 rounded-full">{new Date(selectedNews.created_at).toLocaleDateString('ru-RU')}</span>
                <button onClick={() => setSelectedNews(null)} className="text-gray-400 hover:text-red-500 bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-abc-dark mb-4">{selectedNews.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}