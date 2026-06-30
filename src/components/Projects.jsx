import React from 'react';
import FeaturedProjects from './FeaturedProjects';
import GithubProjects from './GithubProjects';
import GithubStats from './GithubStats';

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-bg-primary transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-secondary px-3 py-1.5 rounded-full shadow-sm">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Projects & Open Source
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* 1. Manually-seeded Featured Projects */}
        <FeaturedProjects />

        {/* 2. Synced GitHub Repositories Grid */}
        <GithubProjects />

        {/* 3. GitHub Activities & Contribution Stats */}
        <GithubStats />

      </div>
    </section>
  );
}
