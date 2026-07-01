import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  // Monitor theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offsets navbar height
      
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
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

  return (
    <nav className="sticky top-0 w-full bg-bg-secondary/80 backdrop-blur-md border-b border-border-custom/30 py-4 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-2.5 text-xl font-black tracking-wider text-accent-cyan hover:text-accent-purple transition-all duration-300 select-none group"
        >
          <img 
            src={logoUrl} 
            alt="Akshay Mundra Logo" 
            className="w-9 h-9 rounded-xl object-contain border border-border-custom/20 group-hover:scale-105 transition-transform duration-300"
          />
          <span>AKSHAY.M</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 ${
                activeSection === item.id 
                  ? 'text-accent-cyan' 
                  : 'text-text-secondary hover:text-accent-cyan'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan rounded-full" />
              )}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-bg-primary text-text-secondary transition-colors cursor-pointer border-0"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-text-muted" />}
          </button>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-bg-primary text-text-secondary transition-colors cursor-pointer border-0"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-text-muted" />}
          </button>
          
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-md hover:bg-bg-primary text-text-secondary transition-colors cursor-pointer border-0"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-[68px] left-0 w-full bg-bg-secondary border-b border-border-custom/40 shadow-xl transition-all duration-300 ease-in-out py-6 px-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-base font-semibold tracking-wide transition-colors py-2 px-3 rounded-lg ${
                activeSection === item.id 
                  ? 'bg-bg-primary text-accent-cyan' 
                  : 'text-text-secondary hover:bg-bg-primary hover:text-accent-cyan'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
