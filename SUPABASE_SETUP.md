# Налаштування Supabase для відгуків

## Крок 1: Створіть проект Supabase (1 хвилина)

1. Відкрийте https://supabase.com/dashboard
2. Натисніть **New project**
3. Назва: `advokat-testimonials`
4. Database Password: придумайте складний пароль (збережіть!)
5. Регіон: **Central EU (Frankfurt)** (найближче до України)
6. Натисніть **Create new project** і зачекайте 1-2 хвилини

## Крок 2: Створіть таблицю

1. В лівій панелі відкрийте **SQL Editor**
2. Скопіюйте і вставте цей SQL:

```sql
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Включіть Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Дозвольте читати видимі відгуки всім
CREATE POLICY "Allow public read visible testimonials" ON testimonials
  FOR SELECT USING (is_visible = true);

-- Дозвольте додавати відгуки всім
CREATE POLICY "Allow public insert" ON testimonials
  FOR INSERT WITH CHECK (true);
```

3. Натисніть **Run** (або F5)

## Крок 3: Скопіюйте API credentials

1. В лівій панелі відкрийте **Settings** → **API**
2. Знайдіть:
   - **Project URL** (наприклад: `https://abcdefghijk.supabase.co`)
   - **anon public** ключ (довгий токен)
   - **service_role** ключ (secret key)

## Крок 4: Додайте змінні в Vercel

1. Відкрийте https://vercel.com/dashboard
2. Виберіть проект **advokat**
3. Перейдіть **Settings** → **Environment Variables**
4. Додайте ці змінні:

```
NEXT_PUBLIC_SUPABASE_URL = <ваш Project URL>
SUPABASE_SERVICE_KEY = <ваш service_role ключ>
```

5. Натисніть **Save**
6. Зайдіть у **Deployments** → останній deploy → **Redeploy**

✅ Готово! Після редеплою відгуки працюватимуть!
