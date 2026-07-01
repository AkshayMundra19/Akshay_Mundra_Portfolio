import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';
import emailjs from '@emailjs/browser';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export default function Contact() {
  const { data } = usePortfolioData();
  const user = data?.user || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email || 'akshaymundra07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ success: false, message: 'Please fill in all required fields.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus(null);

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        // Send via EmailJS
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'New Portfolio Contact Message',
          message: formData.message,
          to_name: 'Akshay Mundra',
        };

        const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        if (result.status === 200) {
          setStatus({ success: true, message: 'Message sent successfully via EmailJS!' });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send message via EmailJS');
        }
      } else {
        // Fallback to PHP API endpoint
        const response = await fetch(`${API_BASE_URL}/contact.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        let result = {};
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          // Non-JSON response (e.g. server error, gateway timeout)
          const text = await response.text();
          throw new Error(
            text.substring(0, 100) || `Backend server returned status ${response.status}. Please make sure your local PHP server is running on port 8000.`
          );
        }

        if (response.ok && result.success) {
          setStatus({ success: true, message: result.message || 'Message sent successfully!' });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error(result.error || 'Failed to submit the contact form.');
        }
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: err.message || 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-secondary transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-primary px-3 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Contact Me
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-text-primary">
                Let's discuss your projects.
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Have a job opening, an automation workflow script proposal, or a full-stack platform building query? Drop a message and let's collaborate!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              
              {/* Email Card (With Copy Button) */}
              <div className="p-5 rounded-2xl bg-bg-card border border-border-custom/30 shadow-custom flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-bg-primary dark:bg-bg-primary/20 text-accent-cyan">
                    <Mail size={22} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-xs font-mono text-text-muted">EMAIL</span>
                    <span className="font-semibold text-text-primary break-all">{user.email || 'akshaymundra07@gmail.com'}</span>
                  </div>
                </div>
                
                {/* Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl hover:bg-bg-primary text-text-secondary hover:text-accent-cyan cursor-pointer transition-colors border-0 outline-none relative"
                  aria-label="Copy Email address"
                >
                  {copied ? <Check size={18} className="text-accent-green" /> : <Copy size={18} />}
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -28 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 bg-text-primary text-bg-secondary text-[10px] font-bold rounded shadow-md whitespace-nowrap"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-bg-card border border-border-custom/30 shadow-custom flex items-center gap-4">
                <div className="p-3 rounded-xl bg-bg-primary dark:bg-bg-primary/20 text-accent-cyan">
                  <Phone size={22} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-mono text-text-muted">PHONE</span>
                  <a href={`tel:${user.phone || '+919166678361'}`} className="font-semibold text-text-primary hover:text-accent-cyan transition-colors">
                    {user.phone || '+91 9166678361'}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-bg-card border border-border-custom/30 shadow-custom flex items-center gap-4">
                <div className="p-3 rounded-xl bg-bg-primary dark:bg-bg-primary/20 text-accent-cyan">
                  <MapPin size={22} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-mono text-text-muted">LOCATION</span>
                  <span className="font-semibold text-text-primary">{user.location || 'Jaipur, Rajasthan, India'}</span>
                </div>
              </div>

            </div>

            {/* Status Indicator */}
            {user.available_for_work && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-ping flex-shrink-0" />
                <span className="text-xs font-semibold text-accent-green">
                  Open for new contracts, full-time positions, or remote internships.
                </span>
              </div>
            )}

          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-bg-card border border-border-custom/30 shadow-custom"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email Group */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-xs font-mono font-bold text-text-secondary uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-custom/40 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-text-primary transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-xs font-mono font-bold text-text-secondary uppercase">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="yourname@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-custom/40 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-text-primary transition-all duration-200"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="form-subject" className="text-xs font-mono font-bold text-text-secondary uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  id="form-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Collaboration proposal"
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-custom/40 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-text-primary transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="form-message" className="text-xs font-mono font-bold text-text-secondary uppercase">
                  Message *
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Write your message details here..."
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-custom/40 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-text-primary transition-all duration-200 resize-y"
                />
              </div>

              {/* Notifications Alert Banner */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl border text-sm font-semibold ${
                      status.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-400'
                        : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-400'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="glow-btn glow-btn-primary w-full py-3.5 flex justify-center items-center cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed select-none border-0"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
