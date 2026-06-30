# Akshay Mundra Full-Stack Developer Portfolio

A production-ready, highly-optimized developer portfolio website built using a React (Vite) frontend, a secure PHP REST API, and a multi-tenant-ready MySQL database schema.

---

## Technical Stack & Features
- **Frontend**: React (Vite) + Tailwind CSS v4 + Framer Motion (animations)
- **Backend**: PHP REST API (PDO, Prepared Statements, session auth)
- **Database**: MySQL (Multi-tenant ready schema, every table holds a `user_id` foreign key)
- **GitHub Sync**: Automatic 1-hour MySQL cached integration for live repositories & contribution widgets
- **SEO & SSR**: PHP shell (`index.php`) pre-renders metadata tags, canonical records, JSON-LD schema, and semantic text content before React loads
- **Design System**: High contrast, light/dark responsive theme variables (no Three.js / WebGL errors)

---

## File Structure
```text
/
├── api/
│   ├── admin/
│   │   ├── login.php
│   │   └── messages.php
│   ├── config.php
│   ├── portfolio.php
│   ├── github-projects.php
│   ├── github-stats.php
│   ├── contact.php
│   └── resume.php
├── uploads/
│   ├── profile-photo.jpg (WebP compressed)
│   ├── resume.pdf
│   └── projects/
│       ├── edubridge.jpg
│       ├── blocktrip.jpg
│       └── homevaluate.jpg
├── database/
│   ├── schema.sql
│   └── seed.sql
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt
├── src/
│   ├── components/  # Navbar, Hero, About, Projects, etc.
│   ├── context/     # PortfolioContext.jsx
│   ├── hooks/       # usePortfolioData.js, useGithubData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.php        # Pre-rendering shell (SSR)
├── package.json
└── vite.config.js
```

---

## Local Setup Instructions

### 1. Database Setup
1. Start your local MySQL server (e.g., via XAMPP, WAMP, or standalone MySQL).
2. Create a new database:
   ```sql
   CREATE DATABASE portfolio_db;
   ```
3. Import the schema:
   ```bash
   mysql -u root -p portfolio_db < database/schema.sql
   ```
4. Seed the database with Akshay Mundra's profile data:
   ```bash
   mysql -u root -p portfolio_db < database/seed.sql
   ```

### 2. Backend Config Setup
Open `/api/config.php` and configure your database host, database name, username, and password if they differ from standard:
```php
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'portfolio_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
```

### 3. Backend Dev Server Setup (PHP)
To serve the API endpoints locally, start the built-in PHP development server at the root directory of the project:
```bash
php -S localhost:8000
```
This routes all `/api/*` and resource queries correctly. Vite's local dev server is configured to proxy `/api` calls directly to this instance.

### 4. Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the Vite development server:
   ```bash
   npm run dev
   ```

---

## Deployment Guidelines

### PHP API & Uploads
1. Deploy the `/api/` and `/uploads/` folders to your PHP hosting provider (e.g., Hostinger, Railway, cPanel shared hosting).
2. Import the MySQL tables into your production database and update the credentials in `/api/config.php` (preferably using Environment Variables like `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`).
3. Set the default upload folder write permissions to allow file upload/download actions.

### React Frontend
1. Build the production React assets:
   ```bash
   npm run build
   ```
2. The `postbuild` script automatically renames `dist/index.html` to `dist/index.php`. This allows search engines to index pre-rendered server contents directly from `index.php`.
3. Set the `VITE_API_URL` environment variable to point to your deployed PHP API root domain (e.g., `https://api.akshaymundra.dev`).
4. Upload the files inside `dist/` and `index.php` directly to your production root server.
