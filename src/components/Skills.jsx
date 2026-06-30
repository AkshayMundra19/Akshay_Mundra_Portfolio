import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Cpu } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Skills() {
  const { data } = usePortfolioData();
  const skills = data?.skills || { programming: [], frameworks: [], tools: [] };

  const categories = [
    {
      key: 'programming',
      title: 'Programming Languages',
      icon: <Code2 className="text-accent-cyan" size={20} />,
      color: 'accent-cyan'
    },
    {
      key: 'frameworks',
      title: 'Frameworks & Libraries',
      icon: <Layers className="text-accent-purple" size={20} />,
      color: 'accent-purple'
    },
    {
      key: 'tools',
      title: 'Tools & Technologies',
      icon: <Cpu className="text-accent-green" size={20} />,
      color: 'accent-green'
    }
  ];

  return (
    <section id="skills" className="py-24 bg-bg-secondary transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-primary px-3 py-1.5 rounded-full">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Skills & Toolkit
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, catIndex) => {
            const list = skills[cat.key] || [];
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                className="p-6 rounded-2xl bg-bg-card border border-border-custom/30 shadow-custom hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-custom/20">
                    <div className="p-2.5 rounded-xl bg-bg-primary dark:bg-bg-primary/10">
                      {cat.icon}
                    </div>
                    <h3 className="font-extrabold text-lg text-text-primary">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {list.map((skill, index) => (
                      <div
                        key={index}
                        className="group relative cursor-help"
                      >
                        {/* Skill Pill */}
                        <div className="px-3.5 py-2 text-sm font-semibold rounded-xl bg-bg-secondary dark:bg-bg-primary/15 border border-border-custom/40 text-text-secondary hover:border-accent-cyan dark:hover:border-accent-cyan hover:text-accent-cyan transition-all duration-200">
                          {skill.name}
                        </div>

                        {/* Tooltip Popup */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-text-primary text-bg-secondary text-xs font-mono font-bold rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-20 whitespace-nowrap">
                          {skill.name}: {skill.level}%
                          {/* Progress bar inside tooltip */}
                          <div className="w-16 h-1 bg-border-custom/30 rounded-full mt-1.5 overflow-hidden">
                            <div 
                              className="h-full bg-accent-cyan" 
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional description footer */}
                <div className="mt-8 pt-4 border-t border-border-custom/10 text-xs text-text-muted">
                  {list.length} skill{list.length !== 1 ? 's' : ''} configured
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
