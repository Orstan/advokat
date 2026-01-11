-- SQL скрипт для створення таблиці testimonials
-- Використовуйте цей скрипт в phpMyAdmin або будь-якому іншому MySQL клієнті

-- Створення таблиці testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Унікальний ідентифікатор',
    name VARCHAR(255) NOT NULL COMMENT 'Ім\'я автора відгуку',
    email VARCHAR(255) DEFAULT NULL COMMENT 'Email автора (не публікується на сайті)',
    rating INT NOT NULL COMMENT 'Оцінка від 1 до 5 зірок',
    text TEXT NOT NULL COMMENT 'Текст відгуку',
    is_visible TINYINT(1) DEFAULT 1 COMMENT 'Видимість відгуку на сайті (1 - показується, 0 - прихований)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата та час створення відгуку',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Дата та час останнього оновлення',
    INDEX idx_visible_created (is_visible, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблиця відгуків клієнтів';

-- Перевірка створення таблиці
SELECT 'Таблиця testimonials успішно створена!' AS status;

-- Показати структуру таблиці
DESCRIBE testimonials;

-- Показати кількість записів
SELECT COUNT(*) as total_testimonials FROM testimonials;
