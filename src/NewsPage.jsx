import React from 'react';

export default function NewsPage({ newsItem, onBack }) {
  if (!newsItem) return null;

  return (
    <div className="min-h-screen bg-abc-bg py-8 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-abc-dark font-bold transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Назад ко всем новостям
        </button>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-abc-blue/20">
          {newsItem.cover_photo && (
            <img src={newsItem.cover_photo} alt={newsItem.title} className="w-full h-64 md:h-96 object-cover" />
          )}
          <div className="p-8 md:p-12">
            <span className="text-sm font-black text-abc-blue uppercase tracking-wider">{new Date(newsItem.created_at).toLocaleDateString('ru-RU')}</span>
            <h1 className="text-3xl md:text-5xl font-black text-abc-dark mt-3 mb-6 leading-tight">{newsItem.title}</h1>
            <p className="text-gray-600 leading-loose whitespace-pre-wrap text-base md:text-lg">{newsItem.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}