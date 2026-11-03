import React from 'react';
import { waLink } from './theme';

export default function SpecialistPage({ specialist, onBack }) {
  if (!specialist) return null;

  return (
    <div className="min-h-screen bg-abc-bg py-8 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        
        {/* Кнопка назад */}
        <button 
          onClick={onBack} 
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-abc-dark font-bold transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Назад ко всем специалистам
        </button>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-abc-green/20 flex flex-col md:flex-row">
          
          {/* Фото слева */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
            {specialist.photo ? (
              <img src={specialist.photo} alt={specialist.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-abc-bg flex items-center justify-center text-8xl">🧸</div>
            )}
          </div>

          {/* Информация справа */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <span className="inline-block py-1 px-3 rounded-full bg-abc-yellow/30 text-abc-dark text-xs font-black uppercase tracking-wider mb-4 w-max">
              {specialist.role}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-abc-dark mb-4">{specialist.name}</h1>
            
            <div className="mb-6">
              <h4 className="text-sm font-black text-gray-400 uppercase mb-2">Опыт работы</h4>
              <p className="text-lg font-bold text-abc-dark">{specialist.experience || 'Не указан'}</p>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-black text-gray-400 uppercase mb-2">О специалисте</h4>
              <p className="text-gray-600 leading-relaxed">
                {specialist.description || 'Этот специалист пока не добавил подробное описание о себе.'}
              </p>
            </div>

            <a 
              href={waLink(`Хочу записаться к специалисту: ${specialist.name}`)} 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full bg-abc-yellow text-center text-abc-dark font-black py-4 rounded-2xl hover:bg-yellow-300 transition shadow-lg shadow-abc-yellow/40 text-lg"
            >
              Записаться на прием
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}