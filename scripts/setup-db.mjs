import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

async function setupDatabase() {
  console.log('🔄 Підключення до бази даних...');
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('✅ Підключено до бази даних');

  try {
    console.log('🔄 Створення таблиці achievements...');
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ Таблиця achievements успішно створена!');

    // Перевіряємо, чи є дані в таблиці
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM achievements');
    console.log(`📊 Кількість записів у таблиці: ${rows[0].count}`);

    if (rows[0].count === 0) {
      console.log('💡 Таблиця порожня. Ви можете додати досягнення через адмін-панель на сайті.');
    }

  } catch (error) {
    console.error('❌ Помилка при створенні таблиці:', error);
    throw error;
  } finally {
    await connection.end();
    console.log('👋 З\'єднання з базою даних закрито');
  }
}

setupDatabase()
  .then(() => {
    console.log('🎉 Налаштування бази даних завершено успішно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Критична помилка:', error);
    process.exit(1);
  });
