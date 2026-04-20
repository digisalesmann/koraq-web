import DownloadButton from '../components/DownloadButton';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Plus, FileText, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── helpers ────────────────────────────────────── */
const reveal = {
  initial:     { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-70px' },
  transition:  { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
};
const revealD = (d = 0) => ({ ...reveal, transition: { ...reveal.transition, delay: d } });

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const Dashboard = () => {
  return (
    <div className="db-root">
      <style>{`
        /* ── Root ───────────────────────────── */
        .db-root {
          background: #080808;
          color: #fff;
          overflow-x: hidden;
          font-family: 'Satoshi', sans-serif;
        }

        /* ── Hero ───────────────────────────── */
        .db-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 140px 6% 10vh;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          text-align: center;
        }

        .db-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 55% at 50% 0%,
            rgba(255,152,0,0.07) 0%, transparent 68%);
          pointer-events: none;
        }

        .db-eyebrow {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }

        .db-hero-title {
          font-size: clamp(3.4rem, 9vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.88;
          color: #fff;
          position: relative; z-index: 1;
          margin-bottom: 32px;
        }

        .db-hero-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.22);
        }

        .db-hero-sub {
          max-width: 420px;
          color: #505050;
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 400;
          position: relative; z-index: 1;
          margin-bottom: 48px;
        }

        .db-hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          position: relative; z-index: 1;
        }

        /* ── Stat strip ─────────────────────── */
        .db-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .db-strip-cell {
          padding: 52px 5%;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .db-strip-cell:last-child { border-right: none; }

        .db-strip-val {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          margin-bottom: 10px;
          color: #fff;
        }

        .db-strip-val span { color: #ff9800; }

        .db-strip-lbl {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2a2a2a;
        }

        /* ── App preview section ────────────── */
        .db-preview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 92vh;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .db-preview-copy {
          padding: clamp(80px, 9vw, 140px) clamp(48px, 6%, 110px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .db-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 24px;
        }

        .db-section-h {
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.9;
          margin-bottom: 28px;
          color: #fff;
        }

        .db-section-p {
          font-size: 1.05rem;
          color: #555;
          line-height: 1.75;
          max-width: 400px;
          margin-bottom: 44px;
        }

        .db-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding-bottom: 4px;
          width: fit-content;
          transition: color 0.2s, border-color 0.2s;
        }

        .db-link:hover { color: #ff9800; border-color: #ff9800; }

        /* ── Image panel ────────────────────── */
        .db-preview-visual {
          background: #0c0c0c;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
          overflow: hidden;
        }

        .db-preview-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(255,152,0,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .db-dash-img {
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 40px 80px rgba(0,0,0,0.75),
            0 80px 160px rgba(0,0,0,0.4);
          max-width: 88%;
          transform: rotate(-1.5deg);
          transition: transform 0.6s ease;
          position: relative;
          z-index: 1;
        }

        .db-dash-img:hover { transform: rotate(0deg) scale(1.015); }
        .db-dash-img img { display: block; width: 100%; height: auto; }

        /* ── Quick-action cards ──────────────── */
        .db-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .db-action-card {
          padding: clamp(48px, 6vw, 88px) clamp(32px, 5%, 72px);
          border-right: 1px solid rgba(255,255,255,0.055);
          text-decoration: none;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
        }

        .db-action-card:last-child { border-right: none; }
        .db-action-card:hover { background: rgba(255,255,255,0.015); }

        .db-action-icon {
          width: 48px; height: 48px;
          background: rgba(255,152,0,0.08);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff9800;
          flex-shrink: 0;
        }

        .db-action-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #2a2a2a;
        }

        .db-action-h {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: #fff;
        }

        .db-action-p {
          font-size: 0.88rem;
          color: #383838;
          line-height: 1.65;
          max-width: 260px;
        }

        .db-action-arrow {
          position: absolute;
          top: clamp(32px, 5vw, 56px);
          right: clamp(24px, 4%, 48px);
          color: rgba(255,255,255,0.08);
          transition: color 0.25s, transform 0.25s;
        }

        .db-action-card:hover .db-action-arrow {
          color: #ff9800;
          transform: translate(2px, -2px);
        }

        /* ── Full-bleed feature statement ───── */
        .db-bleed {
          padding: clamp(80px, 11vw, 150px) 6%;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          position: relative;
        }

        .db-bleed-h {
          font-size: clamp(2.8rem, 6.5vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.88;
          color: #fff;
          max-width: 820px;
        }

        .db-bleed-h em { font-style: normal; color: #ff9800; }

        .db-bleed-aside {
          position: absolute;
          right: 6%;
          bottom: clamp(80px, 11vw, 150px);
          max-width: 320px;
          text-align: right;
        }

        .db-bleed-p {
          font-size: 0.95rem;
          color: #333;
          line-height: 1.72;
          margin-bottom: 28px;
        }

        /* ── Two-col feature ────────────────── */
        .db-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .db-two-col-cell {
          padding: clamp(56px, 7vw, 110px) clamp(36px, 5.5%, 96px);
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .db-two-col-cell:last-child { border-right: none; }

        /* ── CTA ────────────────────────────── */
        .db-cta {
          padding: clamp(100px, 14vw, 180px) 6%;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .db-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 65% at 50% 100%,
            rgba(255,152,0,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .db-cta-h {
          font-size: clamp(3.2rem, 10vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.85;
          color: #fff;
          margin-bottom: 32px;
        }

        .db-cta-h em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.18);
        }

        .db-cta-p {
          color: #2e2e2e;
          font-size: 0.95rem;
          max-width: 340px;
          margin: 0 auto 48px;
          line-height: 1.65;
        }

        /* ── Buttons ────────────────────────── */
        .db-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff9800;
          color: #000;
          font-size: 0.88rem;
          font-weight: 800;
          padding: 16px 36px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }

        .db-btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .db-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #333;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 16px 36px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }

        .db-btn-ghost:hover { border-color: rgba(255,255,255,0.18); color: #fff; }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 860px) {
          .db-preview, .db-two-col { grid-template-columns: 1fr; min-height: auto; }
          .db-preview-copy { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.055); }
          .db-preview-visual { min-height: 540px; padding: 48px 20px; }
          .db-strip { grid-template-columns: repeat(2, 1fr); }
          .db-strip-cell:nth-child(2) { border-right: none; }
          .db-strip-cell:nth-child(3),
          .db-strip-cell:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.055); }
          .db-actions { grid-template-columns: 1fr; }
          .db-action-card { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.055); }
          .db-action-card:last-child { border-bottom: none; }
          .db-bleed-aside { position: static; text-align: left; max-width: none; margin-top: 36px; }
          .db-two-col-cell { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.055); }
          .db-two-col-cell:last-child { border-bottom: none; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="db-hero">
        <motion.p className="db-eyebrow"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Your Business Overview
        </motion.p>

        <motion.h1 className="db-hero-title"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          EVERYTHING<br />IN ONE<br /><em>PLACE.</em>
        </motion.h1>

        <motion.p className="db-hero-sub"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          Your net profit, transaction history, inventory levels, and AI insights, all visible from one screen, always up to date.
        </motion.p>

        <motion.div className="db-hero-actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <DownloadButton className="db-btn-primary">
            Download Free <ArrowRight size={15} />
          </DownloadButton>
          <Link to="/features" className="db-btn-ghost">
            See All Features
          </Link>
        </motion.div>
      </section>

      {/* ── STAT STRIP ────────────────────────────── */}
      <div className="db-strip">
        {[
            { val: 'Live',  sup: '',     lbl: 'Real-Time Updates'    },
          { val: '30',   sup: 'sec',  lbl: 'Avg. Entry Time'      },
          { val: 'PDF',  sup: '',     lbl: 'One-Tap Export'       },
          { val: '100',  sup: '%',    lbl: 'Yours. Encrypted.'    },
        ].map(({ val, sup, lbl }, i) => (
          <motion.div className="db-strip-cell" key={i} {...revealD(i * 0.07)}>
            <div className="db-strip-val">{val}<span>{sup}</span></div>
            <div className="db-strip-lbl">{lbl}</div>
          </motion.div>
        ))}
      </div>

      {/* ── APP PREVIEW ───────────────────────────── */}
      <section className="db-preview">
        <motion.div className="db-preview-copy" {...reveal}>
          <div className="db-tag">Dashboard Preview</div>
          <h2 className="db-section-h">Your Numbers.<br />Front & Centre.</h2>
          <p className="db-section-p">
            The moment you open Koraq, your net profit greets you. Revenue, operating costs, and recent transactions, all on one screen before you've had your first cup of tea.
          </p>
          <Link to="/reports" className="db-link">
            Explore Reports <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        <motion.div className="db-preview-visual" {...revealD(0.14)}>
          <div className="db-dash-img">
            <img src="/images/dash.jpg" alt="Koraq dashboard — business overview" />
          </div>
        </motion.div>
      </section>

      {/* ── QUICK ACTIONS ─────────────────────────── */}
      <section className="db-actions">
        {[
          {
            to: '/features',
            icon: <Plus size={22} />,
            tag: 'Ledger',
            title: <>Log a Sale<br />or Expense.</>,
            desc: 'Record any transaction in seconds. Assign categories, add notes, and watch your profit update in real time.',
          },
          {
            to: '/reports',
            icon: <FileText size={22} />,
            tag: 'Reports',
            title: <>Your Financial<br />Statement.</>,
            desc: 'Generate a clean PDF report for any period. Share it on WhatsApp or send it to your accountant instantly.',
          },
          {
            to: '/features',
            icon: <Package size={22} />,
            tag: 'Inventory',
            title: <>Stock Levels.<br />Always Known.</>,
            desc: 'Track every product in real time. Get low-stock alerts and connect with suppliers directly from the app.',
          },
        ].map(({ to, icon, tag, title, desc }, i) => (
          <motion.div key={i} {...revealD(i * 0.1)}>
            <Link to={to} className="db-action-card">
              <ArrowUpRight size={18} className="db-action-arrow" />
              <div className="db-action-icon">{icon}</div>
              <div>
                <div className="db-action-tag">{tag}</div>
              </div>
              <h3 className="db-action-h">{title}</h3>
              <p className="db-action-p">{desc}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── FULL-BLEED: AI ────────────────────────── */}
      <motion.section className="db-bleed" {...reveal}>
        <div className="db-tag">AI Insights</div>
        <h2 className="db-bleed-h">
          Your business,<br /><em>explained.</em>
        </h2>
        <div className="db-bleed-aside">
          <p className="db-bleed-p">
            Koraq's AI analyses your last 30 transactions every 7 days, surfacing what's driving profit, flagging unnecessary costs, and telling you exactly where to focus next. No spreadsheet required.
          </p>
          <DownloadButton className="db-btn-primary" style={{ fontSize: '0.8rem' }}>
            Get AI Insights <ArrowRight size={13} />
          </DownloadButton>
        </div>
      </motion.section>

      {/* ── TWO-COL: Escrow + Credit Score ────────── */}
      <section className="db-two-col">
        <motion.div className="db-two-col-cell" {...reveal}>
          <div className="db-tag">Escrow</div>
          <h2 className="db-section-h" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
            Send Money.<br />Risk-Free.
          </h2>
          <p className="db-section-p" style={{ fontSize: '0.97rem' }}>
            Koraq holds funds securely until both parties confirm the deal is complete, then releases instantly. Built for trades, freelance, and marketplace transactions where trust matters.
          </p>
          <Link to="/features" className="db-link">
            Learn about Escrow <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        <motion.div className="db-two-col-cell" {...revealD(0.12)}>
          <div className="db-tag">Credit Score</div>
          <h2 className="db-section-h" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
            Know Your<br />Business Score.
          </h2>
          <p className="db-section-p" style={{ fontSize: '0.97rem' }}>
            Your Koraq credit score (300-850) is calculated from your transaction consistency, income trends, and inventory behaviour, refreshing every 30 transactions so it always reflects your real business health.
          </p>
          <Link to="/features" className="db-link">
            See Credit Scoring <ArrowUpRight size={13} />
          </Link>
        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="db-cta">
        <motion.h2 className="db-cta-h" {...reveal}>
          GET THE<br /><em>FULL PICTURE.</em>
        </motion.h2>
        <motion.p className="db-cta-p" {...revealD(0.1)}>
          Download Koraq free and see your business clearly, net profit, stock, debts, and AI insights all in one place.
        </motion.p>
        <motion.div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }} {...revealD(0.18)}>
          <DownloadButton className="db-btn-primary" style={{ fontSize: '0.98rem', padding: '18px 48px' }}>
            Download Free
          </DownloadButton>
          <Link to="/pricing" className="db-btn-ghost">
            See Pricing
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
