import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Filter, 
  Download, 
  Calendar,
  MoreHorizontal
} from 'lucide-react';

const History = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  // Mock data for showcase
  const logs = [
    { id: 1, type: 'sale', title: 'POS Withdrawal - Terminal 02', amount: '₦45,000', time: '12:45 PM', date: 'Today' },
    { id: 2, type: 'expense', title: 'Shop Electricity Bill', amount: '₦8,500', time: '10:20 AM', date: 'Today' },
    { id: 3, type: 'sale', title: 'WhatsApp Order: Lace Fabric', amount: '₦120,000', time: 'Yesterday', date: 'Feb 25' },
    { id: 4, type: 'sale', title: 'In-Store Cash Trade', amount: '₦12,000', time: 'Yesterday', date: 'Feb 25' },
    { id: 5, type: 'expense', title: 'Logistics: Dispatch Rider', amount: '₦3,500', time: 'Feb 24', date: 'Feb 24' },
  ];

  return (
    <div className="history-page">
      <style>{`
        .history-page {
          padding: 160px 5% 120px;
          min-height: 100vh;
          display: flex;
          justify-content: center; /* Horizontally centers the content */
        }

        .history-container {
          width: 100%;
          max-width: 1000px; /* Limits width for a matured editorial look */
        }

        /* --- Header Styling --- */
        .history-hero {
          margin-bottom: 100px;
        }

        .history-hero h1 {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.85;
          margin-bottom: 2rem;
          background: linear-gradient(180deg, #fff 0%, #444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .history-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .search-placeholder {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #444;
          font-weight: 600;
          font-size: 0.95rem;
        }

        /* --- Ledger Flow --- */
        .ledger-group {
          margin-top: 60px;
        }

        .date-divider {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #ff9800;
          margin-bottom: 40px;
          display: block;
        }

        .ledger-item {
          display: grid;
          grid-template-columns: 80px 1fr 180px;
          align-items: center;
          padding: 32px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          transition: all 0.4s ease;
        }

        .ledger-item:hover {
          background: rgba(255,255,255,0.01);
          padding-left: 20px;
          padding-right: 20px;
          transform: translateX(10px);
          border-bottom-color: rgba(255,255,255,0.1);
        }

        .icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-group h3 {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .text-group p {
          color: #555;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .amount-group {
          text-align: right;
        }

        .amount-val {
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          display: block;
        }

        .amount-val.plus { color: #10b981; }
        .amount-val.minus { color: #ef4444; }

        @media (max-width: 800px) {
          .ledger-item { grid-template-columns: 1fr auto; gap: 20px; }
          .icon-circle { display: none; }
          .history-hero h1 { text-align: left; }
        }
      `}</style>

      <div className="history-container">
        {/* Editorial Header */}
        <motion.header className="history-hero" {...fadeInUp}>
          <span style={{ color: '#ff9800', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Showcase Only</span>
          <h1>History.</h1>
          
          <div className="history-nav">
            <div className="search-placeholder">
              <Search size={20} /> Search 2026 Archive...
            </div>
            <div style={{ display: 'flex', gap: '24px', color: '#666' }}>
              <Filter size={20} />
              <Download size={20} />
            </div>
          </div>
        </motion.header>

        {/* History Group */}
        <div className="ledger-group">
          <motion.span className="date-divider" {...fadeInUp}>February 2026</motion.span>
          
          <div className="ledger-stack">
            {logs.map((log, i) => (
              <motion.div 
                key={log.id} 
                className="ledger-item"
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <div className="icon-circle">
                  {log.type === 'sale' ? 
                    <ArrowDownLeft size={20} color="#10b981" /> : 
                    <ArrowUpRight size={20} color="#ef4444" />
                  }
                </div>
                
                <div className="text-group">
                  <h3>{log.title}</h3>
                  <p>{log.time} • Securely logged offline</p>
                </div>

                <div className="amount-group">
                  <span className={`amount-val ${log.type === 'sale' ? 'plus' : 'minus'}`}>
                    {log.type === 'sale' ? '+' : '-'}{log.amount}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#333', fontWeight: 800, textTransform: 'uppercase' }}>Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note Section */}
        <motion.div 
          style={{ marginTop: '100px', textAlign: 'center', opacity: 0.3 }}
          {...fadeInUp}
        >
          <Calendar size={40} style={{ marginBottom: '20px' }} />
          <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.9rem' }}>
            To view your complete business history, please open the Koraq app on your mobile device. All data is kept strictly on-device.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default History;