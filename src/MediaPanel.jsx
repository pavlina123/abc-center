import React from 'react';

export default function MediaPanel({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-display font-bold text-abc-navy">Панель Контент-менеджера</h1>
        <p className="text-gray-500 mt-2">Добро пожаловать, {user.name}</p>
        <button onClick={onLogout} className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition">Выйти</button>
      </div>
    </div>
  );
}