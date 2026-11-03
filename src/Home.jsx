import React from 'react';
import { waLink } from './theme';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-white pt-10 pb-16 md:py-24 rounded-b-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-abc-dark mb-4">
            Центр ABC
          </h1>
          <p className="text-gray-500 mb-8">Работаем над восстановлением сайта...</p>
          <a href={waLink()} className="bg-abc-yellow px-8 py-4 rounded-2xl font-black text-abc-dark">
            Записаться в WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}