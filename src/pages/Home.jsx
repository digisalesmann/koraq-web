import React, { useRef } from 'react';
import DownloadButton from '../components/DownloadButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const heroOpa = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const reveal = {
    initial:     { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-80px' },
    transition:  { duration: 1, ease: [0.16, 1, 0.3, 1] },
  };

  const revealD = (d = 0) => ({
    ...reveal,
    transition: { ...reveal.transition, delay: d },
  });

  return (
    <div className="hx-root">
      <style>{`
        /* ── Reset ───────────────────────── */
        .hx-root {
          background: #080808;
          color: #fff;
          overflow-x: hidden;
          font-family: 'Satoshi', sans-serif;
        }

        /* ── Hero ────────────────────────── */
        .hx-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 140px 6% 10vh;
          position: relative;
          overflow: hidden;
        }

        .hx-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%,
            rgba(255,152,0,0.06) 0%, transparent 68%);
          pointer-events: none;
        }

        .hx-hero-eyebrow {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 28px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hx-hero-title {
          font-size: clamp(3.8rem, 10vw, 7.5rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.88;
          text-align: center;
          color: #fff;
          position: relative;
          z-index: 1;
        }

        .hx-hero-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.22);
        }

        .hx-hero-sub {
          margin-top: 36px;
          max-width: 420px;
          text-align: center;
          color: #4a4a4a;
          font-size: 1rem;
          line-height: 1.65;
          font-weight: 400;
          position: relative;
          z-index: 1;
        }

        .hx-hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        /* ── Ticker ──────────────────────── */
        .hx-ticker-wrap {
          overflow: hidden;
          padding: 22px 0;
          border-top: 1px solid rgba(255,255,255,0.055);
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .hx-ticker-track {
          display: flex;
          width: max-content;
          animation: hxTick 30s linear infinite;
        }

        .hx-ticker-track:hover { animation-play-state: paused; }

        .hx-ticker-item {
          display: flex;
          align-items: center;
          gap: 36px;
          padding: 0 36px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #252525;
          white-space: nowrap;
        }

        .hx-ticker-item::after {
          content: '';
          width: 3px; height: 3px;
          background: #ff9800;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @keyframes hxTick {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Numbers row ─────────────────── */
        .hx-numbers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .hx-num-cell {
          padding: 52px 5%;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .hx-num-cell:last-child { border-right: none; }

        .hx-num-val {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #fff;
          line-height: 1;
          margin-bottom: 10px;
        }

        .hx-num-val span { color: #ff9800; }

        .hx-num-lbl {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2e2e2e;
        }

        /* ── Editorial ───────────────────── */
        .hx-ed {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 92vh;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .hx-ed.flip { direction: rtl; }
        .hx-ed.flip > * { direction: ltr; }

        .hx-ed-copy {
          padding: clamp(80px, 9vw, 140px) clamp(48px, 6%, 110px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .hx-ed.flip .hx-ed-copy {
          border-right: none;
          border-left: 1px solid rgba(255,255,255,0.055);
        }

        .hx-ed-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 24px;
        }

        .hx-ed-h {
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.9;
          margin-bottom: 28px;
          color: #fff;
        }

        .hx-ed-p {
          font-size: 1.05rem;
          color: #666;
          line-height: 1.75;
          max-width: 400px;
          font-weight: 400;
          margin-bottom: 44px;
        }

        .hx-ed-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding-bottom: 4px;
          width: fit-content;
          transition: color 0.2s, border-color 0.2s;
        }

        .hx-ed-link:hover { color: #ff9800; border-color: #ff9800; }

        /* ── Image panel ─────────────────── */
        .hx-ed-img-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0c0c0c;
          overflow: hidden;
          position: relative;
          padding: 60px 40px;
        }

        .hx-ed-img-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(255,152,0,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Portrait frame */
        .hx-ss {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 40px 80px rgba(0,0,0,0.75),
            0 80px 160px rgba(0,0,0,0.4);
          max-height: 68vh;
          transition: transform 0.6s ease;
        }

        .hx-ss:hover { transform: scale(1.015) rotate(0deg) !important; }
        .hx-ss img { display: block; width: 100%; height: 100%; object-fit: cover; }

        /* Landscape frame */
        .hx-ss-land {
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 40px 80px rgba(0,0,0,0.75),
            0 80px 160px rgba(0,0,0,0.4);
          max-width: 88%;
          transition: transform 0.6s ease;
        }

        .hx-ss-land:hover { transform: scale(1.015) rotate(0deg) !important; }
        .hx-ss-land img { display: block; width: 100%; height: auto; }

        /* ── Full-bleed escrow text ───────── */
        .hx-fb {
          padding: clamp(80px, 11vw, 150px) 6%;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          position: relative;
        }

        .hx-fb-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 32px;
        }

        .hx-fb-h {
          font-size: clamp(2.8rem, 6.5vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.88;
          color: #fff;
          max-width: 820px;
        }

        .hx-fb-h em { font-style: normal; color: #ff9800; }

        .hx-fb-aside {
          position: absolute;
          right: 6%;
          bottom: clamp(80px, 11vw, 150px);
          max-width: 320px;
          text-align: right;
        }

        .hx-fb-p {
          font-size: 0.92rem;
          color: #333;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        /* ── Two-column text ─────────────── */
        .hx-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .hx-two-col-cell {
          padding: clamp(56px, 7vw, 110px) clamp(36px, 5.5%, 96px);
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .hx-two-col-cell:last-child { border-right: none; }

        /* ── AI visual break ─────────────── */
        .hx-ai-break {
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          max-height: 66vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0c0c0c;
        }

        .hx-ai-break img {
          width: 100%;
          max-width: 600px;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* ── CTA ─────────────────────────── */
        .hx-cta {
          padding: clamp(100px, 14vw, 180px) 6%;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hx-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 65% at 50% 100%,
            rgba(255,152,0,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .hx-cta-h {
          font-size: clamp(3.2rem, 10vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.85;
          color: #fff;
          margin-bottom: 32px;
        }

        .hx-cta-h em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.18);
        }

        .hx-cta-p {
          color: #2e2e2e;
          font-size: 0.92rem;
          max-width: 340px;
          margin: 0 auto 48px;
          line-height: 1.65;
        }

        /* ── Shared buttons ──────────────── */
        .hx-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff9800;
          color: #000;
          font-size: 0.86rem;
          font-weight: 800;
          letter-spacing: 0.01em;
          padding: 15px 32px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }

        .hx-btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .hx-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #3a3a3a;
          font-size: 0.86rem;
          font-weight: 600;
          padding: 15px 32px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .hx-btn-ghost:hover { border-color: rgba(255,255,255,0.18); color: #fff; }

        /* ── Responsive ──────────────────── */
        @media (max-width: 860px) {
          .hx-ed, .hx-two-col { grid-template-columns: 1fr; min-height: auto; }
          .hx-ed.flip { direction: ltr; }
          .hx-ed-copy {
            border-right: none !important;
            border-left: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.055);
          }
          .hx-ed-img-panel { min-height: 320px; padding: 40px 20px; }
          .hx-numbers { grid-template-columns: repeat(2, 1fr); }
          .hx-num-cell:nth-child(2) { border-right: none; }
          .hx-num-cell:nth-child(3),
          .hx-num-cell:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.055); }
          .hx-fb-aside { position: static; text-align: left; max-width: none; margin-top: 36px; }
          .hx-two-col-cell { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.055); }
          .hx-two-col-cell:last-child { border-bottom: none; }
          .hx-ai-break { max-height: none; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="hx-hero" ref={heroRef}>
        <div className="hx-hero-glow" />

        <motion.p
          className="hx-hero-eyebrow"
          style={{ y: heroY, opacity: heroOpa }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          AI Business Ledger · Built for Africa
        </motion.p>

        <motion.h1
          className="hx-hero-title"
          style={{ y: heroY, opacity: heroOpa }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          EVERY<br /><em>KOBO</em><br />COUNTS.
        </motion.h1>

        <motion.p
          className="hx-hero-sub"
          style={{ y: heroY, opacity: heroOpa }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          The high-fidelity business ledger for African traders. Track sales, manage inventory, and grow with AI.
        </motion.p>

        <motion.div
          className="hx-hero-actions"
          style={{ y: heroY, opacity: heroOpa }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <DownloadButton className="hx-btn-primary">
            Download Free <ArrowRight size={15} />
          </DownloadButton>
          <Link to="/reports" className="hx-btn-ghost">
            See Reports
          </Link>
        </motion.div>
      </section>

      {/* ── TICKER ───────────────────────────────── */}
      <div className="hx-ticker-wrap">
        <div className="hx-ticker-track">
          {[
            'Track Sales','Manage Inventory','Escrow Payments',
            'WhatsApp Invoices','AI Insights','Credit Scores',
            'Multi-Currency','Debt Tracker','PDF Reports',
            'Priority Inbox','Supply Market','Digital Business Card',
            'Track Sales','Manage Inventory','Escrow Payments',
            'WhatsApp Invoices','AI Insights','Credit Scores',
            'Multi-Currency','Debt Tracker','PDF Reports',
            'Priority Inbox','Supply Market','Digital Business Card',
          ].map((t, i) => (
            <span className="hx-ticker-item" key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── NUMBERS ──────────────────────────────── */}
      <div className="hx-numbers">
        {[
          { val: '100', sup: '%',    lbl: 'End-to-End Encrypted' },
          { val: '6',   sup: ' FX',  lbl: 'Currencies Supported' },
          { val: '10',  sup: '+',    lbl: 'Built-in Features'    },
          { val: '300', sup: '–850', lbl: 'AI Credit Scoring'    },
        ].map(({ val, sup, lbl }, i) => (
          <motion.div className="hx-num-cell" key={i} {...revealD(i * 0.07)}>
            <div className="hx-num-val">{val}<span>{sup}</span></div>
            <div className="hx-num-lbl">{lbl}</div>
          </motion.div>
        ))}
      </div>

      {/* ── ED 1: Analytics ──────────────────────── */}
      <section className="hx-ed">
        <motion.div className="hx-ed-copy" {...reveal}>
          <div className="hx-ed-tag">Intelligence</div>
          <h2 className="hx-ed-h">Automatic<br />Net Margins.</h2>
          <p className="hx-ed-p">
            Forget the calculator. Koraq deducts cost-of-goods and logistics from every sale in real time, revealing your true bottom line without the mental math.
          </p>
          <Link to="/dashboard" className="hx-ed-link">
            Open Dashboard <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        <motion.div className="hx-ed-img-panel" {...revealD(0.14)}>
          <div className="hx-ss-land" style={{ transform: 'rotate(-2deg)' }}>
            <img src="/images/analytics.jpeg" alt="Koraq analytics — net profit chart" />
          </div>
        </motion.div>
      </section>

      {/* ── ED 2: Invoice (flipped) ──────────────── */}
      <section className="hx-ed flip">
        <motion.div className="hx-ed-copy" {...reveal}>
          <div className="hx-ed-tag">Reporting</div>
          <h2 className="hx-ed-h">WhatsApp<br />Ready Invoices.</h2>
          <p className="hx-ed-p">
            Generate professional PDF invoices and share them directly on WhatsApp with one tap. Pro users can also print instantly via Bluetooth thermal printers.
          </p>
          <Link to="/reports" className="hx-ed-link">
            Preview a Report <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        <motion.div className="hx-ed-img-panel" {...revealD(0.14)}>
          <div className="hx-ss-land" style={{ transform: 'rotate(1.5deg)' }}>
            <img src="/images/invoice.jpeg" alt="Koraq invoice generator" />
          </div>
        </motion.div>
      </section>

      {/* ── ED 3: History ────────────────────────── */}
      <section className="hx-ed">
        <motion.div className="hx-ed-copy" {...reveal}>
          <div className="hx-ed-tag">Transactions</div>
          <h2 className="hx-ed-h">Every Entry.<br />Crystal Clear.</h2>
          <p className="hx-ed-p">
            Record every sale and expense in seconds. Filter by date, assign categories, attach notes, and export clean PDFs, all from one screen.
          </p>
          <Link to="/history" className="hx-ed-link">
            View History <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        <motion.div className="hx-ed-img-panel" {...revealD(0.14)}>
          <div
            className="hx-ss"
            style={{ width: 'min(260px, 55%)', transform: 'rotate(-1.5deg)' }}
          >
            <img src="/images/history.jpeg" alt="Koraq transaction history" />
          </div>
        </motion.div>
      </section>

      {/* ── FULL-BLEED: Escrow statement ─────────── */}
      <motion.section className="hx-fb" {...reveal}>
        <div className="hx-fb-tag">Escrow Payments</div>
        <h2 className="hx-fb-h">
          Send money.<br /><em>Risk-free.</em>
        </h2>
        <div className="hx-fb-aside">
          <p className="hx-fb-p">
            Koraq holds funds safely until both parties confirm a deal, then releases to the payee instantly. Built for trades, freelance, and marketplace transactions.
          </p>
          <DownloadButton className="hx-btn-primary" style={{ fontSize: '0.8rem' }}>
            Start a Transaction <ArrowRight size={13} />
          </DownloadButton>
        </div>
      </motion.section>

      {/* ── ED 4: Inventory (flipped) ────────────── */}
      <section className="hx-ed flip">
        <motion.div className="hx-ed-copy" {...reveal}>
          <div className="hx-ed-tag">Inventory</div>
          <h2 className="hx-ed-h">Stock Levels.<br />Always Known.</h2>
          <p className="hx-ed-p">
            Track every product in real time. Get low-stock alerts before you run dry, manage customer debts, and keep supplier records, all in one place. Unlimited items on Pro.
          </p>
        </motion.div>

        <motion.div className="hx-ed-img-panel" {...revealD(0.14)}>
          <div className="hx-ss-land" style={{ transform: 'rotate(-1deg)' }}>
            <img src="/images/inventory.jpeg" alt="Koraq stock manager and inventory" />
          </div>
        </motion.div>
      </section>

      {/* ── TWO-COL: Security + AI ───────────────── */}
      <section className="hx-two-col">
        <motion.div className="hx-two-col-cell" {...reveal}>
          <div className="hx-ed-tag">Security</div>
          <h2 className="hx-ed-h" style={{ fontSize: 'clamp(1.9rem, 3.2vw, 3rem)' }}>
            Your Data.<br />Your Vault.
          </h2>
          <p className="hx-ed-p">
            Bank-grade encryption, session auto-lock, and privacy mode keep your financials invisible to everyone but you, synced securely across all your devices.
          </p>
        </motion.div>

        <motion.div className="hx-two-col-cell" {...revealD(0.14)}>
          <div className="hx-ed-tag">AI Assistant</div>
          <h2 className="hx-ed-h" style={{ fontSize: 'clamp(1.9rem, 3.2vw, 3rem)' }}>
            Ask Any<br />Business<br />Question.
          </h2>
          <p className="hx-ed-p">
            From understanding your cash flow to navigating features. Koraq's AI assistant is always on, always instant. No accountant required.
          </p>
        </motion.div>
      </section>

      {/* ── AI visual break ───────────────────────── */}
      <motion.div className="hx-ai-break" {...reveal}>
        <img src="/images/ai.jpeg" alt="Koraq AI business insights screen" />
      </motion.div>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="hx-cta">
        <motion.h2 className="hx-cta-h" {...reveal}>
          UPGRADE<br /><em>TO PRO.</em>
        </motion.h2>
        <motion.p className="hx-cta-p" {...revealD(0.1)}>
          Unlimited inventory, thermal printing, AI insights, priority inbox, and smart reminders, unlock everything.
        </motion.p>
        <motion.div {...revealD(0.18)}>
          <DownloadButton
            className="hx-btn-primary"
            style={{ fontSize: '0.98rem', padding: '18px 48px' }}
          >
            Download Koraq Free
          </DownloadButton>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;