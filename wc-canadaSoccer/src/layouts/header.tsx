import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const isHistoryActive = () => {
    return location.pathname.startsWith('/history') ? 'active' : '';
  };

  return (
    <header className="global-header">
      <div className="header-container">
        {/* Left Navigation Links */}
        <nav className="nav-group left-nav">
          <Link to="/roster" className={`nav-link ${isActive('/roster')}`}>
            THE ROSTER
          </Link>
          <div 
            className="nav-item-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className={`nav-link dropdown-trigger ${isHistoryActive()}`}>
              HISTORY <span className="arrow">▼</span>
            </span>
            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/history/world-cup" className={`dropdown-link ${isActive('/history/world-cup')}`}>
                WORLD CUP HISTORY
              </Link>
              <Link to="/history/canada" className={`dropdown-link ${isActive('/history/canada')}`}>
                CANADA IN WORLD CUPS
              </Link>
            </div>
          </div>
        </nav>

        {/* Center Logo */}
        <div className="header-logo">
          <Link to="/" aria-label="Canada Soccer Homepage">
            <svg 
              viewBox="0 0 100 120" 
              className="canada-crest-svg" 
              width="50" 
              height="60"
            >
              {/* Shield Shape */}
              <path 
                d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" 
                fill="#DA291C" 
                stroke="#FFFFFF" 
                strokeWidth="4"
              />
              {/* White Inner Border Shield */}
              <path 
                d="M18,18 L82,18 C82,18 82,75 50,100 C18,75 18,18 18,18 Z" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="2"
              />
              {/* Styled Maple Leaf */}
              <path 
                d="M50,30 L53,42 L65,42 L56,49 L60,62 L50,54 L40,62 L44,49 L35,42 L47,42 Z" 
                fill="#FFFFFF" 
              />
              {/* Stem of Maple Leaf */}
              <rect x="48" y="58" width="4" height="12" fill="#FFFFFF" />
              {/* Text "CAN" */}
              <text 
                x="50" 
                y="88" 
                textAnchor="middle" 
                fill="#FFFFFF" 
                fontSize="12" 
                fontWeight="900" 
                fontFamily="system-ui, sans-serif"
                letterSpacing="1"
              >
                CANADA
              </text>
            </svg>
          </Link>
        </div>

        {/* Right Navigation Links */}
        <nav className="nav-group right-nav">
          <Link to="/voyageurs" className={`nav-link ${isActive('/voyageurs')}`}>
            THE VOYAGEURS
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
