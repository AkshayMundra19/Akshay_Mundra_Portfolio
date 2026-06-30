<?php
require_once __DIR__ . '/config.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 1;
$cacheType = 'stats';
$githubUsername = 'AkshayMundra19';

// 1. Check database cache
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
    if (time() - $fetchedTime < 3600) {
        $cacheValid = true;
    }
}

if ($cacheValid && $cache) {
    echo $cache['data_json'];
    exit();
}

// 2. Fetch fresh stats
// Helper function to call GitHub API
function github_api_get($url) {
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
    
    return [
        "code" => $httpCode,
        "body" => $response
    ];
}

$profileRes = github_api_get("https://api.github.com/users/" . urlencode($githubUsername));
$reposRes = github_api_get("https://api.github.com/users/" . urlencode($githubUsername) . "/repos?per_page=100");

if ($profileRes['code'] === 200 && $reposRes['code'] === 200) {
    $profileData = json_decode($profileRes['body'], true);
    $reposData = json_decode($reposRes['body'], true);
    
    if (is_array($profileData) && is_array($reposData)) {
        $publicReposCount = $profileData['public_repos'] ?? 0;
        $totalStars = 0;
        $languagesCount = [];
        $totalNonForkRepos = 0;
        
        foreach ($reposData as $repo) {
            // Exclude forks for stats aggregation
            if (isset($repo['fork']) && $repo['fork']) {
                continue;
            }
            
            $totalNonForkRepos++;
            $totalStars += (int)($repo['stargazers_count'] ?? 0);
            
            if (!empty($repo['language'])) {
                $lang = $repo['language'];
                $languagesCount[$lang] = ($languagesCount[$lang] ?? 0) + 1;
            }
        }
        
        // Calculate percentages for languages
        $languages = [];
        $totalLangRepos = array_sum($languagesCount);
        
        if ($totalLangRepos > 0) {
            foreach ($languagesCount as $lang => $count) {
                $languages[] = [
                    "name" => $lang,
                    "count" => $count,
                    "percentage" => round(($count / $totalLangRepos) * 100, 1)
                ];
            }
            // Sort by percentage descending
            usort($languages, function($a, $b) {
                return $b['percentage'] <=> $a['percentage'];
            });
        }
        
        // Structure the final stats payload
        $stats = [
            "public_repos" => $publicReposCount,
            "total_stars" => $totalStars,
            "followers" => $profileData['followers'] ?? 0,
            "languages" => $languages,
            "widgets" => [
                "profile_stats" => "https://github-readme-stats.vercel.app/api?username=" . urlencode($githubUsername) . "&show_icons=true&theme=transparent",
                "streak_stats" => "https://github-readme-streak-stats.herokuapp.com/?user=" . urlencode($githubUsername) . "&theme=transparent"
            ]
        ];
        
        $jsonData = json_encode($stats);
        
        // 3. Cache the statistics
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
            // Ignore DB cache errors
        }
        
        echo $jsonData;
        exit();
    }
}

// 4. Fallback if API fails
if ($cache) {
    echo $cache['data_json'];
} else {
    http_response_code(502);
    echo json_encode([
        "error" => "Failed to fetch GitHub stats and no cache available",
        "fallback" => [
            "public_repos" => 0,
            "total_stars" => 0,
            "followers" => 0,
            "languages" => [],
            "widgets" => [
                "profile_stats" => "https://github-readme-stats.vercel.app/api?username=" . urlencode($githubUsername) . "&show_icons=true&theme=transparent",
                "streak_stats" => "https://github-readme-streak-stats.herokuapp.com/?user=" . urlencode($githubUsername) . "&theme=transparent"
            ]
        ]
    ]);
}
