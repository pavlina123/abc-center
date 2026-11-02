import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Specialists() {
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('specialists').select('*').order('created_at', { ascending: true });
      if (data) setSpecialists(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-abc-navy mb-4">Наши специалисты</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Команда профессионалов, которая поможет вашему ребенку раскрыть свой потенциал.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialists.map(spec => (
          <div key={spec.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
            <div className="h-64 bg-gray-200 overflow-hidden">
              {spec.photo ? (
                <img src={spec.photo} alt={spec.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">👤</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-abc-navy mb-1">{spec.name}</h3>
              <p className="text-abc-gold font-semibold mb-3">{spec.role}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{spec.description}</p>
              <div className="bg-abc-cream p-3 rounded-lg text-sm text-gray-700">
                <span className="font-bold">Опыт:</span> {spec.experience || 'Не указан'}
              </div>
            </div>
          </div>
        ))}
        {specialists.length === 0 && <div className="col-span-full text-center text-gray-400">Специалисты пока не добавлены.</div>}
      </div>
    </div>
  );
}