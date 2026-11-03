import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Media() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
      if (data) setMedia(data);
    };
    fetchMedia();
  }, []);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-abc-dark mb-4">Медиа-галерея</h1>
        <p className="text-gray-500 font-medium">Видео о нашем центре, реклама и полезные материалы.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {media.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-abc-blue/20">
            {/* Если это ютуб - рендерим iframe, если прямая ссылка - video */}
            {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
              <div className="relative pt-[56.25%]">
                <iframe src={item.url.replace('watch?v=', 'embed/')} className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
              </div>
            ) : (
              <video src={item.url} controls className="w-full aspect-video object-cover" />
            )}
            <div className="p-3 md:p-4">
              <h3 className="font-black text-abc-dark text-sm md:text-base line-clamp-2">{item.title || 'Видео'}</h3>
            </div>
          </div>
        ))}
        {media.length === 0 && <p className="col-span-full text-center text-gray-400 py-10">Видео пока нет.</div>}
      </div>
    </div>
  );
}