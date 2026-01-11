# Міграція відгуків на MySQL

## 1. Створення таблиці в базі даних

### Варіант A: Через phpMyAdmin
1. Відкрийте phpMyAdmin на панелі Hostinger
2. Виберіть базу даних `u215293615_advokat_db`
3. Перейдіть на вкладку SQL
4. Скопіюйте та виконайте код з файлу `setup-testimonials.sql`

### Варіант B: Через Node.js скрипт
```bash
node scripts/setup-testimonials-db.mjs
```

## 2. Оновлення компонента Testimonials

Компонент `Testimonials.tsx` було оновлено для роботи з MySQL API замість Firebase:

- ✅ Використовує `/api/testimonials` замість Firebase
- ✅ Зберігає відгуки в MySQL таблиці `testimonials`
- ✅ Адмін може приховувати відгуки (is_visible)
- ✅ Всі переклади працюють

## 3. Структура таблиці

```sql
testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  rating INT(1-5) NOT NULL,
  text TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## 4. API Endpoints

- **GET** `/api/testimonials` - отримати всі видимі відгуки
- **POST** `/api/testimonials` - додати новий відгук
- **PUT** `/api/testimonials` - змінити видимість відгуку
- **DELETE** `/api/testimonials?id={id}` - видалити відгук

## 5. Після міграції

1. Перезапустіть сервер: `npm run dev`
2. Перейдіть на `/uk/` і прокрутіть до секції "Відгуки"
3. Натисніть "Залишити відгук" для тестування
4. Для доступу до адмін-панелі відгуків натисніть на літеру "В" у заголовку "Відгуки"
5. Введіть пароль: `Forosa90@`

## 6. Firebase можна видалити

Після успішної міграції можна:
- Видалити `@/firebase/config`
- Видалити Firebase з `package.json`
- Видалити імпорти Firebase з `Testimonials.tsx`
