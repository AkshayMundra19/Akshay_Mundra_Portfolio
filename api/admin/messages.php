<?php
require_once __DIR__ . '/../config.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized access. Please login first."]);
    exit();
}

$userId = $_SESSION['user_id'];
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // Fetch all contact messages
        $stmt = $pdo->prepare("SELECT id, sender_name, sender_email, subject, message, is_read, created_at FROM contact_messages WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $messages = $stmt->fetchAll();
        
        // Convert to boolean for JSON
        foreach ($messages as &$msg) {
            $msg['is_read'] = (bool)$msg['is_read'];
        }
        
        echo json_encode($messages);
        exit();
    } 
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }
        
        $action = $input['action'] ?? '';
        $messageId = (int)($input['message_id'] ?? 0);
        
        if (!$messageId) {
            http_response_code(400);
            echo json_encode(["error" => "Message ID is required."]);
            exit();
        }
        
        if ($action === 'read') {
            $stmt = $pdo->prepare("UPDATE contact_messages SET is_read = TRUE WHERE id = ? AND user_id = ?");
            $stmt->execute([$messageId, $userId]);
            echo json_encode(["success" => true, "message" => "Message marked as read."]);
            exit();
        } 
        
        if ($action === 'delete') {
            $stmt = $pdo->prepare("DELETE FROM contact_messages WHERE id = ? AND user_id = ?");
            $stmt->execute([$messageId, $userId]);
            echo json_encode(["success" => true, "message" => "Message deleted successfully."]);
            exit();
        }
        
        http_response_code(400);
        echo json_encode(["error" => "Invalid action specified."]);
        exit();
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database action failed",
        "message" => $e->getMessage()
    ]);
}
