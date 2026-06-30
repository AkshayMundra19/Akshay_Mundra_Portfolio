<?php
require_once __DIR__ . '/config.php';

// Single tenant mode default user ID is 1 (Akshay Mundra)
$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 1;

try {
    // 1. Fetch User details
    $userStmt = $pdo->prepare("SELECT id, name, email, phone, location, title, tagline, bio_para1, bio_para2, profile_photo_url, resume_pdf_url, github_username, github_url, linkedin_url, twitter_url, portfolio_url, available_for_work FROM users WHERE id = ?");
    $userStmt->execute([$userId]);
    $user = $userStmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        exit();
    }

    // Convert available_for_work to boolean
    $user['available_for_work'] = (bool)$user['available_for_work'];

    // 2. Fetch Education
    $eduStmt = $pdo->prepare("SELECT id, degree, institution, start_year, end_year, status FROM education WHERE user_id = ?");
    $eduStmt->execute([$userId]);
    $education = $eduStmt->fetchAll();

    // 3. Fetch Experience (with nested bullets and tags)
    $expStmt = $pdo->prepare("SELECT id, title, company, company_url, location, start_date, end_date, badge_label, sort_order FROM experience WHERE user_id = ? ORDER BY sort_order ASC, id DESC");
    $expStmt->execute([$userId]);
    $experiences = $expStmt->fetchAll();

    if (count($experiences) > 0) {
        $expIds = array_column($experiences, 'id');
        $inQuery = implode(',', array_fill(0, count($expIds), '?'));

        // Fetch Bullets
        $bulletStmt = $pdo->prepare("SELECT id, experience_id, bullet_text, sort_order FROM experience_bullets WHERE experience_id IN ($inQuery) ORDER BY sort_order ASC");
        $bulletStmt->execute($expIds);
        $bullets = $bulletStmt->fetchAll();

        // Fetch Tags
        $tagStmt = $pdo->prepare("SELECT id, experience_id, tag_name FROM experience_tags WHERE experience_id IN ($inQuery)");
        $tagStmt->execute($expIds);
        $tags = $tagStmt->fetchAll();

        // Map bullets and tags to experiences
        foreach ($experiences as &$exp) {
            $exp['bullets'] = [];
            foreach ($bullets as $b) {
                if ($b['experience_id'] == $exp['id']) {
                    $exp['bullets'][] = $b['bullet_text'];
                }
            }

            $exp['tags'] = [];
            foreach ($tags as $t) {
                if ($t['experience_id'] == $exp['id']) {
                    $exp['tags'][] = $t['tag_name'];
                }
            }
        }
    }

    // 4. Fetch Skills (Group by category)
    $skillsStmt = $pdo->prepare("SELECT id, category, skill_name, proficiency_percent, sort_order FROM skills WHERE user_id = ? ORDER BY category, sort_order ASC");
    $skillsStmt->execute([$userId]);
    $rawSkills = $skillsStmt->fetchAll();
    
    $skills = [
        "programming" => [],
        "frameworks" => [],
        "tools" => []
    ];
    foreach ($rawSkills as $s) {
        $cat = $s['category'];
        if (isset($skills[$cat])) {
            $skills[$cat][] = [
                "name" => $s['skill_name'],
                "level" => (int)$s['proficiency_percent']
            ];
        }
    }

    // 5. Fetch Featured Projects (with nested features and tags)
    $projStmt = $pdo->prepare("SELECT id, title, subtitle, description, badge_label, badge_color, image_url, github_url, live_demo_url, start_date, end_date, sort_order FROM projects WHERE user_id = ? ORDER BY sort_order ASC, id DESC");
    $projStmt->execute([$userId]);
    $projects = $projStmt->fetchAll();

    if (count($projects) > 0) {
        $projIds = array_column($projects, 'id');
        $inQueryProj = implode(',', array_fill(0, count($projIds), '?'));

        // Fetch Features
        $featStmt = $pdo->prepare("SELECT id, project_id, feature_text FROM project_features WHERE project_id IN ($inQueryProj)");
        $featStmt->execute($projIds);
        $features = $featStmt->fetchAll();

        // Fetch Tags
        $projTagStmt = $pdo->prepare("SELECT id, project_id, tag_name FROM project_tags WHERE project_id IN ($inQueryProj)");
        $projTagStmt->execute($projIds);
        $projTags = $projTagStmt->fetchAll();

        // Map features and tags to projects
        foreach ($projects as &$proj) {
            $proj['features'] = [];
            foreach ($features as $f) {
                if ($f['project_id'] == $proj['id']) {
                    $proj['features'][] = $f['feature_text'];
                }
            }

            $proj['tags'] = [];
            foreach ($projTags as $pt) {
                if ($pt['project_id'] == $proj['id']) {
                    $proj['tags'][] = $pt['tag_name'];
                }
            }
        }
    }

    // 6. Fetch Achievements
    $achStmt = $pdo->prepare("SELECT id, title, organization, year, description, icon, sort_order FROM achievements WHERE user_id = ? ORDER BY sort_order ASC, id DESC");
    $achStmt->execute([$userId]);
    $achievements = $achStmt->fetchAll();

    // 7. Fetch Certifications
    $certStmt = $pdo->prepare("SELECT id, title, issuer, date_earned, icon, credential_url, sort_order FROM certifications WHERE user_id = ? ORDER BY sort_order ASC, id DESC");
    $certStmt->execute([$userId]);
    $certifications = $certStmt->fetchAll();

    // 8. Fetch Site Stats
    $statsStmt = $pdo->prepare("SELECT id, stat_label, stat_value, sort_order FROM site_stats WHERE user_id = ? ORDER BY sort_order ASC");
    $statsStmt->execute([$userId]);
    $siteStats = $statsStmt->fetchAll();

    // Compile into final portfolio object
    $portfolio = [
        "user" => $user,
        "education" => $education,
        "experience" => $experiences,
        "skills" => $skills,
        "projects" => $projects,
        "achievements" => $achievements,
        "certifications" => $certifications,
        "site_stats" => $siteStats
    ];

    echo json_encode($portfolio);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to fetch portfolio data",
        "message" => $e->getMessage()
    ]);
}
