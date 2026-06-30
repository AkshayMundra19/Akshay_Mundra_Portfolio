<?php
require_once __DIR__ . '/config.php';

// Accept only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit();
}

// Get POST input (JSON or form data)
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$senderName = trim($input['name'] ?? '');
$senderEmail = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'New Portfolio Contact Message');
$message = trim($input['message'] ?? '');
$userId = isset($input['user_id']) ? (int)$input['user_id'] : 1;

// Server-side validation
if (empty($senderName) || empty($senderEmail) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Please fill in all required fields (name, email, message)."]);
    exit();
}

if (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Please provide a valid email address."]);
    exit();
}

try {
    // Insert into contact_messages table
    $stmt = $pdo->prepare("INSERT INTO contact_messages (user_id, sender_name, sender_email, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$userId, $senderName, $senderEmail, $subject, $message]);
    
    // Get user's email to send notification
    $userStmt = $pdo->prepare("SELECT email, name FROM users WHERE id = ?");
    $userStmt->execute([$userId]);
    $user = $userStmt->fetch();
    
    $recipientEmail = $user ? $user['email'] : 'akshaymundra07@gmail.com';
    
    // Attempt to send email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: Portfolio Contact Form <noreply@akshaymundra.dev>" . "\r\n";
    $headers .= "Reply-To: $senderName <$senderEmail>" . "\r\n";
    
    $emailSubject = "Portfolio Contact: " . $subject;
    $emailBody = "
        <html>
        <head>
            <title>New Message From Portfolio Website</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <h2>New Message Details</h2>
            <p><strong>Name:</strong> " . htmlspecialchars($senderName) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($senderEmail) . "</p>
            <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
            <p><strong>Message:</strong></p>
            <p style='background: #f4f4f4; padding: 15px; border-left: 4px solid #0891B2;'>" . nl2br(htmlspecialchars($message)) . "</p>
        </body>
        </html>
    ";
    
    // Send email silently (don't throw error if mail server is not configured in local environment)
    @mail($recipientEmail, $emailSubject, $emailBody, $headers);
    
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully! We will get back to you soon."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to save message to database",
        "message" => $e->getMessage()
    ]);
}
