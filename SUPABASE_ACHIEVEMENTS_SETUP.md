# Налаштування досягнень в Supabase

## Крок 1: Створіть таблицю achievements

1. Відкрийте **Supabase Dashboard** → ваш проект **advokat-testimonials**
2. В лівій панелі → **SQL Editor**
3. Скопіюйте і вставте цей SQL:

```sql
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Включіть Row Level Security
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Дозвольте читати всі досягнення
CREATE POLICY "Allow public read achievements" ON achievements
  FOR SELECT USING (true);

-- Дозвольте додавати/редагувати/видаляти тільки з service_role ключем
-- (API вже використовує service_role, тому працюватиме автоматично)
```

4. Натисніть **Run** (або F5)

## Крок 2: Створіть Storage bucket для зображень

1. В лівій панелі → **Storage**
2. Натисніть **"New bucket"**
3. Налаштування:
   - **Name**: `achievements`
   - **Public bucket**: ✅ (включіть, щоб зображення були доступні публічно)
   - **File size limit**: 5MB (або більше)
4. Натисніть **Create bucket**

## Крок 3: Налаштуйте політики доступу до Storage

1. Виберіть bucket **achievements**
2. Перейдіть на вкладку **Policies**
3. Натисніть **New Policy**
4. Виберіть шаблон **"Allow public read access"**
5. Додайте також політику для запису (INSERT):

```sql
-- Дозволити публічне читання
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'achievements');

-- Дозволити запис через service_role
CREATE POLICY "Service role can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'achievements');

-- Дозволити видалення через service_role
CREATE POLICY "Service role can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'achievements');
```

## ✅ Готово!

Після цього:
1. **Deployments** в Vercel → **Redeploy** (зміни вже на GitHub)
2. Спробуйте додати досягнення на `/achievements`
3. Зображення будуть зберігатись в Supabase Storage, а не локально!

**URL зображень:** `https://bhjwbfzdasobddmbqxhv.supabase.co/storage/v1/object/public/achievements/[filename]`
