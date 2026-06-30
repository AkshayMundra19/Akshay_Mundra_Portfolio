<?php
require_once __DIR__ . '/config.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 1;
$cacheType = 'repos';
$githubUsername = 'AkshayMundra19';

// 1. Check for cached data
try {
    $cacheStmt = $pdo->prepare("SELECT data_json, fetched_at FROM github_cache WHERE user_id = ? AND cache_type = ?");
    $cacheStmt->execute([$userId, $cacheType]);
    $cache = $cacheStmt->fetch();
} catch (PDOException $e) {
    $cache = null;
}

$cacheValid = false;
if ($cache) {
    $fetchedTime = strtotime($cache['fetched_at']);
    // Cache is valid for 1 hour (3600 seconds)
    if (time() - $fetchedTime < 3600) {
        $cacheValid = true;
    }
}

if ($cacheValid && $cache) {
    // Return cached data
    echo $cache['data_json'];
    exit();
}

// 2. Fetch from GitHub API since cache is stale or missing
$url = "https://api.github.com/users/" . urlencode($githubUsername) . "/repos?sort=updated&per_page=20";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "User-Agent: AkshayMundra-Portfolio-API (akshaymundra07@gmail.com)",
    "Accept: application/vnd.github.v3+json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$projects = [];

if ($httpCode === 200 && $response) {
    $repos = json_decode($response, true);
    
    if (is_array($repos)) {
        foreach ($repos as $repo) {
            // Filter out forks
            if (isset($repo['fork']) && $repo['fork']) {
                continue;
            }
            
            // Extract relevant fields
            $projects[] = [
                "name" => $repo['name'] ?? '',
                "description" => $repo['description'] ?? '',
                "html_url" => $repo['html_url'] ?? '',
                "homepage" => $repo['homepage'] ?? '',
                "language" => $repo['language'] ?? '',
                "stargazers_count" => (int)($repo['stargazers_count'] ?? 0),
                "topics" => $repo['topics'] ?? [],
                "updated_at" => $repo['updated_at'] ?? '',
                "fork" => false
            ];
        }
        
        $jsonData = json_encode($projects);
        
        // 3. Save or update cache in database
        try {
            $checkStmt = $pdo->prepare("SELECT id FROM github_cache WHERE user_id = ? AND cache_type = ?");
            $checkStmt->execute([$userId, $cacheType]);
            $cacheRow = $checkStmt->fetch();
            
            if ($cacheRow) {
                $updateStmt = $pdo->prepare("UPDATE github_cache SET data_json = ?, fetched_at = CURRENT_TIMESTAMP WHERE id = ?");
                $updateStmt->execute([$jsonData, $cacheRow['id']]);
            } else {
                $insertStmt = $pdo->prepare("INSERT INTO github_cache (user_id, data_json, cache_type) VALUES (?, ?, ?)");
                $insertStmt->execute([$userId, $jsonData, $cacheType]);
            }
        } catch (PDOException $e) {
            // Ignore database cache write failures to ensure API still returns data
        }
        
        echo $jsonData;
        exit();
    }
}

// 4. Fallback if GitHub API fails
if ($cache) {
    // If we have stale cache, serve it rather than failing
    echo $cache['data_json'];
} else {
    // Return empty array
    http_response_code(502);
    echo json_encode([
        "error" => "Failed to fetch from GitHub and no cache available",
        "fallback" => []
    ]);
}
