import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, Users, BarChart3 } from 'lucide-react';
import useGithubData from '../hooks/useGithubData';

export default function GithubStats() {
  const { stats, loading } = useGithubData();

  if (loading) {
    return (
      <div className="space-y-8 pt-12 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-6 bg-accent-cyan" />
          <div className="h-6 w-44 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-6">
            <div className="h-44 bg-bg-secondary border border-border-custom/30 rounded-2xl" />
          </div>
          <div className="md:col-span-7 space-y-6">
            <div className="h-32 bg-bg-secondary border border-border-custom/30 rounded-2xl" />
            <div className="h-32 bg-bg-secondary border border-border-custom/30 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const githubUsername = 'AkshayMundra19';
  const profileWidget = stats?.widgets?.profile_stats || `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=transparent`;
  const streakWidget = stats?.widgets?.streak_stats || `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent`;

  return (
    <div className="space-y-8 pt-12">
      
      {/* Subsection Title */}
      <div className="flex items-center gap-3">
        <div className="h-[2px] w-6 bg-accent-cyan" />
        <h3 className="text-xl font-bold font-mono tracking-wider uppercase text-accent-cyan">
          GitHub Activity & Stats
        </h3>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Language Bars & Raw Counts */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-5 p-6 rounded-2xl bg-bg-secondary border border-border-custom/30 shadow-custom space-y-6"
        >
          <div className="flex items-center gap-2 pb-4 border-b border-border-custom/25">
            <BarChart3 size={20} className="text-accent-purple" />
            <h4 className="font-extrabold text-base text-text-primary">Language Breakdown</h4>
          </div>

          {/* Languages List */}
          {stats?.languages && stats.languages.length > 0 ? (
            <div className="space-y-4">
              {stats.languages.slice(0, 5).map((lang, index) => (
                <div key={lang.name || index} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-text-secondary">
                    <span className="font-mono">{lang.name}</span>
                    <span>{lang.percentage}%</span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-2 rounded-full bg-bg-primary dark:bg-bg-primary/20 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted">No languages aggregated. Push code to GitHub to populate.</p>
          )}

          {/* Count Cards Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-bg-card/75 dark:bg-bg-card/20 border border-border-custom/30 text-center space-y-1">
              <GitBranch size={16} className="text-accent-cyan mx-auto" />
              <span className="block text-sm font-bold text-text-primary">{stats?.public_repos || 0}</span>
              <span className="block text-[10px] text-text-muted font-bold font-mono uppercase tracking-tight">Repos</span>
            </div>
            
            <div className="p-3.5 rounded-xl bg-bg-card/75 dark:bg-bg-card/20 border border-border-custom/30 text-center space-y-1">
              <Star size={16} className="text-amber-400 mx-auto" />
              <span className="block text-sm font-bold text-text-primary">{stats?.total_stars || 0}</span>
              <span className="block text-[10px] text-text-muted font-bold font-mono uppercase tracking-tight">Stars</span>
            </div>
            
            <div className="p-3.5 rounded-xl bg-bg-card/75 dark:bg-bg-card/20 border border-border-custom/30 text-center space-y-1">
              <Users size={16} className="text-accent-green mx-auto" />
              <span className="block text-sm font-bold text-text-primary">{stats?.followers || 0}</span>
              <span className="block text-[10px] text-text-muted font-bold font-mono uppercase tracking-tight">Followers</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Embedded Widgets */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 space-y-6"
        >
          {/* Card 1: Main stats */}
          <div className="p-4 rounded-2xl bg-bg-secondary border border-border-custom/30 shadow-custom flex justify-center items-center hover:shadow-lg transition-all duration-300 select-none">
            <img 
              src={profileWidget} 
              alt={`${githubUsername} GitHub Profile Statistics`}
              loading="lazy"
              className="max-w-full h-auto object-contain dark:invert-[0.08]"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Card 2: Streak widget */}
          <div className="p-4 rounded-2xl bg-bg-secondary border border-border-custom/30 shadow-custom flex justify-center items-center hover:shadow-lg transition-all duration-300 select-none">
            <img 
              src={streakWidget} 
              alt={`${githubUsername} GitHub Streak Statistics`}
              loading="lazy"
              className="max-w-full h-auto object-contain dark:invert-[0.08]"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
