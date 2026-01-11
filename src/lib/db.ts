import mysql from 'mysql2/promise';

// Створюємо пул з'єднань для ефективного використання
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Функція для виконання запитів
export async function query(sql: string, params: any[]) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default pool;
