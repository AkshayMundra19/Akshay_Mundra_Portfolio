import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, CheckCircle } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function FeaturedProjects() {
  const { data } = usePortfolioData();
  const projects = data?.projects || [];

  const getBadgeColorClasses = (color) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
      case 'green':
        return 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'cyan':
      default:
        return 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
    }
  };

  return (
    <div className="space-y-16">
      
      {/* Subsection Title */}
      <div className="flex items-center gap-3">
        <div className="h-[2px] w-6 bg-accent-cyan" />
        <h3 className="text-xl font-bold font-mono tracking-wider uppercase text-accent-cyan">
          Featured Creations
        </h3>
      </div>

      <div className="grid gap-12">
        {projects.map((proj, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={proj.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl bg-bg-secondary border border-border-custom/30 shadow-custom hover:shadow-xl transition-all duration-300 ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              
              {/* Project Image Column */}
              <div className="w-full lg:w-1/2 relative group rounded-2xl overflow-hidden shadow-md">
                {/* Fallback support is handled in image optimize or styled nicely */}
                <div className="aspect-[16/10] overflow-hidden bg-bg-primary dark:bg-bg-primary/20">
                  <img
                    src={proj.image_url}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Decorative glowing overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Project Text Column */}
              <div className="w-full lg:w-1/2 space-y-5">
                
                {/* Badge & Title */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {proj.badge_label && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColorClasses(proj.badge_color)}`}>
                        {proj.badge_label}
                      </span>
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-text-primary">
                    {proj.title}
                  </h4>
                  <p className="text-sm font-semibold text-accent-purple font-mono uppercase tracking-wide">
                    {proj.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-text-secondary leading-relaxed">
                  {proj.description}
                </p>

                {/* Features Checklist */}
                {proj.features && proj.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
                    {proj.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle size={16} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags */}
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pb-2">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-bg-primary dark:bg-bg-primary/25 text-text-secondary text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Redirect CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {proj.live_demo_url && (
                    <a
                      href={proj.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-btn glow-btn-primary py-2 px-5 text-sm"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-btn glow-btn-outline py-2 px-5 text-sm flex items-center gap-1.5"
                    >
                      <Github size={16} />
                      <span>Repository</span>
                    </a>
                  )}
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
