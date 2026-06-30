-- Database Schema for Akshay Mundra Portfolio & Multi-Tenant Builder
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 1. Users Table (Core tenant info)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    title VARCHAR(255),
    tagline VARCHAR(255),
    bio_para1 TEXT,
    bio_para2 TEXT,
    profile_photo_url VARCHAR(255),
    resume_pdf_url VARCHAR(255),
    github_username VARCHAR(100),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    available_for_work BOOLEAN DEFAULT TRUE,
    password_hash VARCHAR(255), -- For admin interface verification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Education Table
CREATE TABLE IF NOT EXISTS education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    start_year VARCHAR(50),
    end_year VARCHAR(50),
    status VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Experience Table
CREATE TABLE IF NOT EXISTS experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_url VARCHAR(255),
    location VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    badge_label VARCHAR(100),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Experience Bullets Table
CREATE TABLE IF NOT EXISTS experience_bullets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    experience_id INT NOT NULL,
    bullet_text TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Experience Tags Table
CREATE TABLE IF NOT EXISTS experience_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    experience_id INT NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category ENUM('programming', 'frameworks', 'tools') NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_percent INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    badge_label VARCHAR(100),
    badge_color VARCHAR(50),
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Project Features Table
CREATE TABLE IF NOT EXISTS project_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    feature_text TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Project Tags Table
CREATE TABLE IF NOT EXISTS project_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. GitHub Cache Table
CREATE TABLE IF NOT EXISTS github_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    data_json LONGTEXT NOT NULL,
    cache_type ENUM('repos', 'stats') NOT NULL,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    year VARCHAR(50),
    description TEXT,
    icon VARCHAR(100),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date_earned VARCHAR(50),
    icon VARCHAR(100),
    credential_url VARCHAR(255),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Site Stats Table
CREATE TABLE IF NOT EXISTS site_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stat_label VARCHAR(100) NOT NULL,
    stat_value VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
