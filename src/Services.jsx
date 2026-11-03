import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { formatPrice } from './theme';

export default function Services({ onOpenService }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (data) setServices(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-abc-dark mb-4">Наши услуги</h1>
        <p className="text-gray-500 font-medium">Современные программы развития.</p>
      </div>

      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {services.map(service => (
          <div key={service.id} className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border border-abc-green/30 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <div className="w-full md:w-32 h-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-abc-bg">
              {service.photo ? (
                <img src={service.photo} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-abc-yellow">{service.icon || '📚'}</div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg md:text-2xl font-black text-abc-dark mb-2">{service.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-4 line-clamp-3 text-paragraphs">{service.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-base md:text-xl font-black text-abc-dark">
                  {service.price ? `${Number(service.price).toLocaleString('ru-RU')} ₸` : 'По запросу'}
                </span>
                <button onClick={() => onOpenService(service)} className="bg-abc-yellow text-abc-dark px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition text-sm shadow-md">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}