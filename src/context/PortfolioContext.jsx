import React, { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/portfolio.php`);
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
        setError(err.message);
        // Fallback static data structure in case DB is not available
        setData({
          user: {
            name: "Akshay Mundra",
            title: "Python Developer & AI Enthusiast",
            tagline: "Building smart solutions with code, creativity & AI",
            bio_para1: "I'm a Python Developer and AI Enthusiast pursuing B.Tech in Computer Science at Poornima College of Engineering, Jaipur (2024–2028). I build full-stack web applications and AI-powered automation tools that solve real problems.",
            bio_para2: "With hands-on experience at Renao Robotics as a Python Developer Intern and projects recognized at IIT Bombay's AI Eduthon and Smart India Hackathon 2025, I bring both technical depth and a product mindset to everything I build.",
            profile_photo_url: "/uploads/profile-photo.jpg",
            resume_pdf_url: "/uploads/resume.pdf",
            github_username: "AkshayMundra19",
            github_url: "https://github.com/AkshayMundra19",
            linkedin_url: "https://linkedin.com/in/akshay-mundra0101",
            twitter_url: "https://x.com/AkshayMundra111",
            portfolio_url: "https://akshay-mundra-portfolio-website.vercel.app/",
            available_for_work: true
          },
          education: [
            { degree: "B.Tech CSE", institution: "Poornima College of Engineering", start_year: "2024", end_year: "2028", status: "Ongoing" }
          ],
          experience: [
            {
              title: "Python Developer Intern",
              company: "Renao Robotics Pvt. Ltd.",
              company_url: "",
              location: "Jaipur, India",
              start_date: "Jun 2025",
              end_date: "Jun 2025",
              badge_label: "Internship",
              bullets: [
                "Engineered Python-based automation solutions using core language concepts, libraries, and frameworks to solve real-world business problems.",
                "Built a Multiple ID Generator application using Python and Pillow that produces personal and government-style ID card images from a single input, improving process efficiency.",
                "Applied strong problem-solving skills and efficient coding practices in a fast-paced startup environment."
              ],
              tags: ["Python", "Automation", "Pillow", "ID Systems"]
            }
          ],
          skills: {
            programming: [
              { name: "Python", level: 92 },
              { name: "Java", level: 75 },
              { name: "C++", level: 70 },
              { name: "SQL", level: 80 },
              { name: "Flutter/Kotlin", level: 65 }
            ],
            frameworks: [
              { name: "React", level: 82 },
              { name: "TypeScript", level: 72 },
              { name: "Pandas & NumPy", level: 88 },
              { name: "Matplotlib", level: 80 },
              { name: "Seaborn", level: 75 }
            ],
            tools: [
              { name: "Git/GitHub", level: 88 },
              { name: "VS Code", level: 95 },
              { name: "Android Studio", level: 70 },
              { name: "MySQL", level: 78 },
              { name: "Vite", level: 80 },
              { name: "Gemini API", level: 85 },
              { name: "Google Maps API", level: 80 }
            ]
          },
          projects: [
            {
              title: "EduBridge",
              subtitle: "AI Learning Platform",
              description: "An AI-powered personalized learning platform that creates custom paths, tests, and summarization structures tailored to student needs. Built during IIT Bombay's AI Eduthon.",
              badge_label: "IIT Bombay Finalist",
              badge_color: "purple",
              image_url: "/uploads/projects/edubridge.jpg",
              github_url: "https://github.com/Aditiii637/EduBridge",
              live_demo_url: "",
              features: [
                "AI-driven curriculum recommendations",
                "Automated quiz generation",
                "Interactive content summarization"
              ],
              tags: ["React", "Node.js", "Gemini API", "Tailwind CSS"]
            },
            {
              title: "BlockTrip",
              subtitle: "Tourist Safety System",
              description: "A decentralized and secure tourist tracking and safety recommendation app that flags geographical risks and provides verified emergency routes. Developed for Smart India Hackathon 2025.",
              badge_label: "Hackathon Project",
              badge_color: "green",
              image_url: "/uploads/projects/blocktrip.jpg",
              github_url: "https://github.com/AkshayMundra19",
              live_demo_url: "https://block-trip.vercel.app/",
              features: [
                "Real-time geographical risk scoring",
                "Verified decentralized emergency route planning",
                "Offline emergency contacts & integration"
              ],
              tags: ["Flutter", "Firebase", "Google Maps API", "Node.js"]
            },
            {
              title: "HomeValuate AI",
              subtitle: "AI-powered house price prediction platform",
              description: "Built a smart house price prediction platform with a FastAPI-backed ML model, real-time price estimation, market analytics dashboards, a 3-way property comparison tool, and an integrated EMI/home-loan calculator.",
              badge_label: "AI/ML Project",
              badge_color: "cyan",
              image_url: "/uploads/projects/homevaluate.jpg",
              github_url: "https://github.com/AkshayMundra19/house-price-prediction-main",
              live_demo_url: "https://house-price-prediction-main.vercel.app/",
              features: [
                "AI Price Prediction Engine",
                "Market Analytics Dashboard",
                "Property Comparison Tool",
                "EMI Calculator",
                "Explainable Prediction Signals"
              ],
              tags: ["FastAPI", "Python", "Machine Learning", "React", "Data Visualization"]
            }
          ],
          achievements: [
            { title: "AI Eduthon Finalist", organization: "IIT Bombay Techfest", year: "2025", description: "Recognized among the top teams at the national level for developing EduBridge, an AI learning assistant.", icon: "Award" },
            { title: "Smart India Hackathon 2025 Nominee", organization: "Government of India", year: "2025", description: "Nominated by college to represent at national SIH level for BlockTrip safety solution.", icon: "Shield" }
          ],
          certifications: [
            { title: "Google Gemini Certified Student", issuer: "Google for Education", date_earned: "Dec 2025", icon: "Award", credential_url: "https://drive.google.com/file/d/1MC03Rem6Tb3G84jwE0VVr96e62h8nSsB/view?usp=drive_link" },
            { title: "Generative AI Workshop: RAG, AI Agents and Agentic AI", issuer: "GUVI|HCL", date_earned: "Apr 2026", icon: "Cpu", credential_url: "https://drive.google.com/file/d/1s6ZB55ISlTH_o5raVThEoZrdH0ND1bKR/view?usp=drive_lin" },
            { title: "Python Developer Internship Certificate", issuer: "Renao Robotics Pvt. Ltd.", date_earned: "Jun 2025", icon: "FileText", credential_url: "https://drive.google.com/file/d/1_H_FFVrwKysR0D2IwJLuXLBQaFl0_IuF/view?usp=drive_link" },
            { title: "Basics of Data Structures and Algorithms", issuer: "Code 9458405", date_earned: "Nov 2025", icon: "Code", credential_url: "https://drive.google.com/file/d/1K-hxRcYZAuE2EmBB02fu8OvHpvEtj6Gq/view?usp=drive_link" }
          ],
          site_stats: [
            { stat_label: "Years Coding", stat_value: "2+" },
            { stat_label: "Projects Built", stat_value: "5+" },
            { stat_label: "Languages", stat_value: "6" },
            { stat_label: "Hackathons", stat_value: "3" }
          ]
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}
