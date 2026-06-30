import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, FolderGit2, ArrowRight } from 'lucide-react';
import useGithubData from '../hooks/useGithubData';

export default function GithubProjects() {
  const { projects, loading, error } = useGithubData();

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="space-y-8 pt-8">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-6 bg-accent-cyan" />
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl bg-bg-secondary border border-border-custom/30 h-44 flex flex-col justify-between animate-pulse"
            >
              <div className="space-y-3">
                <div className="h-5 w-2/3 bg-slate-300 dark:bg-slate-700 rounded-md" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-10 bg-slate-300 dark:bg-slate-700 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error/Empty State
  if (error || !projects || projects.length === 0) {
    return (
      <div className="pt-8 text-center space-y-4">
        <p className="text-text-muted text-sm">Could not sync repositories from GitHub API at this moment.</p>
        <a
          href="https://github.com/AkshayMundra19?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="glow-btn glow-btn-outline inline-flex items-center"
        >
          <Github size={16} />
          <span>View Repositories on GitHub</span>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-8">
      
      {/* Subsection Title */}
      <div className="flex items-center gap-3">
        <div className="h-[2px] w-6 bg-accent-cyan" />
        <h3 className="text-xl font-bold font-mono tracking-wider uppercase text-accent-cyan">
          From My GitHub
        </h3>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((repo, index) => (
          <motion.a
            key={repo.name || index}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="flex flex-col justify-between p-6 rounded-2xl bg-bg-secondary hover:bg-bg-card border border-border-custom/30 hover:border-accent-cyan/60 dark:hover:border-accent-cyan/60 shadow-custom hover:shadow-lg transition-all duration-300 group h-48"
          >
            {/* Top Details */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-start gap-4">
                <h4 className="font-extrabold text-base text-text-primary group-hover:text-accent-cyan transition-colors duration-300 break-all line-clamp-1">
                  {repo.name}
                </h4>
                <FolderGit2 size={18} className="text-text-muted group-hover:text-accent-cyan transition-colors duration-300 flex-shrink-0" />
              </div>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {repo.description || "No description provided. Click to view repository code and readme files."}
              </p>
            </div>

            {/* Bottom details */}
            <div className="flex justify-between items-center pt-4 border-t border-border-custom/10 text-xs font-semibold">
              {/* Primary Language */}
              {repo.language ? (
                <span className="text-accent-purple font-mono">
                  {repo.language}
                </span>
              ) : (
                <span className="text-text-muted">Repository</span>
              )}

              {/* Stars */}
              <div className="flex items-center gap-1 text-text-secondary">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>

          </motion.a>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <a
          href="https://github.com/AkshayMundra19?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="glow-btn glow-btn-outline inline-flex items-center"
        >
          <span>View All on GitHub</span>
          <ArrowRight size={14} />
        </a>
      </div>

    </div>
  );
}
