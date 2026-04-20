import React, { useState, useEffect } from 'react';
import DownloadButton from '../components/DownloadButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── demo data per period ──────────────────────── */
const PERIODS = [
  { label: 'This Month',  range: '1 Apr 2026 → 30 Apr 2026' },
  { label: 'Last Month',  range: '1 Mar 2026 → 31 Mar 2026' },
  { label: '3 Months',    range: '1 Jan 2026 → 30 Apr 2026' },
  { label: '6 Months',    range: '1 Oct 2025 → 30 Apr 2026' },
];

const DATA = [
  {
    netProfit:    { val: '+₦1,011,800', positive: true  },
    revenue:      { val: '₦1,107,000', positive: true  },
    opCosts:      { val: '₦95,200',    positive: false },
    avgDaily:     { val: '+₦32,638',   positive: true  },
    margin:       '+91.4%',
    categories: [
      { name: 'Product Sales',   val: '₦680,000' },
      { name: 'Consulting',      val: '₦280,000' },
      { name: 'POS Withdrawal',  val: '₦147,000' },
    ],
    curve: [2,2,3,2,3,4,6,9,14,19,24,28,30,26,20,14,9,6,4,3,2,2,2,3,2,2,3,2,3,2],
  },
  {
    netProfit:    { val: '+₦540,200',  positive: true  },
    revenue:      { val: '₦620,000',  positive: true  },
    opCosts:      { val: '₦79,800',   positive: false },
    avgDaily:     { val: '+₦17,426',  positive: true  },
    margin:       '+87.1%',
    categories: [
      { name: 'Product Sales',   val: '₦410,000' },
      { name: 'Misc',            val: '₦130,000' },
      { name: 'Delivery Fees',   val: '₦80,000'  },
    ],
    curve: [2,3,4,5,6,8,10,12,14,16,17,16,14,12,10,9,8,7,6,5,5,5,5,5,4,4,4,3,3,3],
  },
  {
    netProfit:    { val: '+₦2,880,400', positive: true  },
    revenue:      { val: '₦3,120,000', positive: true  },
    opCosts:      { val: '₦239,600',   positive: false },
    avgDaily:     { val: '+₦31,983',   positive: true  },
    margin:       '+92.3%',
    categories: [
      { name: 'Product Sales',   val: '₦1,940,000' },
      { name: 'Consulting',      val: '₦740,000'   },
      { name: 'POS Withdrawal',  val: '₦440,000'   },
    ],
    curve: [3,4,5,6,7,9,11,14,17,20,22,21,19,17,15,14,13,12,11,10,11,13,16,20,24,26,25,22,18,14],
  },
  {
    netProfit:    { val: '+₦5,340,000', positive: true  },
    revenue:      { val: '₦5,980,000', positive: true  },
    opCosts:      { val: '₦640,000',   positive: false },
    avgDaily:     { val: '+₦29,670',   positive: true  },
    margin:       '+89.3%',
    categories: [
      { name: 'Product Sales',   val: '₦3,200,000' },
      { name: 'Consulting',      val: '₦1,600,000' },
      { name: 'Delivery Fees',   val: '₦1,180,000' },
    ],
    curve: [4,5,6,8,10,12,15,17,19,21,23,22,20,18,16,15,14,16,19,22,24,23,21,19,17,16,18,21,24,26],
  },
];

/* ─── SVG curve ─────────────────────────────────── */
const W = 300, H = 120, PAD = 10;

const buildPath = (points) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => PAD + (i / (points.length - 1)) * (W - PAD * 2));
  const ys = points.map(v => H - PAD - ((v - min) / range) * (H - PAD * 2));

  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i - 1] + xs[i]) / 2;
    d += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
  }
  return { d, xs, ys };
};

const buildFill = (points) => {
  const { d, xs, ys } = buildPath(points);
  const last = xs.length - 1;
  return `${d} L ${xs[last]} ${H - PAD} L ${xs[0]} ${H - PAD} Z`;
};

const Curve = ({ points }) => {
  const { d } = buildPath(points);
  const fill  = buildFill(points);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ff9800" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff9800" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#cg)" />
      <path d={d} fill="none" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ─── stat row ──────────────────────────────────── */
const StatRow = ({ label, value, positive, dim }) => (
  <div className="rp-stat-row">
    <span className="rp-stat-label">{label}</span>
    <span className={`rp-stat-val ${dim ? 'dim' : positive ? 'pos' : 'neg'}`}>{value}</span>
  </div>
);

/* ─── reveal ────────────────────────────────────── */
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
const Reports = () => {
  const [period, setPeriod] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const d = DATA[period];

  useEffect(() => { setAnimKey(k => k + 1); }, [period]);

  return (
    <div className="rp-root">
      <style>{`
        /* ── Root ───────────────────────── */
        .rp-root {
          background: #080808;
          color: #fff;
          overflow-x: hidden;
          font-family: 'Satoshi', sans-serif;
        }

        /* ── Hero ───────────────────────── */
        .rp-hero {
          min-height: 72vh;
          display: flex;
          align-items: flex-end;
          padding: 140px 6% 9vh;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .rp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 65% 55% at 30% 0%,
            rgba(255,152,0,0.06) 0%, transparent 65%);
          pointer-events: none;
        }

        .rp-hero-inner {
          max-width: 700px;
          position: relative; z-index: 1;
        }

        .rp-eyebrow {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 24px;
        }

        .rp-hero-title {
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.88;
          color: #fff;
          margin-bottom: 28px;
        }

        .rp-hero-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
        }

        .rp-hero-sub {
          max-width: 400px;
          color: #3a3a3a;
          font-size: 0.97rem;
          line-height: 1.65;
          font-weight: 400;
        }

        /* ── Demo section ───────────────── */
        .rp-demo-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          min-height: 90vh;
        }

        /* Left: context copy */
        .rp-demo-copy {
          padding: clamp(56px, 7vw, 110px) clamp(36px, 5.5%, 92px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .rp-demo-tag {
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 22px;
        }

        .rp-demo-h {
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.92;
          color: #fff;
          margin-bottom: 22px;
        }

        .rp-demo-p {
          font-size: 0.95rem;
          color: #3a3a3a;
          line-height: 1.72;
          max-width: 340px;
          margin-bottom: 40px;
        }

        .rp-feature-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rp-feature-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.84rem;
          color: #333;
          font-weight: 500;
        }

        .rp-feat-dot {
          width: 4px; height: 4px;
          background: #ff9800;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Right: phone mockup */
        .rp-demo-visual {
          background: #0c0c0c;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }

        .rp-demo-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(255,152,0,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Phone shell */
        .rp-phone {
          width: min(300px, 80%);
          background: #111;
          border-radius: 44px;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 18px 0 0;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.05),
            0 48px 96px rgba(0,0,0,0.8),
            0 96px 200px rgba(0,0,0,0.5);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .rp-phone-notch {
          width: 56px; height: 5px;
          background: #1c1c1c;
          border-radius: 100px;
          margin: 0 auto 16px;
        }

        .rp-phone-body {
          padding: 0 20px 24px;
        }

        /* Period tabs */
        .rp-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 2px;
        }

        .rp-tabs::-webkit-scrollbar { display: none; }

        .rp-tab {
          flex-shrink: 0;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          background: #1a1a1a;
          color: #333;
          letter-spacing: 0.03em;
        }

        .rp-tab.active {
          background: #ff9800;
          color: #000;
        }

        /* Date range */
        .rp-date-range {
          font-size: 0.58rem;
          color: #2a2a2a;
          font-weight: 600;
          margin-bottom: 14px;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rp-date-bar {
          width: 3px; height: 10px;
          background: #ff9800;
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* Chart area */
        .rp-chart-wrap {
          background: #0e0e0e;
          border-radius: 14px;
          padding: 14px 10px 8px;
          margin-bottom: 14px;
          overflow: hidden;
        }

        /* Stats */
        .rp-stat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .rp-stat-row:last-of-type { border-bottom: none; }

        .rp-stat-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: #4a4a4a;
        }

        .rp-stat-val {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .rp-stat-val.pos  { color: #22c55e; }
        .rp-stat-val.neg  { color: #ef4444; }
        .rp-stat-val.dim  { color: #fff; }

        /* Top categories */
        .rp-cats-label {
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2a2a2a;
          margin: 14px 0 8px;
        }

        .rp-cat-row {
          display: flex;
          justify-content: space-between;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.66rem;
        }

        .rp-cat-name { color: #4a4a4a; font-weight: 500; }
        .rp-cat-val  { color: #fff; font-weight: 700; }

        /* Action buttons inside phone */
        .rp-phone-actions {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .rp-phone-action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.64rem;
          font-weight: 700;
          width: 100%;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .rp-phone-action-btn:hover { opacity: 0.85; }

        .rp-phone-action-btn.orange {
          background: #ff9800;
          color: #000;
        }

        .rp-phone-action-btn.dark {
          background: #1a1a1a;
          color: #555;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .rp-phone-action-icon {
          width: 20px; height: 20px;
          background: rgba(0,0,0,0.15);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 10px;
        }

        .rp-phone-action-btn.dark .rp-phone-action-icon {
          background: rgba(255,255,255,0.04);
        }

        .rp-phone-action-text strong { display: block; font-size: 0.64rem; }
        .rp-phone-action-text span   { font-size: 0.55rem; opacity: 0.6; }

        /* Margin badge */
        .rp-margin-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          color: #22c55e;
          font-size: 0.56rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
          margin-bottom: 10px;
        }

        /* ── Stats strip ────────────────────── */
        .rp-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .rp-strip-cell {
          padding: 52px 5%;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .rp-strip-cell:last-child { border-right: none; }

        .rp-strip-val {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          margin-bottom: 9px;
          color: #fff;
        }

        .rp-strip-val span { color: #ff9800; }

        .rp-strip-lbl {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2a2a2a;
        }

        /* ── Editorial: PDF section ─────────── */
        .rp-editorial {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 80vh;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .rp-ed-copy {
          padding: clamp(56px, 7vw, 110px) clamp(36px, 5.5%, 92px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(255,255,255,0.055);
        }

        .rp-ed-tag {
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 22px;
        }

        .rp-ed-h {
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.92;
          color: #fff;
          margin-bottom: 22px;
        }

        .rp-ed-p {
          font-size: 0.95rem;
          color: #3a3a3a;
          line-height: 1.72;
          max-width: 340px;
          margin-bottom: 40px;
        }

        /* PDF doc visual */
        .rp-ed-visual {
          background: #0c0c0c;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
          overflow: hidden;
        }

        .rp-ed-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(255,152,0,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .rp-pdf-img {
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 40px 80px rgba(0,0,0,0.75),
            0 80px 160px rgba(0,0,0,0.4);
          max-width: 88%;
          transform: rotate(-1deg);
          transition: transform 0.6s ease;
          position: relative;
          z-index: 1;
        }

        .rp-pdf-img:hover { transform: rotate(0deg) scale(1.015); }
        .rp-pdf-img img { display: block; width: 100%; height: auto; }

        /* ── CTA ─────────────────────────────── */
        .rp-cta {
          padding: clamp(100px, 14vw, 180px) 6%;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .rp-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 65% at 50% 100%,
            rgba(255,152,0,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .rp-cta-h {
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          font-weight: 900;
          letter-spacing: -0.065em;
          line-height: 0.86;
          color: #fff;
          margin-bottom: 28px;
        }

        .rp-cta-h em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.16);
        }

        .rp-cta-p {
          color: #2a2a2a;
          font-size: 0.9rem;
          max-width: 320px;
          margin: 0 auto 44px;
          line-height: 1.65;
        }

        .rp-cta-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ── Shared buttons ──────────────────── */
        .rp-btn-primary {
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

        .rp-btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .rp-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #2a2a2a;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 16px 36px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }

        .rp-btn-ghost:hover { border-color: rgba(255,255,255,0.18); color: #fff; }

        .rp-ed-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 3px;
          width: fit-content;
          transition: color 0.2s, border-color 0.2s;
        }

        .rp-ed-link:hover { color: #ff9800; border-color: #ff9800; }

        /* ── Responsive ──────────────────────── */
        @media (max-width: 860px) {
          .rp-demo-section,
          .rp-editorial { grid-template-columns: 1fr; min-height: auto; }

          .rp-demo-copy {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.055);
          }

          .rp-demo-visual { min-height: 560px; padding: 48px 20px; }

          .rp-ed-copy {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.055);
          }

          .rp-ed-visual { min-height: 400px; padding: 48px 20px; }

          .rp-strip { grid-template-columns: repeat(2, 1fr); }
          .rp-strip-cell:nth-child(2) { border-right: none; }
          .rp-strip-cell:nth-child(3),
          .rp-strip-cell:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.055); }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────── */}
      <section className="rp-hero">
        <div className="rp-hero-inner">
          <motion.p className="rp-eyebrow"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Financial Insights
          </motion.p>

          <motion.h1 className="rp-hero-title"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            YOUR NUMBERS.<br /><em>CRYSTAL CLEAR.</em>
          </motion.h1>

          <motion.p className="rp-hero-sub"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            Koraq turns every transaction into a clean financial report, net profit, cash flow, top categories, and a PDF statement ready to share or print in seconds.
          </motion.p>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO ──────────────────── */}
      <section className="rp-demo-section">

        {/* Copy */}
        <motion.div className="rp-demo-copy" {...reveal}>
          <div className="rp-demo-tag">Live Preview</div>
          <h2 className="rp-demo-h">
            See Exactly<br />What You'll Get.
          </h2>
          <p className="rp-demo-p">
            Switch periods on the demo to see how Koraq summarises your business, from a single month to a full half-year view. Every number updates in real time inside the app.
          </p>
          <ul className="rp-feature-list">
            {[
              'Cash flow curve, visual at a glance',
              'Net profit after all expenses',
              'Total revenue & operating costs',
              'Average daily income',
              'Top earning categories',
              'Share as image or download PDF',
            ].map((f, i) => (
              <li key={i}><span className="rp-feat-dot" />{f}</li>
            ))}
          </ul>
        </motion.div>

        {/* Phone demo */}
        <motion.div className="rp-demo-visual" {...revealD(0.14)}>
          <div className="rp-phone">
            <div className="rp-phone-notch" />
            <div className="rp-phone-body">

              {/* Period tabs */}
              <div className="rp-tabs">
                {PERIODS.map((p, i) => (
                  <button
                    key={i}
                    className={`rp-tab ${period === i ? 'active' : ''}`}
                    onClick={() => setPeriod(i)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Date range */}
              <div className="rp-date-range">
                <div className="rp-date-bar" />
                {PERIODS[period].range}
              </div>

              {/* Chart */}
              <div className="rp-chart-wrap">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={animKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Curve points={d.curve} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Margin badge */}
              <div className="rp-margin-badge">
                <TrendingUp size={10} />
                {d.margin} margin
              </div>

              {/* Stats */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stats-${animKey}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StatRow label="Net Profit"       value={d.netProfit.val}  positive={d.netProfit.positive}  />
                  <StatRow label="Total Revenue"    value={d.revenue.val}    positive={d.revenue.positive}    />
                  <StatRow label="Operating Costs"  value={d.opCosts.val}    positive={d.opCosts.positive}    />
                  <StatRow label="Avg. Daily Income" value={d.avgDaily.val}  positive={d.avgDaily.positive}   />

                  {/* Categories */}
                  <div className="rp-cats-label">Top Categories</div>
                  {d.categories.map((c, i) => (
                    <div className="rp-cat-row" key={i}>
                      <span className="rp-cat-name">{c.name}</span>
                      <span className="rp-cat-val">{c.val}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Action buttons */}
              <div className="rp-phone-actions">
                <button className="rp-phone-action-btn orange">
                  <div className="rp-phone-action-icon">▣</div>
                  <div className="rp-phone-action-text">
                    <strong>Share Report Image</strong>
                    <span>Beautiful card for WhatsApp</span>
                  </div>
                </button>
                <button className="rp-phone-action-btn dark">
                  <div className="rp-phone-action-icon">↓</div>
                  <div className="rp-phone-action-text">
                    <strong>Download PDF Statement</strong>
                    <span>Full financial statement</span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STRIP ─────────────────────────────── */}
      <div className="rp-strip">
        {[
          { val: '4',    sup: ' periods',  lbl: 'Date Ranges'         },
          { val: 'PDF',  sup: '',          lbl: 'Export Format'       },
          { val: 'WA',   sup: '',          lbl: 'Share in One Tap'    },
          { val: '100',  sup: '%',         lbl: 'Your Data, Private'  },
        ].map(({ val, sup, lbl }, i) => (
          <motion.div className="rp-strip-cell" key={i} {...revealD(i * 0.07)}>
            <div className="rp-strip-val">{val}<span>{sup}</span></div>
            <div className="rp-strip-lbl">{lbl}</div>
          </motion.div>
        ))}
      </div>

      {/* ── EDITORIAL: PDF Statement ───────────── */}
      <section className="rp-editorial">
        <motion.div className="rp-ed-copy" {...reveal}>
          <div className="rp-ed-tag">PDF Statement</div>
          <h2 className="rp-ed-h">
            Audit-Ready.<br />Always.
          </h2>
          <p className="rp-ed-p">
            Generate a full financial statement for any period, branded with your business name, complete with revenue, expenses, transaction count, and category breakdown. Share it with your accountant, bank, or business partner in seconds.
          </p>
          <ul className="rp-feature-list" style={{ marginBottom: 36 }}>
            {[
              'Covers any selected date range',
              'Revenue, costs & net profit',
              'Category-level breakdown',
              'Share via WhatsApp or email',
              'Print via Bluetooth thermal printer (Pro)',
            ].map((f, i) => (
              <li key={i}><span className="rp-feat-dot" />{f}</li>
            ))}
          </ul>
          <DownloadButton className="rp-btn-primary" style={{ width: 'fit-content' }}>
            Download the App <ArrowRight size={14} />
          </DownloadButton>
        </motion.div>

        <motion.div className="rp-ed-visual" {...revealD(0.14)}>
          <div className="rp-pdf-img">
            <img src="/images/pdf.jpg" alt="Koraq PDF financial statement" />
          </div>
        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="rp-cta">
        <motion.h2 className="rp-cta-h" {...reveal}>
          YOUR REPORT.<br /><em>IN SECONDS.</em>
        </motion.h2>
        <motion.p className="rp-cta-p" {...revealD(0.1)}>
          Download Koraq and generate your first report today, free, no card needed.
        </motion.p>
        <motion.div className="rp-cta-actions" {...revealD(0.18)}>
          <DownloadButton className="rp-btn-primary" style={{ fontSize: '0.98rem', padding: '18px 48px' }}>
            Download Free <ArrowRight size={15} />
          </DownloadButton>
          <Link to="/pricing" className="rp-btn-ghost">
            See Pricing
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Reports;