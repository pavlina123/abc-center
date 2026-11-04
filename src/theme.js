export const WHATSAPP = '77761748387'; // Номер из Instagram
export const PHONE_DISPLAY = '+7 776 174 8387';
export const ADDRESS = 'ул. Нажимеденова 20, НП-10, Астана';
export const INSTAGRAM_URL = 'https://www.instagram.com/abcastana';

export const waLink = (text = 'Здравствуйте! Хочу записаться на консультацию в Центр ABC.') =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const formatPrice = (n) => n ? n.toLocaleString('ru-RU') + ' ₸' : 'По запросу';