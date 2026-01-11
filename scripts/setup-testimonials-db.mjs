import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

async function setupTestimonialsTable() {
  console.log('🔄 Підключення до бази даних...');
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('✅ Підключено до бази даних');

  try {
    console.log('🔄 Створення таблиці testimonials...');
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL COMMENT 'Ім\'я автора відгуку',
        email VARCHAR(255) DEFAULT NULL COMMENT 'Email автора (не публікується)',
        rating INT NOT NULL COMMENT 'Оцінка від 1 до 5',
        text TEXT NOT NULL COMMENT 'Текст відгуку',
        is_visible TINYINT(1) DEFAULT 1 COMMENT 'Видимість відгуку',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата створення',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Дата оновлення',
        INDEX idx_visible_created (is_visible, created_at DESC)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблиця відгуків клієнтів';
    `);

    console.log('✅ Таблиця testimonials успішно створена!');

    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM testimonials');
    console.log(`📊 Кількість записів у таблиці: ${rows[0].count}`);

    if (rows[0].count === 0) {
      console.log('💡 Таблиця порожня. Відгуки будуть додаватися через форму на сайті.');
    }

  } catch (error) {
    console.error('❌ Помилка при створенні таблиці:', error);
    throw error;
  } finally {
    await connection.end();
    console.log('👋 З\'єднання з базою даних закрито');
  }
}

setupTestimonialsTable()
  .then(() => {
    console.log('🎉 Налаштування таблиці testimonials завершено успішно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Критична помилка:', error);
    process.exit(1);
  });
