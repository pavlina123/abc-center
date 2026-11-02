export const waLink = (text = 'Здравствуйте! Хочу записаться на консультацию в Центр ABC.') =>
  `https://wa.me/77784643169?text=${encodeURIComponent(text)}`

export const formatPrice = (n) => n ? n.toLocaleString('ru-RU') + ' ₸' : 'По запросу'