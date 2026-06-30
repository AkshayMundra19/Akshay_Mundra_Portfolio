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
        const [projectsRes, statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/github-projects.php`),
          fetch(`${API_BASE_URL}/github-stats.php`)
        ]);

        let reposData = [];
        let statsData = null;

        if (projectsRes.ok) {
          reposData = await projectsRes.json();
        } else {
          console.warn("Failed to fetch Github projects API");
        }

        if (statsRes.ok) {
          statsData = await statsRes.json();
        } else {
          console.warn("Failed to fetch Github stats API");
        }

        // Filter out ATM_System from the general GitHub projects grid as requested
        const filteredRepos = (reposData || [])
          .filter(repo => repo.name !== 'ATM_System')
          .slice(0, 6);

        setProjects(filteredRepos);
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching Github data:", err);
        setError(err.message);
        // Fallback empty stats and projects if API fails
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
