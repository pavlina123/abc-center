import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { formatPrice } from './theme';

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

  // ====== ОБЩИЕ ФУНКЦИИ ======
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
      setFormData(prev => ({ ...prev, photo: data.publicUrl, cover_photo: data.publicUrl, url: data.publicUrl }));
    } else {
      alert('Ошибка загрузки: ' + error.message);
    }
    setUploading(false);
  };

  const deleteItem = async (table, id) => {
    if (!window.confirm('Удалить эту запись?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetchAllData();
  };

  // ====== СОХРАНЕНИЕ ======
  const saveItem = async (e, table) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    
    // Убираем пустые поля, если они не нужны
    if (!dataToSave.photo) delete dataToSave.photo;
    if (!dataToSave.cover_photo) delete dataToSave.cover_photo;

    if (isEditing) {
      await supabase.from(table).update(dataToSave).eq('id', formData.id);
    } else {
      delete dataToSave.id;
      await supabase.from(table).insert([dataToSave]);
    }
    
    setFormData({});
    setIsEditing(false);
    fetchAllData();
    alert('Успешно сохранено!');
  };

  const startEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFormData({});
    setIsEditing(false);
  };

  // ====== РЕНДЕР ФОРМ ======
  const renderSpecialistForm = () => (
    <form onSubmit={(e) => saveItem(e, 'specialists')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Редактировать специалиста' : 'Добавить специалиста'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Имя специалиста" required className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
        <input type="text" name="role" value={formData.role || ''} onChange={handleInputChange} placeholder="Должность (Логопед, Психолог)" required className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
        <input type="text" name="experience" value={formData.experience || ''} onChange={handleInputChange} placeholder="Опыт работы (например, 5 лет)" className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Фото (обязательно)</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" required={!formData.photo} />
          {uploading && <span className="text-xs text-blue-500">Загрузка...</span>}
          {formData.photo && <img src={formData.photo} className="w-12 h-12 object-cover rounded mt-2" alt="preview" />}
        </div>
      </div>
      <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Краткое описание" rows="3" className="w-full border p-3 rounded-xl mt-4 focus:border-abc-blue outline-none"></textarea>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-abc-blue text-white px-6 py-2 rounded-xl font-bold">Сохранить</button>
        {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
      </div>
    </form>
  );

  const renderServiceForm = () => (
    <form onSubmit={(e) => saveItem(e, 'services')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Редактировать услугу' : 'Добавить услугу'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Название услуги" required className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
        <input type="text" name="price" value={formData.price || ''} onChange={handleInputChange} placeholder="Цена (например, 5000 или оставь пустым)" className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
        <input type="text" name="icon" value={formData.icon || ''} onChange={handleInputChange} placeholder="Эмодзи (например, 🧠)" className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
      </div>
      <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Описание услуги" rows="3" className="w-full border p-3 rounded-xl mt-4 focus:border-abc-blue outline-none"></textarea>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-abc-blue text-white px-6 py-2 rounded-xl font-bold">Сохранить</button>
        {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
      </div>
    </form>
  );

  const renderNewsForm = () => (
    <form onSubmit={(e) => saveItem(e, 'news')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Редактировать новость' : 'Добавить новость'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Заголовок" required className="border p-3 rounded-xl focus:border-abc-blue outline-none" />
        <select name="status" value={formData.status || 'published'} onChange={handleInputChange} className="border p-3 rounded-xl focus:border-abc-blue outline-none bg-white">
          <option value="published">Опубликовано</option>
          <option value="draft">Черновик</option>
        </select>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Обложка</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
          {uploading && <span className="text-xs text-blue-500">Загрузка...</span>}
          {formData.cover_photo && <img src={formData.cover_photo} className="w-16 h-10 object-cover rounded mt-2" alt="preview" />}
        </div>
      </div>
      <textarea name="content" value={formData.content || ''} onChange={handleInputChange} placeholder="Текст новости" rows="5" className="w-full border p-3 rounded-xl mt-4 focus:border-abc-blue outline-none"></textarea>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-abc-blue text-white px-6 py-2 rounded-xl font-bold">Сохранить</button>
        {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-abc-cream flex flex-col md:flex-row">
      {/* Сайдбар */}
      <aside className="w-full md:w-64 bg-abc-navy text-white flex-shrink-0 p-4 md:p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <div className="w-10 h-10 bg-abc-goldLight text-abc-navy rounded-lg flex items-center justify-center text-xl font-display font-bold">ABC</div>
          <div>
            <h1 className="text-sm font-display font-bold">Админ-панель</h1>
            <p className="text-[10px] text-gray-400">Управление</p>
          </div>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          {[
            { id: 'dashboard', label: 'Обзор', icon: '📊' },
            { id: 'specialists', label: 'Специалисты', icon: '👨‍⚕️' },
            { id: 'services', label: 'Услуги', icon: '📚' },
            { id: 'news', label: 'Новости', icon: '📰' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); cancelEdit(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition whitespace-nowrap ${activeTab === item.id ? 'bg-abc-blue text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <button onClick={onLogout} className="w-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white font-bold py-3 rounded-xl transition">
            Выйти
          </button>
        </div>
      </aside>

      {/* Контентная часть */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-abc-navy">
              {activeTab === 'dashboard' && 'Обзор'}
              {activeTab === 'specialists' && 'Управление специалистами'}
              {activeTab === 'services' && 'Управление услугами'}
              {activeTab === 'news' && 'Управление новостями'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Вы вошли как: {user.name}</p>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Загрузка данных...</div>
        ) : (
          <div className="animate-fade-in">
            {/* ДАШБОРД */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-4xl block mb-2">👨‍⚕️</span>
                  <span className="text-sm text-gray-500 font-bold uppercase">Специалисты</span>
                  <div className="text-3xl font-black text-abc-navy">{specialists.length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-4xl block mb-2">📚</span>
                  <span className="text-sm text-gray-500 font-bold uppercase">Услуги</span>
                  <div className="text-3xl font-black text-abc-navy">{services.length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-4xl block mb-2">📰</span>
                  <span className="text-sm text-gray-500 font-bold uppercase">Новости</span>
                  <div className="text-3xl font-black text-abc-navy">{news.length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-4xl block mb-2">🎬</span>
                  <span className="text-sm text-gray-500 font-bold uppercase">Медиа</span>
                  <div className="text-3xl font-black text-abc-navy">{media.length}</div>
                </div>
              </div>
            )}

            {/* СПЕЦИАЛИСТЫ */}
            {activeTab === 'specialists' && (
              <div>
                {renderSpecialistForm()}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialists.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                      {item.photo ? <img src={item.photo} className="w-20 h-20 object-cover rounded-xl" /> : <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">👤</div>}
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{item.name}</h4>
                        <p className="text-abc-gold text-sm font-semibold">{item.role}</p>
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

            {/* УСЛУГИ */}
            {activeTab === 'services' && (
              <div>
                {renderServiceForm()}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{item.icon} {item.title}</h4>
                        <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-abc-blue">{formatPrice(item.price)}</span>
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

            {/* НОВОСТИ */}
            {activeTab === 'news' && (
              <div>
                {renderNewsForm()}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                      {item.cover_photo && <img src={item.cover_photo} className="w-full h-32 object-cover rounded-lg mb-3" />}
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded self-start mb-2 ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                      </span>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-500 text-sm line-clamp-3 mt-1">{item.content}</p>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-500 hover:underline">Изменить</button>
                        <button onClick={() => deleteItem('news', item.id)} className="text-xs font-bold text-red-500 hover:underline">Удалить</button>
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