import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { waLink } from './theme';

export default function Specialists() {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('specialists').select('*').order('created_at', { ascending: true });
      if (data) setSpecialists(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-[60vh] relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-abc-dark mb-4">Наши волшебники</h1>
        <p className="text-gray-500 font-medium max-w-xl mx-auto">Профессионалы, которые найдут подход к каждому ребенку.</p>
      </div>

      {/* Карусель (на телефоне 2 карточки, на ПК 3) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible">
        {specialists.map(spec => (
          <div key={spec.id} className="min-w-[45%] sm:min-w-[30%] md:min-w-0 snap-center bg-white rounded-3xl p-4 shadow-xl border border-abc-green/20 flex flex-col items-center text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-abc-green shadow-inner">
              {spec.photo ? (
                <img src={spec.photo} alt={spec.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-abc-bg flex items-center justify-center text-4xl">🧸</div>
              )}
            </div>
            <h3 className="text-lg md:text-xl font-black text-abc-dark leading-tight">{spec.name}</h3>
            <p className="text-abc-blue font-bold text-xs md:text-sm mb-4">{spec.role}</p>
            <button onClick={() => setSelectedSpec(spec)} className="mt-auto w-full bg-abc-green hover:bg-green-300 text-abc-dark font-black py-2.5 rounded-xl transition">
              Ознакомиться
            </button>
          </div>
        ))}
      </div>

      {/* Модалка специалиста */}
      {selectedSpec && (
        <div className="fixed inset-0 z-[100] bg-abc-dark/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedSpec(null)}>
          <div className="bg-white rounded-[2rem] p-6 max-w-md w-full shadow-2xl animate-fade-in relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedSpec(null)} className="absolute top-4 right-4 text-gray-400 hover:text-abc-dark bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-abc-yellow">
              {selectedSpec.photo ? <img src={selectedSpec.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-abc-bg flex items-center justify-center text-5xl">🧸</div>}
            </div>
            <h2 className="text-2xl font-black text-center mb-1">{selectedSpec.name}</h2>
            <p className="text-center text-abc-blue font-bold mb-4">{selectedSpec.role}</p>
            <div className="bg-abc-bg p-4 rounded-2xl mb-4 text-sm text-gray-700 leading-relaxed max-h-40 overflow-y-auto">
              <p><b className="text-abc-dark">Опыт:</b> {selectedSpec.experience || 'Не указан'}</p>
              <p className="mt-2">{selectedSpec.description || 'Специалист пока не добавил описание.'}</p>
            </div>
            <a href={waLink(`Хочу записаться к специалисту: ${selectedSpec.name}`)} target="_blank" rel="noreferrer" className="block w-full bg-abc-yellow text-center text-abc-dark font-black py-3 rounded-xl hover:bg-yellow-300 transition">
              Записаться на прием
            </a>
          </div>
        </div>
      )}
    </div>
  );
}