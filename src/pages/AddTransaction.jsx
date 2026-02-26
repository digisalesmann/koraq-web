import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Check, 
  Tag, 
  Calendar as CalIcon, 
  FileText, 
  ArrowDownCircle, 
  ArrowUpCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('sale');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="entry-viewport">
      <style>{`
        .entry-viewport {
          padding: 160px 5% 120px;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .entry-container {
          width: 100%;
          max-width: 600px;
        }

        /* --- Minimalist Type Toggle (No Highlights) --- */
        .type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 60px;
        }

        .type-btn {
          padding: 18px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          color: #444;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Active Sale: Just a border and text color */
        .type-btn.active.sale { 
          color: #10b981; 
          border-color: rgba(16, 185, 129, 0.4);
          text-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
        }

        /* Active Expense: Just a border and text color */
        .type-btn.active.expense { 
          color: #ef4444; 
          border-color: rgba(239, 68, 68, 0.4);
          text-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
        }

        .type-btn:not(.active):hover {
          border-color: rgba(255, 255, 255, 0.15);
          color: #888;
        }

        /* --- Input Styling --- */
        .input-group { margin-bottom: 50px; }
        
        .input-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 12px;
          display: block;
        }

        .amount-input-wrap {
          display: flex;
          align-items: baseline;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .big-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 4rem;
          font-weight: 900;
          width: 100%;
          outline: none;
          letter-spacing: -0.06em;
        }

        .field-row {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .field-row input {
          background: transparent;
          border: none;
          color: #888;
          font-size: 1rem;
          width: 100%;
          outline: none;
        }

        .btn-save {
          width: 100%;
          margin-top: 60px;
          padding: 24px;
          border-radius: 20px;
          background: #fff;
          color: #000;
          border: none;
          font-weight: 900;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.2s ease;
        }

        .btn-save:active { transform: scale(0.98); }

        @media (max-width: 600px) {
          .big-input { font-size: 2.8rem; }
        }
      `}</style>

      <div className="entry-container">
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '60px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}>
            <X size={28} />
          </button>
        </div>

        <motion.div {...fadeInUp}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px', color: '#444' }}>
            New Transaction
          </h1>

          {/* Clean Type Selector */}
          <div className="type-selector">
            <button 
              className={`type-btn ${type === 'sale' ? 'active sale' : ''}`}
              onClick={() => setType('sale')}
            >
              <ArrowDownCircle size={18} /> Sales
            </button>
            <button 
              className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
              onClick={() => setType('expense')}
            >
              <ArrowUpCircle size={18} /> Expense
            </button>
          </div>

          <div className="input-group">
            <label className="input-label">Volume (NGN)</label>
            <div className="amount-input-wrap">
              <input type="number" placeholder="0.00" className="big-input" autoFocus />
            </div>
          </div>

          <div className="fields-stack">
            <div className="field-row">
              <Tag size={18} color="#333" />
              <input type="text" placeholder="Entry Category" />
            </div>
            <div className="field-row">
              <FileText size={18} color="#333" />
              <input type="text" placeholder="Add memorandum..." />
            </div>
            <div className="field-row">
              <CalIcon size={18} color="#333" />
              <input type="text" placeholder="Feb 26, 2026" readOnly />
            </div>
          </div>

          <button className="btn-save" onClick={() => navigate('/dashboard')}>
            Finalize Entry <Check size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AddTransaction;