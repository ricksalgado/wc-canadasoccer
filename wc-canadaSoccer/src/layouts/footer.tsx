import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="global-footer">
      <div className="footer-container">
        {/* Column 1: Brand & Socials */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <svg viewBox="0 0 100 120" width="40" height="48">
              <path d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" fill="#DA291C" />
              <path d="M50,30 L53,42 L65,42 L56,49 L60,62 L50,54 L40,62 L44,49 L35,42 L47,42 Z" fill="#FFFFFF" />
              <rect x="48" y="58" width="4" height="12" fill="#FFFFFF" />
              <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">CAN</text>
            </svg>
            <span className="brand-name">CANADA SOCCER 2026</span>
          </div>
          <p className="footer-tagline">
            Standing on guard for the historic 2026 FIFA World Cup. Celebrating our heroes and our supporters.
          </p>
          <div className="social-links">
            <a href="https://x.com/CanadaSoccerEN" target="_blank" rel="noreferrer" aria-label="Twitter X">
              {/* @ts-ignore */}
              <wa-icon name="x-twitter" family="brands"></wa-icon>
            </a>
            <a href="https://instagram.com/canadasoccer" target="_blank" rel="noreferrer" aria-label="Instagram">
              <span className="social-icon">📷</span>
            </a>
            <a href="https://youtube.com/canadasoccer" target="_blank" rel="noreferrer" aria-label="YouTube">
              <span className="social-icon">▶</span>
            </a>
            <a href="https://tiktok.com/@canadasoccer" target="_blank" rel="noreferrer" aria-label="TikTok">
              <span className="social-icon">🎵</span>
            </a>
          </div>
        </div>

        {/* Column 2: Sitemap Links */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">NAVIGATION</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/roster">The Roster</Link></li>
            <li><Link to="/voyageurs">The Voyageurs</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: History Links */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">HISTORY</h4>
          <ul className="footer-links-list">
            <li><Link to="/history/world-cup">World Cup History</Link></li>
            <li><Link to="/history/canada">Canada In World Cups</Link></li>
            <li><a href="https://www.canadasoccer.com" target="_blank" rel="noreferrer">Official Site</a></li>
          </ul>
        </div>

        {/* Column 4: Disclaimer Column */}
        <div className="footer-col disclaimer-col">
          <h4 className="footer-heading">PROJECT INFO</h4>
          <div className="disclaimer-box">
            <span className="disclaimer-badge">DISCLAIMER</span>
            <p className="disclaimer-text">
              This isn't an official webpage. This is a personal project developed by Rick Salgado to celebrate the Canadian National Team in the 2026 World Cup.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 Canada Soccer Fan Tribute. All rights reserved. Created with passion for the Maple Leaf.
          </p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;