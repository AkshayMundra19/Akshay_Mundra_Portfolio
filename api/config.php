<?php
// Only send CORS and JSON headers if config is NOT loaded by the main web index.php (SSR)
if (basename($_SERVER['SCRIPT_NAME']) !== 'index.php') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");

    // Handle preflight OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'u653354902_portfolio');
define('DB_USER', 'u123456789_akshaymundra19');
define('DB_PASS', 'Akshay@19032004');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database connection failed",
        "message" => "Could not connect to the database. Verify your credentials in config.php."
    ]);
    exit();
}
