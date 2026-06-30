import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Footer() {
  const { data } = usePortfolioData();
  const user = data?.user || {};
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-bg-primary border-t border-border-custom/30 py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left copyright branding */}
        <div className="text-center md:text-left space-y-1">
          <span className="font-extrabold text-sm tracking-widest text-text-primary uppercase">
            {user.name || 'Akshay Mundra'}
          </span>
          <p className="text-xs text-text-muted">
            &copy; {currentYear} All rights reserved. Created with React, PHP, &amp; MySQL.
          </p>
        </div>

        {/* Middle quick social shortcuts */}
        <div className="flex gap-4">
          <a
            href={user.github_url || 'https://github.com/AkshayMundra19'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={user.linkedin_url || 'https://linkedin.com/in/akshay-mundra0101'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={user.twitter_url || 'https://x.com/AkshayMundra111'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="Twitter / X"
          >
            <Twitter size={18} />
          </a>
          <a
            href={`mailto:${user.email || 'akshaymundra07@gmail.com'}`}
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Right back to top toggle shortcut */}
        <button
          onClick={handleScrollToTop}
          className="text-xs font-mono font-bold text-text-secondary hover:text-accent-cyan transition-colors flex items-center gap-1.5 cursor-pointer border-0 outline-none"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>

      </div>
    </footer>
  );
}
