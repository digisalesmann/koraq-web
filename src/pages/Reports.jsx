import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  Download, 
  Share2, 
  TrendingUp, 
  ArrowUpRight,
  Info
} from 'lucide-react';

const Reports = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="reports-viewport">
      <style>{`
        .reports-viewport {
          padding: 160px 5% 120px;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .reports-inner {
          width: 100%;
          max-width: 1100px;
        }

        /* --- Editorial Header --- */
        .reports-hero {
          margin-bottom: 100px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 30px;
        }

        .reports-hero h1 {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.85;
        }

        /* --- Analysis Grid (Blueprint Style) --- */
        .analysis-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .analysis-cell {
          background: #0a0a0a;
          padding: 60px;
        }

        .cell-label {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          color: #ff9800;
          text-transform: uppercase;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* --- Ghost Chart Visualization --- */
        .chart-visual {
          width: 100%;
          height: 200px;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin-top: 40px;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.05));
          border-top: 2px solid #10b981;
          border-radius: 4px 4px 0 0;
          transition: height 1s ease-out;
        }

        /* --- Insight List --- */
        .insight-row {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .insight-row span:first-child { color: #555; font-weight: 600; font-size: 0.9rem; }
        .insight-row span:last-child { font-weight: 800; font-size: 0.9rem; }

        @media (max-width: 900px) {
          .analysis-grid { grid-template-columns: 1fr; }
          .analysis-cell { padding: 40px; }
        }
      `}</style>

      <div className="reports-inner">
        {/* Header Section */}
        <motion.header className="reports-hero" {...fadeInUp}>
          <div>
            <span style={{ color: '#ff9800', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.2em' }}>ANALYTICS ENGINE</span>
            <h1>Growth <br/> Insights.</h1>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', gap: '8px' }}>
              <Download size={18} /> Export PDF
            </button>
          </div>
        </motion.header>

        {/* Action Canvas */}
        <div className="analysis-grid">
          
          {/* Main Chart Cell */}
          <motion.div className="analysis-cell" {...fadeInUp}>
            <div className="cell-label"><TrendingUp size={14} /> 30-Day Profit Curve</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}>₦842,000.00</h2>
            <p style={{ color: '#555', marginTop: '8px' }}>Total net margin for February 2026</p>
            
            {/* Visual Bar Chart */}
            <div className="chart-visual">
              <div className="chart-bar" style={{ height: '40%' }}></div>
              <div className="chart-bar" style={{ height: '65%' }}></div>
              <div className="chart-bar" style={{ height: '50%' }}></div>
              <div className="chart-bar" style={{ height: '90%' }}></div>
              <div className="chart-bar" style={{ height: '75%' }}></div>
              <div className="chart-bar" style={{ height: '100%' }}></div>
              <div className="chart-bar" style={{ height: '85%' }}></div>
            </div>
          </motion.div>

          {/* Breakdown Cell */}
          <motion.div className="analysis-cell" {...fadeInUp} transition={{ delay: 0.2 }}>
            <div className="cell-label"><PieChart size={14} /> Distribution</div>
            
            <div className="insight-row" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span>Sales Revenue</span>
              <span style={{ color: '#10b981' }}>₦1.2M</span>
            </div>
            <div className="insight-row">
              <span>Cost of Goods</span>
              <span>-₦240K</span>
            </div>
            <div className="insight-row">
              <span>Operational Expenses</span>
              <span>-₦118K</span>
            </div>
            <div className="insight-row" style={{ borderBottom: 'none' }}>
              <span>Net Efficiency</span>
              <span style={{ color: '#ff9800' }}>72.4%</span>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255, 152, 0, 0.05)', borderRadius: '16px', display: 'flex', gap: '12px' }}>
              <Info size={20} color="#ff9800" />
              <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: '1.4' }}>
                Your profit margin increased by 12% compared to January. Top category: WhatsApp Sales.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Footer Note */}
        <motion.div 
          style={{ marginTop: '80px', textAlign: 'center' }}
          {...fadeInUp}
        >
          <p style={{ color: '#444', fontSize: '0.9rem', marginTop: '24px', maxWidth: '500px', marginInline: 'auto' }}>
            Koraq generates real-time business health scores. For live interactive charts and full PDF exports, please use the Koraq mobile app.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;