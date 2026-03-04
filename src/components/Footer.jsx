import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, MessageCircle, ArrowUpRight, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .kq-footer {
          padding: 80px 5% 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: #0a0a0a;
          font-family: 'Satoshi', sans-serif;
        }

        .kq-footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        /* Brand Column */
        .kq-footer-brand {
          max-width: 320px;
        }

        .kq-f-logo {
          font-weight: 900;
          font-size: 1.4rem;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.04em;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
        }

        .kq-f-tagline {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        /* Links Columns */
        .kq-f-title {
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }

        .kq-f-link-list {
          list-style: none;
          padding: 0;
        }

        .kq-f-link-list li {
          margin-bottom: 12px;
        }

        .kq-f-link {
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .kq-f-link:hover {
          color: #ff9800;
        }

        /* Social/Bottom Bar */
        .kq-footer-bottom {
          max-width: 1200px;
          margin: 60px auto 0;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .kq-copy {
          color: #444;
          font-size: 0.85rem;
        }

        .kq-socials {
          display: flex;
          gap: 20px;
        }

        .kq-social-icon {
          color: #666;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .kq-social-icon:hover {
          color: #fff;
          transform: translateY(-3px);
        }

        @media (max-width: 900px) {
          .kq-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .kq-footer-brand {
            grid-column: span 2;
            max-width: 100%;
          }
        }

        @media (max-width: 500px) {
          .kq-footer-grid {
            grid-template-columns: 1fr;
          }
          .kq-footer-brand {
            grid-column: span 1;
          }
          .kq-footer-bottom {
            flex-direction: column-reverse;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className="kq-footer">
        <div className="kq-footer-grid">
          {/* Brand Info */}
          <div className="kq-footer-brand">
            <Link to="/" className="kq-f-logo">
              KORAQ <span style={{ width: 6, height: 6, background: '#ff9800', borderRadius: '50%' }} />
            </Link>
            <p className="kq-f-tagline">
              Empowering Nigeria's informal economy with precision profit tracking. Simple, secure, and built for the way you do business.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} /> English (NG)
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="kq-f-title">Product</h4>
            <ul className="kq-f-link-list">
              <li><Link to="/dashboard" className="kq-f-link">Dashboard</Link></li>
              <li><Link to="/history" className="kq-f-link">Transaction History</Link></li>
              <li><Link to="/reports" className="kq-f-link">Financial Reports</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="kq-f-title">Resources</h4>
            <ul className="kq-f-link-list">
              <li><Link to="/helpcenter" className="kq-f-link">Help Center</Link></li>
              <li><Link to="/privacypolicy" className="kq-f-link">Privacy Policy</Link></li>
              <li><Link to="/termsofservice" className="kq-f-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Action Column */}
          <div>
            <h4 className="kq-f-title">Get Started</h4>
            <ul className="kq-f-link-list">
              <li>
                <a href="https://play.google.com" className="kq-f-link" style={{ color: '#fff', fontWeight: 600 }}>
                  Play Store <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://wa.me/2347044045151" className="kq-f-link">
                  Support WhatsApp <MessageCircle size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="kq-footer-bottom">
          <p className="kq-copy">
            © {currentYear} Koraq Technologies. Built for growth.
          </p>
          <div className="kq-socials">
            <a href="#" className="kq-social-icon"><Twitter size={18} /></a>
            <a href="http://instagram.com/koraqapp" className="kq-social-icon"><Instagram size={18} /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;