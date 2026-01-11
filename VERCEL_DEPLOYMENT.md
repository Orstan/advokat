# 🚀 Deployment на Vercel

## Крок 1: Підготовка проєкту

✅ Файл `vercel.json` вже створений
✅ Проєкт готовий до deployment

---

## Крок 2: Створення акаунту на Vercel

1. Перейдіть на [vercel.com](https://vercel.com)
2. Натисніть **"Sign Up"**
3. Оберіть **"Continue with GitHub"**
4. Авторизуйтесь через GitHub

---

## Крок 3: Імпорт проєкту

### Варіант A: Через Git репозиторій (РЕКОМЕНДОВАНО)

1. Завантажте код на GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_USERNAME/advokat.git
   git push -u origin main
   ```

2. У Vercel Dashboard:
   - Натисніть **"Add New Project"**
   - Оберіть **"Import Git Repository"**
   - Знайдіть ваш репозиторій `advokat`
   - Натисніть **"Import"**

### Варіант B: Через Vercel CLI (швидше)

1. Встановіть Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Увійдіть:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

---

## Крок 4: Налаштування змінних оточення (Environment Variables)

У Vercel Dashboard → Settings → Environment Variables додайте:

### База даних MySQL:
```
DATABASE_HOST=srv1634.hstgr.io
DATABASE_USER=u215293615_advokat_user
DATABASE_PASSWORD=ваш_пароль_від_бази
DATABASE_NAME=u215293615_advokat_db
DATABASE_PORT=3306
```

### Site URL:
```
NEXT_PUBLIC_SITE_URL=https://ваш-домен.vercel.app
```

### EmailJS (якщо використовується):
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=ваш_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=ваш_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=ваш_public_key
```

**ВАЖЛИВО:** 
- Додайте змінні для всіх середовищ: **Production**, **Preview**, **Development**
- Натисніть **"Save"** після кожної змінної

---

## Крок 5: Deploy

1. Після додавання змінних, Vercel автоматично почне build
2. Зачекайте 2-3 хвилини
3. Отримаєте URL типу: `https://advokat-xxxx.vercel.app`

---

## Крок 6: Підключення власного домену

1. У Vercel Dashboard → Settings → Domains
2. Додайте домен: `advokat-proidak.com`
3. Vercel покаже DNS записи для налаштування:

### У Hostinger DNS налаштування додайте:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Зачекайте 5-60 хвилин для пропагації DNS

---

## Крок 7: Перевірка

1. Відкрийте `https://advokat-proidak.com`
2. Перевірте що всі сторінки працюють
3. Перевірте форму контактів
4. Перевірте додавання відгуків
5. Перевірте адмін-панель досягнень (пароль: `Forosa90@`)

---

## 🔄 Автоматичні оновлення

Після налаштування:
- Кожен `git push` автоматично запускає новий deploy
- Preview deployment для кожного Pull Request
- Production deployment для main гілки

---

## 🆘 Troubleshooting

### Помилка "Database connection failed"
✅ Перевірте змінні оточення DATABASE_*
✅ Перевірте що MySQL база доступна ззовні (не тільки localhost)

### Помилка "API route not found"
✅ Переконайтесь що файл `vercel.json` існує
✅ Перевірте що всі API routes в папці `src/app/api/`

### Повільне завантаження картинок
✅ Додайте `unoptimized: true` в `next.config.js` для Image компонента
✅ Або використовуйте Vercel Image Optimization

---

## 📞 Підтримка

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: створіть issue в репозиторії

---

**Успішного deployment! 🎉**
