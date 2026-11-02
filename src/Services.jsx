import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { waLink, formatPrice } from './theme';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (data) setServices(data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-abc-navy mb-4">Наши услуги</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Современные программы развития и коррекции для детей любого возраста.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between hover:border-abc-gold transition">
            <div>
              <div className="text-4xl mb-4">{service.icon || '📚'}</div>
              <h3 className="text-2xl font-bold text-abc-navy mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xl font-black text-abc-blue">{formatPrice(service.price)}</span>
              <a href={waLink(`Хочу записаться на услугу: ${service.title}`)} target="_blank" rel="noreferrer" className="bg-abc-gold text-white px-6 py-2 rounded-xl font-bold hover:bg-abc-goldLight transition">Записаться</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}