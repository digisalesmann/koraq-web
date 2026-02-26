import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Activity, 
  ShieldCheck, 
  BarChart3, 
  MessageCircle, 
  ArrowUpRight,
  TrendingUp,
  Globe,
  Wallet,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="dash-viewport">
      <style>{`
        .dash-viewport {
          padding: 140px 5% 100px;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .dash-inner {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 380px; /* Asymmetric Pro Layout */
          gap: 60px;
        }

        /* --- Hero Section --- */
        .dash-main-flow h1 {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.9;
          margin-bottom: 40px;
          background: linear-gradient(180deg, #fff 40%, rgba(255,255,255,0.4) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* --- Tool Module Grid --- */
        .module-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 32px;
          overflow: hidden;
        }

        .tool-box {
          background: #0a0a0a;
          padding: 40px;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s ease;
          position: relative;
        }

        .tool-box:hover {
          background: rgba(255,255,255,0.02);
        }

        .tool-box .label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #ff9800;
          margin-bottom: 20px;
          display: block;
        }

        .tool-box h3 {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* --- Side Overview Bar --- */
        .side-audit {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .audit-stat {
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .audit-stat .meta { color: #444; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: block; }
        .audit-stat .val { font-size: 2.2rem; font-weight: 900; letter-spacing: -0.04em; }
        .audit-stat .change { font-size: 0.8rem; color: #10b981; font-weight: 700; margin-left: 8px; }

        @media (max-width: 1024px) {
          .dash-inner { grid-template-columns: 1fr; }
          .side-audit { grid-template-columns: 1fr 1fr; display: grid; }
        }

        @media (max-width: 640px) {
          .module-grid { grid-template-columns: 1fr; }
          .side-audit { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-inner">
        
        {/* Main Flow: Actions */}
        <div className="dash-main-flow">
          <motion.div {...fadeInUp}>
            <span style={{ color: '#ff9800', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.2em' }}>OPERATIONS CENTER</span>
            <h1>Koraq <br/> Workspace.</h1>
            <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '500px', margin: '20px 0 60px' }}>
              Perform live audits, record high-velocity trades, and manage your ledger with zero latency.
            </p>
          </motion.div>

          <motion.div className="module-grid" {...fadeInUp} transition={{ delay: 0.2 }}>
            <Link to="/add-transaction" className="tool-box">
              <span className="label">Ledger Entry</span>
              <h3><Plus size={24} /> New Sale</h3>
              <ArrowUpRight style={{ position: 'absolute', right: 30, top: 30, opacity: 0.2 }} />
            </Link>
            
            <Link to="/reports" className="tool-box">
              <span className="label">Analysis</span>
              <h3><Activity size={24} /> Reports</h3>
              <ArrowUpRight style={{ position: 'absolute', right: 30, top: 30, opacity: 0.2 }} />
            </Link>

            <Link to="/history" className="tool-box">
              <span className="label">Timeline</span>
              <h3><Clock size={24} /> History</h3>
              <ArrowUpRight style={{ position: 'absolute', right: 30, top: 30, opacity: 0.2 }} />
            </Link>

            <div className="tool-box" style={{ opacity: 0.4, cursor: 'not-allowed' }}>
              <span className="label">Automation</span>
              <h3><MessageCircle size={24} /> WhatsApp</h3>
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#ff9800' }}>APP ONLY</span>
            </div>
          </motion.div>
        </div>

        {/* Side Audit: Real-time Data Feel */}
        <motion.div className="side-audit" {...fadeInUp} transition={{ delay: 0.4 }}>
          <div className="audit-stat">
            <span className="meta">Total Net Profit</span>
            <div className="val">₦482.0k <span className="change">+12%</span></div>
          </div>

          <div className="audit-stat">
            <span className="meta">System Integrity</span>
            <div className="val" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              100% Encrypted
            </div>
          </div>

          <div className="audit-stat" style={{ border: 'none' }}>
            <span className="meta">Global Status</span>
            <div className="val" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Globe size={20} color="#333" /> Nigeria (NG)
            </div>
            <p style={{ color: '#333', fontSize: '0.75rem', marginTop: '10px', fontWeight: 700 }}>OFFLINE ENGINE ACTIVE</p>
          </div>

          <div style={{ marginTop: 'auto', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>
               "Your business is local. Your data should be too. Koraq ensures zero cloud exposure."
             </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;