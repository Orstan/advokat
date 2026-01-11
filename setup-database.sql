-- SQL скрипт для створення таблиці achievements
-- Використовуйте цей скрипт в phpMyAdmin або будь-якому іншому MySQL клієнті

-- Створення таблиці achievements
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT 'Назва досягнення',
    description TEXT NOT NULL COMMENT 'Опис досягнення',
    image_url VARCHAR(500) NOT NULL COMMENT 'Шлях до зображення',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата створення',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Дата оновлення'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблиця досягнень адвоката';

-- Перевірка створення таблиці
SELECT 'Таблиця achievements успішно створена!' AS status;

-- Показати структуру таблиці
DESCRIBE achievements;

-- Показати кількість записів
SELECT COUNT(*) as total_achievements FROM achievements;
