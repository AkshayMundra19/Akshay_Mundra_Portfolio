import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Twitter, Mail, FileText, ArrowRight } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Hero() {
  const { data } = usePortfolioData();
  const user = data?.user || {};
  const stats = data?.site_stats || [];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'hero' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center overflow-hidden py-16"
      style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(8, 145, 178, 0.07) 0%, rgba(109, 40, 217, 0.05) 30%, var(--bg-primary) 70%)'
      }}
    >
      {/* Light animated glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full filter blur-[100px] animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent-purple/10 rounded-full filter blur-[100px] animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 text-left space-y-6">
            
            {/* Availability Badge */}
            {user.available_for_work && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-accent-green"
              >
                <span className="w-2 h-2 rounded-full bg-accent-green animate-ping" />
                <span>Available for new opportunities</span>
              </motion.div>
            )}

            {/* Sub-label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-8 bg-accent-cyan" />
              <span className="text-xs font-mono tracking-[4px] uppercase text-accent-cyan font-bold">
                Welcome to my world
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-tight"
            >
              Hi, I'm <br />
              <span className="text-accent-cyan inline-block mt-2 relative">
                {user.name || 'Akshay Mundra'}
              </span>
            </motion.h1>

            {/* Animated Roles */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl sm:text-2xl font-bold text-text-secondary"
            >
              A passionate{' '}
              <span className="text-accent-purple font-mono">
                <TypeAnimation
                  sequence={[
                    'Python Developer', 2000,
                    'AI Enthusiast', 2000,
                    'Full-Stack Developer', 2000,
                    'Problem Solver', 2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
            >
              {user.tagline || 'Building smart solutions with code, creativity & AI'}
            </motion.p>

            {/* Stats pills */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {stats.map((stat, i) => (
                <div 
                  key={stat.id || i}
                  className="px-4 py-2 rounded-xl bg-bg-card/75 dark:bg-bg-card/20 border border-border-custom/40 shadow-custom text-xs font-semibold text-text-secondary hover:border-accent-cyan hover:translate-y-[-1px] transition-all duration-300"
                >
                  <span className="text-accent-cyan font-bold text-sm mr-1">{stat.stat_value}</span>
                  <span>{stat.stat_label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="glow-btn glow-btn-primary"
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={user.resume_pdf_url || `${API_BASE_URL}/resume.php`}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn glow-btn-outline flex items-center"
              >
                <FileText size={16} />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="px-6 py-3 text-sm font-semibold text-text-secondary hover:text-accent-cyan transition-colors"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6 pt-6 border-t border-border-custom/20"
            >
              <span className="text-xs font-mono text-text-muted tracking-wider uppercase">Find me on</span>
              <div className="flex gap-4">
                <a
                  href={user.github_url || 'https://github.com/AkshayMundra19'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={user.linkedin_url || 'https://linkedin.com/in/akshay-mundra0101'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={user.twitter_url || 'https://x.com/AkshayMundra111'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm"
                  aria-label="Twitter / X"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`mailto:${user.email || 'akshaymundra07@gmail.com'}`}
                  className="p-2.5 rounded-xl bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Colored backdrop ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple opacity-20 filter blur-xl scale-105" />
              
              {/* Outer double borders */}
              <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full p-2 border-2 border-dashed border-accent-cyan/60 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                <div className="w-full h-full rounded-full border border-accent-purple/40" />
              </div>

              {/* Headshot Image wrapper */}
              <div className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] rounded-full overflow-hidden border-4 border-bg-secondary dark:border-bg-card shadow-2xl bg-white">
                <img
                  src={user.profile_photo_url || '/uploads/profile-photo.jpg'}
                  alt={user.name || 'Akshay Mundra'}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to initial avatar if path not loaded
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Akshay Mundra')}&size=300&background=0891B2&color=fff&bold=true`;
                  }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
