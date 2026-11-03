import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Specialists({ onOpenSpecialist }) {
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('specialists').select('*').order('created_at', { ascending: true });
      if (data) setSpecialists(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-abc-dark mb-4">Наши специалисты</h1>
        <p className="text-gray-500 font-medium max-w-xl mx-auto">Команда профессионалов центра ABC.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {specialists.map(spec => (
          <div key={spec.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-abc-green/20 flex flex-col group transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300">
            <div className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => onOpenSpecialist(spec)}>
              {spec.photo ? (
                <img src={spec.photo} alt={spec.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              ) : (
                <div className="w-full h-full bg-abc-bg flex items-center justify-center text-5xl">🧸</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <h3 className="text-sm md:text-lg font-black leading-tight">{spec.name}</h3>
                <p className="text-[10px] md:text-xs font-bold text-abc-blue">{spec.role}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 flex flex-col flex-1">
              <p className="text-[10px] md:text-sm text-gray-500 line-clamp-2 mb-3 text-paragraphs">
                {spec.description || 'Специалист пока не добавил описание.'}
              </p>
              <button onClick={() => onOpenSpecialist(spec)} className="mt-auto w-full bg-abc-blue/20 text-abc-dark md:bg-abc-green md:hover:bg-green-300 font-black py-1.5 md:py-2.5 rounded-xl transition text-[10px] md:text-sm">
                Ознакомиться
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}