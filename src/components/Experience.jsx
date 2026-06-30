import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Experience() {
  const { data } = usePortfolioData();
  const experiences = data?.experience || [];

  return (
    <section id="experience" className="py-24 bg-bg-primary transition-all duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-secondary px-3 py-1.5 rounded-full shadow-sm">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Work Experience
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-dashed border-accent-cyan/30 ml-4 md:ml-6 space-y-12">
          
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-accent-cyan border-4 border-bg-primary flex items-center justify-center shadow-lg" />

              {/* Card content */}
              <div className="p-6 sm:p-8 rounded-2xl bg-bg-secondary border border-border-custom/30 shadow-custom hover:shadow-lg transition-all duration-300 space-y-4">
                
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-text-primary">
                      {exp.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm font-semibold text-text-secondary">
                      {exp.company_url ? (
                        <a 
                          href={exp.company_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent-cyan flex items-center gap-1"
                        >
                          <span>{exp.company}</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                    </div>
                  </div>

                  {/* Badge */}
                  {exp.badge_label && (
                    <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-accent-cyan text-xs font-semibold border border-cyan-200 dark:border-cyan-800">
                      {exp.badge_label}
                    </span>
                  )}
                </div>

                {/* Sub-header info */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>
                      {exp.start_date} &mdash; {exp.end_date || 'Present'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="list-disc list-outside ml-5 space-y-2 text-text-secondary leading-relaxed">
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <li key={bIdx} className="text-sm">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border-custom/10">
                    {exp.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-bg-primary dark:bg-bg-primary/20 text-text-secondary text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
