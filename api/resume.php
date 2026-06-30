<?php
$filePath = __DIR__ . '/../uploads/resume.pdf';

if (file_exists($filePath)) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="Akshay_Mundra_Resume.pdf"');
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
    exit();
} else {
    // Redirect to the fallback Google Drive link if the local file does not exist yet
    header('Location: https://drive.google.com/file/d/1qK3d4cBk7d2n5HWm87vxXgu3A1rgi1Wk/view?usp=drive_link');
    exit();
}
