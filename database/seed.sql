-- Seed data for Akshay Mundra Portfolio
USE portfolio_db;

-- Clear existing data if necessary (order respects foreign keys)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE site_stats;
TRUNCATE TABLE contact_messages;
TRUNCATE TABLE certifications;
TRUNCATE TABLE achievements;
TRUNCATE TABLE github_cache;
TRUNCATE TABLE project_tags;
TRUNCATE TABLE project_features;
TRUNCATE TABLE projects;
TRUNCATE TABLE skills;
TRUNCATE TABLE experience_tags;
TRUNCATE TABLE experience_bullets;
TRUNCATE TABLE experience;
TRUNCATE TABLE education;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Akshay Mundra profile into users table
-- Password hash generated using password_hash('admin123', PASSWORD_BCRYPT)
INSERT INTO users (
    id, name, email, phone, location, title, tagline, 
    bio_para1, bio_para2, 
    profile_photo_url, resume_pdf_url, 
    github_username, github_url, linkedin_url, twitter_url, portfolio_url, 
    available_for_work, password_hash
) VALUES (
    1, 
    'Akshay Mundra', 
    'akshaymundra07@gmail.com', 
    '+91 9166678361', 
    'Jaipur, Rajasthan, India', 
    'Python Developer & AI Enthusiast', 
    'Building smart solutions with code, creativity & AI', 
    'I\'m a Python Developer and AI Enthusiast pursuing B.Tech in Computer Science at Poornima College of Engineering, Jaipur (2024–2028). I build full-stack web applications and AI-powered automation tools that solve real problems.', 
    'With hands-on experience at Renao Robotics as a Python Developer Intern and projects recognized at IIT Bombay\'s AI Eduthon and Smart India Hackathon 2025, I bring both technical depth and a product mindset to everything I build.', 
    '/uploads/profile-photo.jpg', 
    '/uploads/resume.pdf', 
    'AkshayMundra19', 
    'https://github.com/AkshayMundra19', 
    'https://linkedin.com/in/akshay-mundra0101', 
    'https://x.com/AkshayMundra111', 
    'https://akshay-mundra-portfolio-website.vercel.app/', 
    TRUE, 
    '$2y$10$U2PqX5B4G5Nn6WnQG7G5Ze1qA2O/k9r/K6z/2gq9F7k2h6mP0j3vK'
);

-- 2. Education Data
INSERT INTO education (user_id, degree, institution, start_year, end_year, status) 
VALUES (1, 'B.Tech CSE', 'Poornima College of Engineering', '2024', '2028', 'Ongoing');

-- 3. Experience Data
INSERT INTO experience (id, user_id, title, company, company_url, location, start_date, end_date, badge_label, sort_order) 
VALUES (1, 1, 'Python Developer Intern', 'Renao Robotics Pvt. Ltd.', '', 'Jaipur, India', 'Jun 2025', 'Jun 2025', 'Internship', 1);

-- 4. Experience Bullets
INSERT INTO experience_bullets (experience_id, bullet_text, sort_order) VALUES 
(1, 'Engineered Python-based automation solutions using core language concepts, libraries, and frameworks to solve real-world business problems.', 1),
(1, 'Built a Multiple ID Generator application using Python and Pillow that produces personal and government-style ID card images from a single input, improving process efficiency.', 2),
(1, 'Applied strong problem-solving skills and efficient coding practices in a fast-paced startup environment.', 3);

-- 5. Experience Tags
INSERT INTO experience_tags (experience_id, tag_name) VALUES 
(1, 'Python'),
(1, 'Automation'),
(1, 'Pillow'),
(1, 'ID Systems');

-- 6. Skills Data
-- category (enum: programming/frameworks/tools)
-- Programming Skills
INSERT INTO skills (user_id, category, skill_name, proficiency_percent, sort_order) VALUES
(1, 'programming', 'Python', 92, 1),
(1, 'programming', 'Java', 75, 2),
(1, 'programming', 'C++', 70, 3),
(1, 'programming', 'SQL', 80, 4),
(1, 'programming', 'Flutter/Kotlin', 65, 5);

-- Framework Skills
INSERT INTO skills (user_id, category, skill_name, proficiency_percent, sort_order) VALUES
(1, 'frameworks', 'React', 82, 1),
(1, 'frameworks', 'TypeScript', 72, 2),
(1, 'frameworks', 'Pandas & NumPy', 88, 3),
(1, 'frameworks', 'Matplotlib', 80, 4),
(1, 'frameworks', 'Seaborn', 75, 5);

-- Tools Skills
INSERT INTO skills (user_id, category, skill_name, proficiency_percent, sort_order) VALUES
(1, 'tools', 'Git/GitHub', 88, 1),
(1, 'tools', 'VS Code', 95, 2),
(1, 'tools', 'Android Studio', 70, 3),
(1, 'tools', 'MySQL', 78, 4),
(1, 'tools', 'Vite', 80, 5),
(1, 'tools', 'Gemini API', 85, 6),
(1, 'tools', 'Google Maps API', 80, 7);

-- 7. Featured Projects Data
INSERT INTO projects (id, user_id, title, subtitle, description, badge_label, badge_color, image_url, github_url, live_demo_url, start_date, end_date, sort_order) VALUES
(1, 1, 'EduBridge', 'AI Learning Platform', 'An AI-powered personalized learning platform that creates custom paths, tests, and summarization structures tailored to student needs. Built during IIT Bombay\'s AI Eduthon.', 'IIT Bombay Finalist', 'purple', '/uploads/projects/edubridge.jpg', 'https://github.com/Aditiii637/EduBridge', '', 'Jan 2025', 'Jan 2025', 1),
(2, 1, 'BlockTrip', 'Tourist Safety System', 'A decentralized and secure tourist tracking and safety recommendation app that flags geographical risks and provides verified emergency routes. Developed for Smart India Hackathon 2025.', 'Hackathon Project', 'green', '/uploads/projects/blocktrip.jpg', 'https://github.com/AkshayMundra19', 'https://block-trip.vercel.app/', 'Feb 2025', 'Feb 2025', 2),
(3, 1, 'HomeValuate AI', 'AI-powered house price prediction platform', 'Built a smart house price prediction platform with a FastAPI-backed ML model, real-time price estimation, market analytics dashboards, a 3-way property comparison tool, and an integrated EMI/home-loan calculator.', 'AI/ML Project', 'cyan', '/uploads/projects/homevaluate.jpg', 'https://github.com/AkshayMundra19/house-price-prediction-main', 'https://house-price-prediction-main.vercel.app/', 'Mar 2025', 'Apr 2025', 3);

-- 8. Project Features
-- EduBridge features
INSERT INTO project_features (project_id, feature_text) VALUES
(1, 'AI-driven curriculum recommendations'),
(1, 'Automated quiz generation'),
(1, 'Interactive content summarization');

-- BlockTrip features
INSERT INTO project_features (project_id, feature_text) VALUES
(2, 'Real-time geographical risk scoring'),
(2, 'Verified decentralized emergency route planning'),
(2, 'Offline emergency contacts & integration');

-- HomeValuate AI features
INSERT INTO project_features (project_id, feature_text) VALUES
(3, 'AI Price Prediction Engine'),
(3, 'Market Analytics Dashboard'),
(3, 'Property Comparison Tool'),
(3, 'EMI Calculator'),
(3, 'Explainable Prediction Signals');

-- 9. Project Tags
-- EduBridge tags
INSERT INTO project_tags (project_id, tag_name) VALUES
(1, 'React'),
(1, 'Node.js'),
(1, 'Gemini API'),
(1, 'Tailwind CSS');

-- BlockTrip tags
INSERT INTO project_tags (project_id, tag_name) VALUES
(2, 'Flutter'),
(2, 'Firebase'),
(2, 'Google Maps API'),
(2, 'Node.js');

-- HomeValuate AI tags
INSERT INTO project_tags (project_id, tag_name) VALUES
(3, 'FastAPI'),
(3, 'Python'),
(3, 'Machine Learning'),
(3, 'React'),
(3, 'Data Visualization');

-- 11. Achievements Data
INSERT INTO achievements (user_id, title, organization, year, description, icon, sort_order) VALUES
(1, 'AI Eduthon Finalist', 'IIT Bombay Techfest', '2025', 'Recognized among the top teams at the national level for developing EduBridge, an AI learning assistant.', 'Award', 1),
(1, 'Smart India Hackathon 2025 Nominee', 'Government of India', '2025', 'Nominated by college to represent at national SIH level for BlockTrip safety solution.', 'Shield', 2);

-- 12. Certifications Data
INSERT INTO certifications (user_id, title, issuer, date_earned, icon, credential_url, sort_order) VALUES
(1, 'Google Gemini Certified Student', 'Google for Education', 'Dec 2025', 'Award', 'https://drive.google.com/file/d/1MC03Rem6Tb3G84jwE0VVr96e62h8nSsB/view?usp=drive_link', 1),
(1, 'Generative AI Workshop: RAG, AI Agents and Agentic AI', 'GUVI|HCL', 'Apr 2026', 'Cpu', 'https://drive.google.com/file/d/1_H_FFVrwKysR0D2IwJLuXLBQaFl0_IuF/view?usp=drive_link', 2),
(1, 'Python Developer Internship Certificate', 'Renao Robotics Pvt. Ltd.', 'Jun 2025', 'FileText', 'https://drive.google.com/file/d/1K-hxRcYZAuE2EmBB02fu8OvHpvEtj6Gq/view?usp=drive_link', 3),
(1, 'Basics of Data Structures and Algorithms', 'Code 9458405', 'Nov 2025', 'Code', 'https://drive.google.com/file/d/1s6ZB55ISlTH_o5raVThEoZrdH0ND1bKR/view?usp=drive_link', 4);

-- 14. Site Stats Data
INSERT INTO site_stats (user_id, stat_label, stat_value, sort_order) VALUES
(1, 'Years Coding', '1+', 1),
(1, 'Projects Built', '5+', 2),
(1, 'Languages', '6', 3),
(1, 'Hackathons', '2', 4);
