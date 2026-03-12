import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  // Lock body scroll when menu is open to prevent background scrolling
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/add-transaction', label: 'Add Transaction' },
    { to: '/history', label: 'History' },
    { to: '/reports', label: 'Reports' },
  ];

  return (
    <>
      <style>{`
        .kq-header-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          padding: 1.25rem 5%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .kq-header-container.is-scrolled {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }

        .kq-glass-nav {
          max-width: 1200px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          border-radius: 20px;
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
        }

        .is-scrolled .kq-glass-nav {
          background: rgba(18, 18, 18, 0.85);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .kq-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          transition: opacity 0.2s;
        }

        .kq-brand:hover {
          opacity: 0.8;
        }

        .kq-brand img {
          height: 130px;
          width: auto;
        }

        .kq-brand-dot {
          width: 6px;
          height: 6px;
          background: #ff9800;
          border-radius: 50%;
        }

        .kq-desktop-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .kq-nav-item {
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          color: #a1a1a1;
          transition: all 0.2s ease;
          position: relative;
        }

        .kq-nav-item:hover, .kq-nav-item.active {
          color: #fff;
        }

        .kq-nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 3px;
          background: #ff9800;
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          transform: scaleX(0.5);
        }

        .kq-nav-item:hover::after, .kq-nav-item.active::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .kq-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-download {
          background: #ff9800;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: 12px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 12px rgba(255,152,0,0.10);
        }

        .btn-download:hover {
          background: #fff;
          color: #ff9800;
          border: 1px solid #ff9800;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255,152,0,0.12);
        }

        .kq-menu-trigger {
          display: none;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
        }

        .kq-burger-line {
          width: 20px;
          height: 2px;
          background: #fff;
          margin: 4px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        /* --- MOBILE OVERLAY SCROLL FIX --- */
        .kq-mobile-overlay {
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          z-index: 1900;
          display: flex;
          flex-direction: column;
          /* Allow vertical scrolling */
          overflow-y: auto; 
          /* Top padding handles the header height, bottom padding ensures space for CTA */
          padding: 100px 10% 60px; 
          -webkit-overflow-scrolling: touch;
        }

        .kq-mobile-link {
          font-size: 2.2rem;
          font-weight: 800;
          color: #333;
          text-decoration: none;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0; /* Prevents text from squishing */
        }

        .kq-mobile-link.active {
          color: #fff;
        }

        .kq-mobile-footer {
          margin-top: auto;
          padding-top: 40px;
          flex-shrink: 0;
        }

        @media (max-width: 820px) {
          .kq-desktop-links, .btn-download { display: none; }
          .kq-menu-trigger { display: block; }
        }
      `}</style>

      <header className={`kq-header-container ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="kq-glass-nav">
          <Link to="/" className="kq-brand">
            <img src="/images/koraq-logo.png" alt="Koraq" />
          </Link>

          <div className="kq-desktop-links">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`kq-nav-item ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="kq-actions">
            <a href="https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/app-debug.apk?alt=media&token=cdbe63ad-f89f-4e2c-8a69-b45067913764" className="btn-download">
              Download <ArrowUpRight size={14} />
            </a>
            
            <button className="kq-menu-trigger" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="kq-burger-line" style={{ width: menuOpen ? '24px' : '20px', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
              <div className="kq-burger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
              <div className="kq-burger-line" style={{ width: menuOpen ? '24px' : '16px', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : '' }} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="kq-mobile-overlay"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`kq-mobile-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label} <ChevronRight size={32} />
              </Link>
            ))}
            
            <div className="kq-mobile-footer">
              <p style={{ color: '#444', marginBottom: '1rem', fontSize: '0.9rem' }}>Business profit tracking, simplified.</p>
              <a href="https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/app-debug.apk?alt=media&token=cdbe63ad-f89f-4e2c-8a69-b45067913764" className="btn-download" style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                Download App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;