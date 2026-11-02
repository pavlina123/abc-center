import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Login({ isOpen, onClose, onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: err } = await supabase.from('access_codes').select('role, name').eq('code', code.trim().toUpperCase()).single();
      if (err || !data) throw new Error('Неверный код доступа');
      onLogin({ role: data.role, name: data.name, code: code.trim().toUpperCase() });
      setCode('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-abc-navy/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white max-w-sm w-full rounded-2xl p-8 shadow-2xl relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">✕</button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-abc-blue text-abc-goldLight rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-abc-navy">Вход для персонала</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Введите код" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-lg tracking-widest uppercase font-bold focus:outline-none focus:border-abc-blue transition" required />
          {error && <div className="text-red-500 text-xs text-center">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-abc-blue text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition shadow-lg">
            {loading ? 'Проверка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}