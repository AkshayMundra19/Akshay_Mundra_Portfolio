import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export default function useGithubData() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        setLoading(true);
        let reposData = [];
        let statsData = null;
        let fetchedViaBackup = false;

        // Try local PHP endpoints first (unless static-only is flagged)
        if (import.meta.env.VITE_STATIC_ONLY !== 'true') {
          try {
            const [projectsRes, statsRes] = await Promise.all([
              fetch(`${API_BASE_URL}/github-projects.php`),
              fetch(`${API_BASE_URL}/github-stats.php`)
            ]);

            if (projectsRes.ok && statsRes.ok) {
              reposData = await projectsRes.json();
              statsData = await statsRes.json();
            } else {
              throw new Error("Local PHP endpoints returned non-ok status");
            }
          } catch (localErr) {
            console.warn("PHP API backend unavailable, falling back to public GitHub APIs:", localErr);
            fetchedViaBackup = true;
          }
        } else {
          fetchedViaBackup = true;
        }

        // If local API failed or we are in static-only mode, call public GitHub APIs directly
        if (fetchedViaBackup || !statsData) {
          const [reposRes, userRes] = await Promise.all([
            fetch('https://api.github.com/users/AkshayMundra19/repos?per_page=100&sort=updated'),
            fetch('https://api.github.com/users/AkshayMundra19')
          ]);

          if (reposRes.ok && userRes.ok) {
            const rawRepos = await reposRes.json();
            const rawUser = await userRes.json();

            // Filter out forks
            reposData = rawRepos.filter(repo => !repo.fork);

            // Calculate total stars and language distribution
            let totalStars = 0;
            const langCounts = {};
            
            reposData.forEach(repo => {
              totalStars += repo.stargazers_count || 0;
              if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
              }
            });

            const sortedLanguages = Object.entries(langCounts)
              .map(([name, count]) => ({ name, count }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 5);

            statsData = {
              public_repos: rawUser.public_repos || reposData.length,
              total_stars: totalStars,
              followers: rawUser.followers || 0,
              languages: sortedLanguages,
              widgets: {
                profile_stats: "https://github-readme-stats.vercel.app/api?username=AkshayMundra19&show_icons=true&theme=transparent",
                streak_stats: "https://github-readme-streak-stats.herokuapp.com/?user=AkshayMundra19&theme=transparent"
              }
            };
          } else {
            throw new Error("Public GitHub API limits exceeded or network failure");
          }
        }

        // Filter out ATM_System from the general GitHub projects grid as requested
        const filteredRepos = (reposData || [])
          .filter(repo => repo.name !== 'ATM_System')
          .slice(0, 6);

        setProjects(filteredRepos);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching Github data:", err);
        setError(err.message);
        // Fallback default values
        setProjects([]);
        setStats({
          public_repos: 0,
          total_stars: 0,
          followers: 0,
          languages: [],
          widgets: {
            profile_stats: "https://github-readme-stats.vercel.app/api?username=AkshayMundra19&show_icons=true&theme=transparent",
            streak_stats: "https://github-readme-streak-stats.herokuapp.com/?user=AkshayMundra19&theme=transparent"
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGithubData();
  }, []);

  return { projects, stats, loading, error };
}
