import React from 'react';
import { waLink } from './theme';

export default function ServicePage({ service, onBack }) {
  if (!service) return null;

  return (
    <div className="min-h-screen bg-abc-bg py-8 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-abc-dark font-bold transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Назад ко всем услугам
        </button>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-abc-green/20">
          <div className="p-8 md:p-12 text-center md:text-left">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0 rounded-2xl overflow-hidden bg-abc-bg mb-6 border-4 border-abc-yellow shadow-lg">
              {service.photo ? (
                <img src={service.photo} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl text-abc-yellow">{service.icon || '📚'}</div>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-abc-dark mb-4">{service.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-8 text-paragraphs">{service.description || 'Описание пока не добавлено.'}</p>
            
            <div className="bg-abc-bg p-6 rounded-2xl inline-block mb-8 w-full md:w-auto">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Стоимость</span>
              {/* Просто выводим то, что в базе */}
              <span className="text-3xl font-black text-abc-dark">{service.price || 'По запросу'}</span>
            </div>

            <a href={waLink(`Хочу записаться на услугу: ${service.title}`)} target="_blank" rel="noreferrer" className="block w-full bg-abc-yellow text-center text-abc-dark font-black py-4 rounded-2xl hover:bg-yellow-300 transition shadow-lg shadow-abc-yellow/40 text-lg">
              Записаться на консультацию
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}