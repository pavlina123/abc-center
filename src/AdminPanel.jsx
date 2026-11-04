import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function AdminPanel({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Стейты для данных
  const [specialists, setSpecialists] = useState([]);
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // Стейты для форм
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [galleryUpload, setGalleryUpload] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    const [specRes, servRes, newsRes, mediaRes] = await Promise.all([
      supabase.from('specialists').select('*').order('created_at', { ascending: false }),
      supabase.from('services').select('*').order('created_at', { ascending: false }),
      supabase.from('news').select('*').order('created_at', { ascending: false }),
      supabase.from('media').select('*').order('created_at', { ascending: false }),
    ]);

    if (specRes.data) setSpecialists(specRes.data);
    if (servRes.data) setServices(servRes.data);
    if (newsRes.data) setNews(newsRes.data);
    if (mediaRes.data) setMedia(mediaRes.data);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error } = await supabase.storage.from('abc-media').upload(fileName, file);
    if (!error) {
      const { data } = supabase.storage.from('abc-media').getPublicUrl(fileName);
      
      if (activeTab === 'news') setFormData(prev => ({ ...prev, cover_photo: data.publicUrl }));
      else if (activeTab === 'media') setFormData(prev => ({ ...prev, url: data.publicUrl }));
      else setFormData(prev => ({ ...prev, photo: data.publicUrl }));
    } else {
      alert('Ошибка загрузки: ' + error.message);
    }
    setUploading(false);
  };

  const handleGalleryUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setGalleryUpload(true);
    
    let newGallery = formData.gallery ? [...formData.gallery] : [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error } = await supabase.storage.from('abc-media').upload(fileName, file);
      
      if (!error) {
        const { data } = supabase.storage.from('abc-media').getPublicUrl(fileName);
        newGallery.push(data.publicUrl);
      }
    }
    
    setFormData(prev => ({ ...prev, gallery: newGallery }));
    setGalleryUpload(false);
  };

  const deleteItem = async (table, id) => {
    if (!window.confirm('Удалить эту запись?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetchAllData();
  };

  const saveItem = async (e, table) => {
    e.preventDefault();
    const dataToSave = {};
    Object.keys(formData).forEach(key => {
      const val = formData[key];
      if (val !== undefined && val !== null && val !== '') {
        dataToSave[key] = typeof val === 'string' ? val.trim() : val;
      }
    });

    let error;
    if (isEditing) {
      const { error: err } = await supabase.from(table).update(dataToSave).eq('id', formData.id);
      error = err;
    } else {
      delete dataToSave.id;
      const { error: err } = await supabase.from(table).insert([dataToSave]);
      error = err;
    }
    
    if (error) alert('Ошибка: ' + error.message);
    else {
      setFormData({});
      setIsEditing(false);
      fetchAllData();
      alert('Успешно сохранено!');
    }
  };

  const startEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFormData({});
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-abc-bg flex flex-col md:flex-row">
      {/* Сайдбар */}
      <aside className="w-full md:w-64 bg-white border-r border-abc-green/30 flex-shrink-0 p-4 md:p-6 flex flex-col shadow-sm z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-abc-yellow text-abc-dark rounded-xl flex items-center justify-center text-xl font-black shadow-md">ABC</div>
          <div>
            <h1 className="text-sm font-black text-abc-dark">Админ-панель</h1>
            <p className="text-[10px] text-gray-500 font-bold">Центр развития</p>
          </div>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          {[
            { id: 'dashboard', label: 'Обзор', icon: '📊' },
            { id: 'specialists', label: 'Специалисты', icon: '👨‍⚕️' },
            { id: 'services', label: 'Услуги', icon: '📚' },
            { id: 'news', label: 'Новости', icon: '📰' },
            { id: 'media', label: 'Медиа', icon: '🎬' },
          ].map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); cancelEdit(); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition whitespace-nowrap ${activeTab === item.id ? 'bg-abc-green text-abc-dark shadow-sm' : 'text-gray-500 hover:bg-abc-bg hover:text-abc-dark'}`}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 hidden md:block">
          <button onClick={onLogout} className="w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 rounded-xl transition">Выйти</button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-abc-dark">
            {activeTab === 'dashboard' && 'Обзор'}
            {activeTab === 'specialists' && 'Специалисты'}
            {activeTab === 'services' && 'Услуги'}
            {activeTab === 'news' && 'Новости'}
            {activeTab === 'media' && 'Медиагалерея'}
          </h2>
          <button onClick={onLogout} className="md:hidden bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold text-sm">Выйти</button>
        </header>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Загрузка...</div>
        ) : (
          <div className="animate-fade-in">
            
            {/* ОБЗОР */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Специалисты', count: specialists.length, icon: '👨‍⚕️' },
                  { title: 'Услуги', count: services.length, icon: '📚' },
                  { title: 'Новости', count: news.length, icon: '📰' },
                  { title: 'Медиа', count: media.length, icon: '🎬' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-abc-green/30 shadow-sm text-center">
                    <span className="text-4xl block mb-2">{stat.icon}</span>
                    <div className="text-3xl font-black text-abc-dark">{stat.count}</div>
                    <span className="text-xs text-gray-500 font-bold uppercase">{stat.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* СПЕЦИАЛИСТЫ */}
            {activeTab === 'specialists' && (
              <div>
                <form onSubmit={(e) => saveItem(e, 'specialists')} className="bg-white p-6 rounded-3xl shadow-sm border border-abc-green/30 mb-8">
                  <h3 className="text-lg font-black mb-4">{isEditing ? 'Редактировать' : 'Добавить'} специалиста</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Имя" required className="border border-gray-200 p-3 rounded-xl focus:border-abc-green outline-none" />
                    <input type="text" name="role" value={formData.role || ''} onChange={handleInputChange} placeholder="Должность" required className="border border-gray-200 p-3 rounded-xl focus:border-abc-green outline-none" />
                    <input type="text" name="experience" value={formData.experience || ''} onChange={handleInputChange} placeholder="Опыт (например, 5 лет)" className="border border-gray-200 p-3 rounded-xl focus:border-abc-green outline-none" />
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 font-bold">Главное фото (для карточки)</label>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-abc-green/20 file:text-abc-dark hover:file:bg-abc-green/40 cursor-pointer" />
                      {uploading && <span className="text-xs text-blue-500 block mt-1">Загрузка...</span>}
                      {formData.photo && <img src={formData.photo} className="w-16 h-16 object-cover rounded-xl mt-2 border-2 border-abc-green" alt="preview" />}
                    </div>
                  </div>
                  
                  <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Описание (можно с абзацами)" rows="4" className="w-full border border-gray-200 p-3 rounded-xl mt-4 focus:border-abc-green outline-none"></textarea>
                  
                  <div className="mt-4">
                    <label className="text-xs text-gray-500 block mb-1 font-bold">Сертификаты / Доп. фото</label>
                    <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-abc-blue/20 file:text-abc-dark hover:file:bg-abc-blue/40 cursor-pointer" />
                    {galleryUpload && <span className="text-xs text-blue-500 block mt-1">Загрузка...</span>}
                    <div className="flex gap-2 mt-2">
                      {formData.gallery && formData.gallery.map((img, i) => (
                        <img key={i} src={img} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-abc-green text-abc-dark px-6 py-2 rounded-xl font-black hover:bg-green-300 transition">Сохранить</button>
                    {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-600 px-6 py-2 rounded-xl font-bold">Отмена</button>}
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialists.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4">
                      {item.photo ? <img src={item.photo} className="w-20 h-20 object-cover rounded-2xl border-2 border-abc-green/20" /> : <div className="w-20 h-20 bg-abc-bg rounded-2xl flex items-center justify-center text-3xl border-2 border-dashed border-gray-300">👨‍⚕️</div>}
                      <div className="flex-1">
                        <h4 className="font-black text-lg">{item.name}</h4>
                        <p className="text-abc-blue text-sm font-bold">{item.role}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-500 hover:underline">Изменить</button>
                          <button onClick={() => deleteItem('specialists', item.id)} className="text-xs font-bold text-red-500 hover:underline">Удалить</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* НОВОСТИ */}
            {activeTab === 'news' && (
              <div>
                <form onSubmit={(e) => saveItem(e, 'news')} className="bg-white p-6 rounded-3xl shadow-sm border border-abc-green/30 mb-8">
                  <h3 className="text-lg font-black mb-4">{isEditing ? 'Редактировать' : 'Добавить'} новость</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Заголовок" required className="border border-gray-200 p-3 rounded-xl" />
                    <select name="status" value={formData.status || 'published'} onChange={handleInputChange} className="border border-gray-200 p-3 rounded-xl bg-white">
                      <option value="published">Опубликовано</option>
                      <option value="draft">Черновик</option>
                    </select>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 font-bold">Обложка новости</label>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-abc-green/20 file:text-abc-dark hover:file:bg-abc-green/40 cursor-pointer" />
                      {formData.cover_photo && <img src={formData.cover_photo} className="w-16 h-10 object-cover rounded mt-2" />}
                    </div>
                  </div>
                  <textarea name="content" value={formData.content || ''} onChange={handleInputChange} placeholder="Текст новости (можно с абзацами)" rows="6" className="w-full border border-gray-200 p-3 rounded-xl mt-4"></textarea>
                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-abc-green text-abc-dark px-6 py-2 rounded-xl font-black">Сохранить</button>
                    {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4">
                      {item.cover_photo ? <img src={item.cover_photo} className="w-20 h-20 object-cover rounded-2xl" /> : <div className="w-20 h-20 bg-abc-bg rounded-2xl flex items-center justify-center text-3xl">📰</div>}
                      <div className="flex-1">
                        <h4 className="font-black text-lg">{item.title}</h4>
                        <p className="text-gray-500 text-xs line-clamp-2">{item.content}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-500 hover:underline">Изменить</button>
                          <button onClick={() => deleteItem('news', item.id)} className="text-xs font-bold text-red-500 hover:underline">Удалить</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* УСЛУГИ */}
            {activeTab === 'services' && (
               <div>
                <form onSubmit={(e) => saveItem(e, 'services')} className="bg-white p-6 rounded-3xl shadow-sm border border-abc-green/30 mb-8">
                  <h3 className="text-lg font-black mb-4">{isEditing ? 'Редактировать' : 'Добавить'} услугу</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Название" required className="border border-gray-200 p-3 rounded-xl" />
                    <input type="text" name="price" value={formData.price || ''} onChange={handleInputChange} placeholder="Цена (например, 5000 за занятие)" className="border border-gray-200 p-3 rounded-xl" />
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 font-bold">Фото (квадратик)</label>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-abc-green/20 file:text-abc-dark hover:file:bg-abc-green/40 cursor-pointer" />
                      {formData.photo && <img src={formData.photo} className="w-12 h-12 object-cover rounded mt-2" />}
                    </div>
                  </div>
                  <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Описание (можно с абзацами)" rows="4" className="w-full border border-gray-200 p-3 rounded-xl mt-4"></textarea>
                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-abc-green text-abc-dark px-6 py-2 rounded-xl font-black">Сохранить</button>
                    {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="font-black text-lg">{item.title}</h4>
                        <p className="text-gray-500 text-sm line-clamp-2 text-paragraphs">{item.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        {/* Цена как есть, без добавления ₸ */}
                        <span className="font-black text-abc-blue">{item.price || 'По запросу'}</span>
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-500 hover:underline">Изменить</button>
                          <button onClick={() => deleteItem('services', item.id)} className="text-xs font-bold text-red-500 hover:underline">Удалить</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* МЕДИА */}
            {activeTab === 'media' && (
              <div>
                <form onSubmit={(e) => saveItem(e, 'media')} className="bg-white p-6 rounded-3xl shadow-sm border border-abc-green/30 mb-8">
                  <h3 className="text-lg font-black mb-4">{isEditing ? 'Редактировать' : 'Добавить'} видео/фото</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Название видео" required className="border border-gray-200 p-3 rounded-xl" />
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Ссылка на YouTube или загрузите файл</label>
                      <input type="text" name="url" value={formData.url || ''} onChange={handleInputChange} placeholder="https://youtube.com/..." className="border border-gray-200 p-3 rounded-xl w-full mb-2" />
                      <input type="file" accept="video/*,image/*" onChange={handleFileUpload} className="text-sm" />
                      {uploading && <span className="text-xs text-blue-500">Загрузка...</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-abc-green text-abc-dark px-6 py-2 rounded-xl font-black">Сохранить</button>
                    {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {media.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                      <h4 className="font-black text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-400 truncate mb-4">{item.url}</p>
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-500 hover:underline">Изменить</button>
                        <button onClick={() => deleteItem('media', item.id)} className="text-xs font-bold text-red-500 hover:underline">Удалить</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}