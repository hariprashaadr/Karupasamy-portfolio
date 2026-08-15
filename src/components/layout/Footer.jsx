import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, MessageSquare, ArrowUpRight, Heart, Code2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const Footer = () => {
  const { profile, codingProfiles, socials } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const github = codingProfiles.find(p => p.id === 'github')?.url || 'https://github.com/karuppasamy74';
  const linkedin = socials.find(s => s.id === 'linkedin')?.url || 'https://linkedin.com/in/karuppasamy-a';
  const whatsapp = socials.find(s => s.id === 'whatsapp')?.url || 'https://wa.me/919876543210';
  const naukri = socials.find(s => s.id === 'naukri')?.url || 'https://www.naukri.com/code360/profile/karuppasamy';
  const leetcode = codingProfiles.find(p => p.id === 'leetcode')?.url || 'https://leetcode.com/u/karuppasamy74/';

  return (
    <footer className="w-full border-t border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-bg-dark/40 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-charcoal-200 dark:border-charcoal-800/80">
          {/* Column 1: Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-950 flex items-center justify-center font-mono font-bold text-xs">
                &lt;K/&gt;
              </div>
              <span className="font-bold text-lg text-charcoal-950 dark:text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400 max-w-md leading-relaxed">
              {profile.title} focusing on high-performance web applications with Python, React.js, and modern full-stack technologies. Based in {profile.location}.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for developer opportunities</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-900 dark:text-white">
              Navigation
            </span>
            <ul className="flex flex-col gap-2 text-sm text-charcoal-600 dark:text-charcoal-400">
              <li><Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About & Journey</Link></li>
              <li><Link to="/projects" className="hover:text-black dark:hover:text-white transition-colors">Featured Projects</Link></li>
              <li><Link to="/skills" className="hover:text-black dark:hover:text-white transition-colors">Technical Skills</Link></li>
              <li><Link to="/experience" className="hover:text-black dark:hover:text-white transition-colors">Experience</Link></li>
              <li><Link to="/certifications" className="hover:text-black dark:hover:text-white transition-colors">Certifications & Training</Link></li>
              <li><Link to="/resume" className="hover:text-black dark:hover:text-white transition-colors">Resume & PDF</Link></li>
              <li><Link to="/contact" className="hover:text-black dark:hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect & Profiles */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-900 dark:text-white">
              Connect Externally
            </span>
            <ul className="flex flex-col gap-2 text-sm text-charcoal-600 dark:text-charcoal-400">
              {github && (
                <li>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:text-black dark:hover:text-white transition-colors group">
                    <span className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:text-black dark:hover:text-white transition-colors group">
                    <span className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {leetcode && (
                <li>
                  <a href={leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:text-black dark:hover:text-white transition-colors group">
                    <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> LeetCode</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {naukri && (
                <li>
                  <a href={naukri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:text-black dark:hover:text-white transition-colors group">
                    <span>Naukri / Code360</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:text-black dark:hover:text-white transition-colors group">
                    <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
          <p>© {currentYear} {profile.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-charcoal-400">Designed & Built with React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
