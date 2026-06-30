<?php
// Prevent PHP error output from breaking HTML if database fails in production
error_reporting(0);
ini_set('display_errors', 0);

// Default fallback data in case DB config or connection fails
$user = [
    "name" => "Akshay Mundra",
    "title" => "Python Developer & AI Enthusiast",
    "tagline" => "Building smart solutions with code, creativity & AI",
    "bio_para1" => "I'm a Python Developer and AI Enthusiast pursuing B.Tech in Computer Science at Poornima College of Engineering, Jaipur (2024–2028). I build full-stack web applications and AI-powered automation tools that solve real problems.",
    "bio_para2" => "With hands-on experience at Renao Robotics as a Python Developer Intern and projects recognized at IIT Bombay's AI Eduthon and Smart India Hackathon 2025, I bring both technical depth and a product mindset to everything I build.",
    "location" => "Jaipur, Rajasthan, India",
    "email" => "akshaymundra07@gmail.com",
    "phone" => "+91 9166678361",
    "github_url" => "https://github.com/AkshayMundra19",
    "linkedin_url" => "https://linkedin.com/in/akshay-mundra0101",
    "twitter_url" => "https://x.com/AkshayMundra111",
    "portfolio_url" => "https://akshay-mundra-portfolio-website.vercel.app/"
];

$skillsList = ["Python", "Java", "C++", "SQL", "React", "TypeScript", "Pandas", "NumPy", "Git", "MySQL", "FastAPI"];
$education = [
    ["degree" => "B.Tech CSE", "institution" => "Poornima College of Engineering", "years" => "2024-2028", "status" => "Ongoing"]
];
$experience = [
    ["title" => "Python Developer Intern", "company" => "Renao Robotics Pvt. Ltd.", "duration" => "Jun 2025"]
];
$projects = [
    ["title" => "EduBridge", "subtitle" => "AI Learning Platform", "desc" => "An AI-powered personalized learning platform that creates custom paths, tests, and summarization structures tailored to student needs. Built during IIT Bombay's AI Eduthon."],
    ["title" => "BlockTrip", "subtitle" => "Tourist Safety System", "desc" => "A decentralized and secure tourist tracking and safety recommendation app that flags geographical risks and provides verified emergency routes. Developed for Smart India Hackathon 2025."],
    ["title" => "HomeValuate AI", "subtitle" => "AI-powered house price prediction platform", "desc" => "Built a smart house price prediction platform with a FastAPI-backed ML model, real-time price estimation, market analytics dashboards, a 3-way property comparison tool, and an integrated EMI/home-loan calculator."]
];

// Attempt database connection and query
$dbFile = __DIR__ . '/api/config.php';
if (file_exists($dbFile)) {
    // Modify headers configuration temporarily if config.php forces JSON output
    // We swallow any output headers from config.php
    ob_start();
    include_once $dbFile;
    ob_end_clean();
    
    if (isset($pdo)) {
        try {
            // Fetch User
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = 1");
            $stmt->execute();
            $dbUser = $stmt->fetch();
            if ($dbUser) {
                $user = $dbUser;
            }
            
            // Fetch Education
            $eduStmt = $pdo->prepare("SELECT degree, institution, start_year, end_year, status FROM education WHERE user_id = 1");
            $eduStmt->execute();
            $dbEdu = $eduStmt->fetchAll();
            if ($dbEdu) {
                $education = [];
                foreach ($dbEdu as $e) {
                    $education[] = [
                        "degree" => $e['degree'],
                        "institution" => $e['institution'],
                        "years" => $e['start_year'] . '-' . $e['end_year'],
                        "status" => $e['status']
                    ];
                }
            }
            
            // Fetch Experience
            $expStmt = $pdo->prepare("SELECT title, company, start_date, end_date FROM experience WHERE user_id = 1");
            $expStmt->execute();
            $dbExp = $expStmt->fetchAll();
            if ($dbExp) {
                $experience = [];
                foreach ($dbExp as $ex) {
                    $experience[] = [
                        "title" => $ex['title'],
                        "company" => $ex['company'],
                        "duration" => $ex['start_date'] . ' - ' . ($ex['end_date'] ?: 'Present')
                    ];
                }
            }

            // Fetch Skills
            $skillStmt = $pdo->prepare("SELECT skill_name FROM skills WHERE user_id = 1");
            $skillStmt->execute();
            $dbSkills = $skillStmt->fetchAll();
            if ($dbSkills) {
                $skillsList = array_column($dbSkills, 'skill_name');
            }

            // Fetch Projects
            $projStmt = $pdo->prepare("SELECT title, subtitle, description FROM projects WHERE user_id = 1");
            $projStmt->execute();
            $dbProj = $projStmt->fetchAll();
            if ($dbProj) {
                $projects = [];
                foreach ($dbProj as $p) {
                    $projects[] = [
                        "title" => $p['title'],
                        "subtitle" => $p['subtitle'],
                        "desc" => $p['description']
                    ];
                }
            }
        } catch (Exception $e) {
            // Silently fall back to hardcoded seeds
        }
    }
}

// Meta variables
$metaTitle = htmlspecialchars($user['name'] . " | " . $user['title'] . " — Jaipur");
$metaDesc = htmlspecialchars(mb_strimwidth($user['bio_para1'], 0, 155, "..."));
$profilePhoto = htmlspecialchars($user['portfolio_url'] . "uploads/profile-photo.jpg");
$canonicalUrl = htmlspecialchars($user['portfolio_url']);

// Pre-rendered semantic HTML body
$semanticHtml = "
<header style='padding: 2rem; max-width: 800px; margin: 0 auto;'>
  <h1>" . htmlspecialchars($user['name']) . "</h1>
  <h2>" . htmlspecialchars($user['title']) . "</h2>
  <p>" . htmlspecialchars($user['tagline']) . "</p>
  <p>Location: " . htmlspecialchars($user['location']) . " | Email: " . htmlspecialchars($user['email']) . "</p>
</header>
<main style='padding: 2rem; max-width: 800px; margin: 0 auto;'>
  <section id='about'>
    <h2>About Me</h2>
    <p>" . htmlspecialchars($user['bio_para1']) . "</p>
    <p>" . htmlspecialchars($user['bio_para2']) . "</p>
  </section>
  <section id='education'>
    <h2>Education</h2>";
foreach ($education as $edu) {
    $semanticHtml .= "<div><h3>" . htmlspecialchars($edu['degree']) . "</h3><p>" . htmlspecialchars($edu['institution']) . " (" . htmlspecialchars($edu['years']) . ") - Status: " . htmlspecialchars($edu['status']) . "</p></div>";
}
$semanticHtml .= "</section>
  <section id='experience'>
    <h2>Work Experience</h2>";
foreach ($experience as $exp) {
    $semanticHtml .= "<div><h3>" . htmlspecialchars($exp['title']) . "</h3><p>" . htmlspecialchars($exp['company']) . " (" . htmlspecialchars($exp['duration']) . ")</p></div>";
}
$semanticHtml .= "</section>
  <section id='projects'>
    <h2>Featured Projects</h2>";
foreach ($projects as $proj) {
    $semanticHtml .= "<div><h3>" . htmlspecialchars($proj['title']) . " - " . htmlspecialchars($proj['subtitle']) . "</h3><p>" . htmlspecialchars($proj['desc']) . "</p></div>";
}
$semanticHtml .= "</section>
  <section id='skills'>
    <h2>Technical Skills</h2>
    <p>" . htmlspecialchars(implode(', ', $skillsList)) . "</p>
  </section>
</main>
";

// Create JSON-LD Person schema
$jsonLdSchema = [
    "@context" => "https://schema.org",
    "@type" => "Person",
    "name" => $user['name'],
    "jobTitle" => $user['title'],
    "email" => $user['email'],
    "telephone" => $user['phone'],
    "address" => [
        "@type" => "PostalAddress",
        "addressLocality" => "Jaipur",
        "addressRegion" => "Rajasthan",
        "addressCountry" => "IN"
    ],
    "url" => $canonicalUrl,
    "image" => $profilePhoto,
    "sameAs" => [
        $user['github_url'],
        $user['linkedin_url'],
        $user['twitter_url']
    ],
    "alumniOf" => [
        "@type" => "EducationalOrganization",
        "name" => "Poornima College of Engineering"
    ],
    "knowsAbout" => $skillsList
];
$jsonLdScript = "<script type=\"application/ld+json\">" . json_encode($jsonLdSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "</script>";

// Generate SEO meta tags string
$seoMetaTags = "
    <!-- SEO Meta Tags -->
    <meta name=\"description\" content=\"$metaDesc\" />
    <meta name=\"keywords\" content=\"" . htmlspecialchars(implode(', ', $skillsList)) . ", Developer Portfolio, Python Developer, AI Developer\" />
    <link rel=\"canonical\" href=\"$canonicalUrl\" />

    <!-- Open Graph / Facebook -->
    <meta property=\"og:type\" content=\"website\" />
    <meta property=\"og:url\" content=\"$canonicalUrl\" />
    <meta property=\"og:title\" content=\"$metaTitle\" />
    <meta property=\"og:description\" content=\"$metaDesc\" />
    <meta property=\"og:image\" content=\"$profilePhoto\" />

    <!-- Twitter -->
    <meta property=\"twitter:card\" content=\"summary_large_image\" />
    <meta property=\"twitter:url\" content=\"$canonicalUrl\" />
    <meta property=\"twitter:title\" content=\"$metaTitle\" />
    <meta property=\"twitter:description\" content=\"$metaDesc\" />
    <meta property=\"twitter:image\" content=\"$profilePhoto\" />
    
    $jsonLdScript
";

// Read build output shell dist/index.html or dist/index.php (postbuild rename target)
$buildHtmlPath = __DIR__ . '/dist/index.html';
if (!file_exists($buildHtmlPath)) {
    $buildHtmlPath = __DIR__ . '/dist/index.php';
}

if (file_exists($buildHtmlPath)) {
    $htmlContent = file_get_contents($buildHtmlPath);
    
    // Inject Title
    $htmlContent = preg_replace('/<title>.*?<\/title>/', "<title>$metaTitle</title>", $htmlContent);
    
    // Inject SEO Meta tags before </head>
    $htmlContent = str_replace('</head>', $seoMetaTags . '</head>', $htmlContent);
    
    // Inject Semantic pre-rendered content inside root div for crawler indexing
    $htmlContent = str_replace('<div id="root"></div>', "<div id=\"root\">$semanticHtml</div>", $htmlContent);
    
    echo $htmlContent;
} else {
    // fallback template if Vite build hasn't run or we are debugging
    ?>
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?php echo $metaTitle; ?></title>
        <?php echo $seoMetaTags; ?>
      </head>
      <body>
        <div id="root">
          <?php echo $semanticHtml; ?>
          <p style="text-align: center; padding: 2rem; font-family: sans-serif; color: #5A6E83;">
            Note: React build assets not found. Run <code style="background: #eee; padding: 2px 4px;">npm run build</code> locally to bundle the full interactive experience.
          </p>
        </div>
      </body>
    </html>
    <?php
}
?>
