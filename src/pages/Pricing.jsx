import React, { useState } from 'react';
import DownloadButton from '../components/DownloadButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Minus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── data ──────────────────────────────────────── */
const FREE_FEATURES = [
  'Sales & expense logging',
  'Transaction history & filters',
  'Basic analytics dashboard',
  'WhatsApp receipt sharing',
  'Multi-currency support (6 FX)',
  'Digital business card',
  'Session auto-lock & privacy mode',
  'Up to 10 inventory items',
  'Escrow payments',
  'Supply marketplace access',
  'Debt tracker (up to 3 records)',
  'Credit score',
];

const PRO_FEATURES = [
  'Everything in Free',
  'Unlimited inventory entries',
  'PDF invoice generator',
  'Bluetooth thermal printer support',
  'Full AI insights (refreshes weekly)',
  'Priority inbox (Gmail scanning)',
  'Unlimited debt records',
  'Smart reminders',
  'Priority email support',
];

const COMPARISON = [
  { label: 'Sales & expense logging',          free: true,        pro: true        },
  { label: 'Transaction history',               free: true,        pro: true        },
  { label: 'Basic analytics',                   free: true,        pro: true        },
  { label: 'WhatsApp receipt sharing',          free: true,        pro: true        },
  { label: 'Multi-currency (6 FX)',             free: true,        pro: true        },
  { label: 'Digital business card',             free: true,        pro: true        },
  { label: 'Privacy mode & auto-lock',          free: true,        pro: true        },
  { label: 'Escrow payments',                   free: true,        pro: true        },
  { label: 'Supply marketplace',                free: true,        pro: true        },
  { label: 'Credit score',                      free: true,        pro: true        },
  { label: 'Inventory items',                   free: 'Up to 10',  pro: 'Unlimited' },
  { label: 'Debt tracker records',              free: 'Up to 3',   pro: 'Unlimited' },
  { label: 'AI assistant',                      free: false,       pro: true        },
  { label: 'PDF invoice generator',             free: false,       pro: true        },
  { label: 'Bluetooth thermal printing',        free: false,       pro: true        },
  { label: 'AI insights (weekly)',              free: false,       pro: true        },
  { label: 'Priority inbox (Gmail)',            free: false,       pro: true        },
  { label: 'Smart reminders',                   free: false,       pro: true        },
  { label: 'Priority email support',            free: false,       pro: true        },
];

const FAQS = [
  {
    q: 'Can I use Koraq for free forever?',
    a: 'Yes. The free plan has no time limit and no credit card required. You get core ledger features, basic analytics, WhatsApp sharing, escrow, supply marketplace, credit score, and up to 10 inventory items, enough to get started and grow.',
  },
  {
    q: 'What happens when I hit the 10 inventory item limit?',
    a: 'You can still view and manage your existing items. To add more, simply upgrade to Pro. Your data is never deleted, upgrading instantly unlocks all your entries.',
  },
  {
    q: 'Can I cancel my Pro subscription anytime?',
    a: 'Yes, completely. Cancel at any time from your profile settings. You keep Pro access until the end of your billing period, no penalties, no questions asked.',
  },
  {
    q: 'Does the annual plan auto-renew?',
    a: 'Yes, annual plans renew automatically to keep your access uninterrupted. You can turn off auto-renewal at any time from your account settings before the renewal date.',
  },
  {
    q: 'Does Koraq charge fees for escrow transactions?',
    a: 'A small service fee applies per escrow transaction to cover secure fund handling. The exact amount is shown clearly inside the app before you confirm any payment, no surprises.',
  },
  {
    q: 'What is the Seller Listing and who is it for?',
    a: 'The Seller Listing is a one-time fee that gets your business listed on the Koraq supplier marketplace, making your products and services visible to other Koraq users actively looking to restock or buy. It is best suited for wholesalers, distributors, and suppliers.',
  },
];

/* ─── small components ──────────────────────────── */
const reveal = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-70px' },
  transition:  { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};
const revealD = (d = 0) => ({ ...reveal, transition: { ...reveal.transition, delay: d } });

const Cell = ({ value }) => {
  if (value === true)  return <span className="pr-cell-yes"><Check size={15} strokeWidth={2.5} /></span>;
  if (value === false) return <span className="pr-cell-no"><Minus size={15} strokeWidth={2} /></span>;
  return <span className="pr-cell-str">{value}</span>;
};

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pr-faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="pr-faq-q">
        <span>{q}</span>
        <ChevronDown size={18} className="pr-faq-chevron" />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pr-faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  const monthlyPrice  = '2,999';
  const yearlyPrice   = '29,999';
  const yearlyMonthly = '2,499'; // 29999/12 rounded
  const saving        = '5,989'; // 35988 - 29999

  return (
    <div className="pr-root">
      <style>{`
        /* ── Root ───────────────────────────── */
        .pr-root {
          background: #080808;
          color: #fff;
          overflow-x: hidden;
          font-family: 'Satoshi', sans-serif;
        }

        /* ── Hero ───────────────────────────── */
        .pr-hero {
          min-height: 72vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 140px 6% 8vh;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          text-align: center;
        }

        .pr-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 65% 55% at 50% 0%,
            rgba(255,152,0,0.06) 0%, transparent 68%);
          pointer-events: none;
        }

        .pr-eyebrow {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 24px;
          position: relative; z-index: 1;
        }

        .pr-hero-title {
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.88;
          color: #fff;
          position: relative; z-index: 1;
          margin-bottom: 28px;
        }

        .pr-hero-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
        }

        .pr-hero-sub {
          max-width: 380px;
          color: #3e3e3e;
          font-size: 0.97rem;
          line-height: 1.65;
          font-weight: 400;
          position: relative; z-index: 1;
        }

        /* ── Toggle ─────────────────────────── */
        .pr-toggle-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 28px 6%;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .pr-toggle {
          display: flex;
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 4px;
          gap: 4px;
          position: relative;
        }

        .pr-toggle-btn {
          padding: 10px 24px;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          background: transparent;
          color: #333;
          transition: color 0.2s;
          position: relative;
          z-index: 1;
        }

        .pr-toggle-btn.active { color: #000; }

        .pr-toggle-pill {
          position: absolute;
          top: 4px;
          bottom: 4px;
          width: calc(50% - 6px);
          background: #ff9800;
          border-radius: 100px;
          transition: left 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }

        .pr-save-badge {
          margin-left: 14px;
          background: rgba(255,152,0,0.12);
          border: 1px solid rgba(255,152,0,0.25);
          color: #ff9800;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 100px;
          transition: opacity 0.3s;
        }

        /* ── Cards ──────────────────────────── */
        .pr-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 900px;
          margin: 0 auto;
          padding: 72px 6%;
          gap: 16px;
        }

        .pr-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          background: #0e0e0e;
          transition: border-color 0.3s;
        }

        .pr-card:hover { border-color: rgba(255,255,255,0.12); }

        .pr-card.featured {
          border-color: rgba(255,152,0,0.3);
          background: #0f0d09;
          position: relative;
          overflow: hidden;
        }

        .pr-card.featured::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(255,152,0,0.07), transparent 70%);
          pointer-events: none;
        }

        .pr-card-badge {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: #ff9800;
          color: #000;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 28px;
          width: fit-content;
        }

        .pr-card-name {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #333;
          margin-bottom: 18px;
        }

        .pr-card.featured .pr-card-name { color: #ff9800; }

        .pr-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 6px;
          line-height: 1;
        }

        .pr-price-currency {
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          margin-top: 6px;
        }

        .pr-price-amount {
          font-size: clamp(2.8rem, 5vw, 3.8rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #fff;
        }

        .pr-price-period {
          font-size: 0.78rem;
          color: #333;
          font-weight: 500;
          margin-left: 4px;
        }

        .pr-price-note {
          font-size: 0.75rem;
          color: #2a2a2a;
          margin-bottom: 32px;
          min-height: 20px;
          font-weight: 500;
        }

        .pr-price-note span { color: #ff9800; }

        .pr-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.055);
          margin: 0 0 28px;
        }

        .pr-feature-list {
          list-style: none;
          padding: 0; margin: 0 0 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .pr-feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.84rem;
          color: #3a3a3a;
          font-weight: 500;
          line-height: 1.4;
        }

        .pr-feature-list li svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: #ff9800;
        }

        .pr-feature-list.free li svg { color: #333; }

        /* ── Buttons ────────────────────────── */
        .pr-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #ff9800;
          color: #000;
          font-size: 0.86rem;
          font-weight: 800;
          padding: 16px 28px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          width: 100%;
        }

        .pr-btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .pr-btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: transparent;
          color: #333;
          font-size: 0.86rem;
          font-weight: 600;
          padding: 16px 28px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          width: 100%;
        }

        .pr-btn-ghost:hover { border-color: rgba(255,255,255,0.16); color: #fff; }

        /* ── Comparison table ───────────────── */
        .pr-table-section {
          padding: 0 6% 100px;
          max-width: 900px;
          margin: 0 auto;
        }

        .pr-table-label {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 32px;
          text-align: center;
        }

        .pr-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 20px;
          overflow: hidden;
        }

        .pr-table thead th {
          padding: 20px 24px;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2a2a2a;
          background: #0d0d0d;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .pr-table thead th:not(:first-child) { text-align: center; }
        .pr-table thead th.pro-col { color: #ff9800; }

        .pr-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }

        .pr-table tbody tr:last-child { border-bottom: none; }
        .pr-table tbody tr:hover { background: rgba(255,255,255,0.015); }

        .pr-table tbody td {
          padding: 14px 24px;
          font-size: 0.83rem;
          font-weight: 500;
          color: #3a3a3a;
        }

        .pr-table tbody td:not(:first-child) { text-align: center; }

        .pr-cell-yes {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ff9800;
        }

        .pr-cell-no {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #1e1e1e;
        }

        .pr-cell-str {
          font-size: 0.76rem;
          font-weight: 700;
          color: #555;
        }

        /* ── Seller section ─────────────────── */
        .pr-seller {
          border-top: 1px solid rgba(255,255,255,0.055);
          border-bottom: 1px solid rgba(255,255,255,0.055);
          padding: clamp(72px, 10vw, 130px) 6%;
          position: relative;
          overflow: hidden;
        }

        .pr-seller::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 100% 50%,
            rgba(255,152,0,0.04) 0%, transparent 65%);
          pointer-events: none;
        }

        .pr-seller-inner {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 60px;
        }

        .pr-seller-tag {
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff9800;
          margin-bottom: 22px;
        }

        .pr-seller-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.92;
          color: #fff;
          margin-bottom: 20px;
        }

        .pr-seller-body {
          font-size: 0.95rem;
          color: #383838;
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 0;
        }

        .pr-seller-price-block {
          text-align: center;
          flex-shrink: 0;
          background: #0e0e0e;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 36px 40px;
          min-width: 220px;
        }

        .pr-seller-price-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2a2a2a;
          margin-bottom: 14px;
        }

        .pr-seller-price-amount {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }

        .pr-seller-price-note {
          font-size: 0.7rem;
          color: #2a2a2a;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 28px;
          text-transform: uppercase;
        }

        /* ── FAQ ────────────────────────────── */
        .pr-faq-section {
          padding: clamp(72px, 10vw, 130px) 6%;
          max-width: 780px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .pr-faq-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.92;
          color: #fff;
          margin-bottom: 52px;
        }

        .pr-faq-item {
          border-top: 1px solid rgba(255,255,255,0.055);
          cursor: pointer;
          user-select: none;
        }

        .pr-faq-item:last-child { border-bottom: 1px solid rgba(255,255,255,0.055); }

        .pr-faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 0;
          font-size: 0.92rem;
          font-weight: 600;
          color: #555;
          transition: color 0.2s;
        }

        .pr-faq-item:hover .pr-faq-q,
        .pr-faq-item.open .pr-faq-q { color: #fff; }

        .pr-faq-chevron {
          flex-shrink: 0;
          color: #2a2a2a;
          transition: transform 0.3s ease, color 0.2s;
        }

        .pr-faq-item.open .pr-faq-chevron {
          transform: rotate(180deg);
          color: #ff9800;
        }

        .pr-faq-a {
          overflow: hidden;
        }

        .pr-faq-a p {
          padding-bottom: 22px;
          font-size: 0.88rem;
          color: #333;
          line-height: 1.72;
          font-weight: 400;
          max-width: 580px;
        }

        /* ── CTA ────────────────────────────── */
        .pr-cta {
          padding: clamp(100px, 14vw, 170px) 6%;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .pr-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%,
            rgba(255,152,0,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .pr-cta-h {
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          font-weight: 900;
          letter-spacing: -0.065em;
          line-height: 0.86;
          color: #fff;
          margin-bottom: 28px;
        }

        .pr-cta-h em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.16);
        }

        .pr-cta-p {
          color: #2a2a2a;
          font-size: 0.9rem;
          max-width: 300px;
          margin: 0 auto 44px;
          line-height: 1.65;
        }

        .pr-cta-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pr-cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff9800;
          color: #000;
          font-size: 0.92rem;
          font-weight: 800;
          padding: 18px 44px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }

        .pr-cta-btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .pr-cta-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #2a2a2a;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 18px 44px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }

        .pr-cta-btn-ghost:hover { border-color: rgba(255,255,255,0.18); color: #fff; }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 700px) {
          .pr-cards { grid-template-columns: 1fr; padding: 48px 5%; }
          .pr-seller-inner { grid-template-columns: 1fr; gap: 40px; }
          .pr-seller-price-block { width: 100%; }
          .pr-table tbody td:first-child { font-size: 0.76rem; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────── */}
      <section className="pr-hero">
        <motion.p className="pr-eyebrow"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Simple, Honest Pricing
        </motion.p>

        <motion.h1 className="pr-hero-title"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          START FREE.<br /><em>SCALE PRO.</em>
        </motion.h1>

        <motion.p className="pr-hero-sub"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          No hidden fees. No contracts. Start tracking your business for free, upgrade when you're ready to unlock everything.
        </motion.p>
      </section>

      {/* ── BILLING TOGGLE ────────────────────── */}
      <div className="pr-toggle-wrap">
        <div className="pr-toggle">
          {/* sliding pill */}
          <div className="pr-toggle-pill" style={{
            left: yearly ? 'calc(50% + 2px)' : '4px',
          }} />
          <button
            className={`pr-toggle-btn ${!yearly ? 'active' : ''}`}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`pr-toggle-btn ${yearly ? 'active' : ''}`}
            onClick={() => setYearly(true)}
          >
            Yearly
          </button>
        </div>

        <AnimatePresence>
          {yearly && (
            <motion.span
              className="pr-save-badge"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
            >
              Save ₦{saving}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── PRICING CARDS ─────────────────────── */}
      <motion.div className="pr-cards" {...reveal}>

        {/* FREE */}
        <div className="pr-card">
          <div className="pr-card-name">Free</div>

          <div className="pr-price">
            <span className="pr-price-amount">₦0</span>
          </div>
          <div className="pr-price-note">Free forever. No card needed.</div>

          <hr className="pr-divider" />

          <ul className="pr-feature-list free">
            {FREE_FEATURES.map((f, i) => (
              <li key={i}>
                <Check size={14} strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>

          <DownloadButton className="pr-btn-ghost">
            Download Free
          </DownloadButton>
        </div>

        {/* PRO */}
        <div className="pr-card featured">
          <div className="pr-card-badge">Most Popular</div>
          <div className="pr-card-name">Pro</div>

          <div className="pr-price">
            <span className="pr-price-currency">₦</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={yearly ? 'yearly' : 'monthly'}
                className="pr-price-amount"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                {yearly ? yearlyPrice : monthlyPrice}
              </motion.span>
            </AnimatePresence>
            <span className="pr-price-period">{yearly ? '/yr' : '/mo'}</span>
          </div>

          <div className="pr-price-note">
            {yearly
              ? <>≈ ₦{yearlyMonthly}/mo &nbsp;·&nbsp; <span>save ₦{saving}</span></>
              : <>Billed monthly &nbsp;·&nbsp; cancel anytime</>
            }
          </div>

          <hr className="pr-divider" />

          <ul className="pr-feature-list">
            {PRO_FEATURES.map((f, i) => (
              <li key={i}>
                <Check size={14} strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>

          <DownloadButton className="pr-btn-primary">
            Get Pro <ArrowRight size={15} />
          </DownloadButton>
        </div>
      </motion.div>

      {/* ── COMPARISON TABLE ──────────────────── */}
      <motion.div className="pr-table-section" {...reveal}>
        <div className="pr-table-label">Full Comparison</div>
        <table className="pr-table">
          <thead>
            <tr>
              <th style={{ width: '55%' }}>Feature</th>
              <th>Free</th>
              <th className="pro-col">Pro</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map(({ label, free, pro }, i) => (
              <tr key={i}>
                <td>{label}</td>
                <td><Cell value={free} /></td>
                <td><Cell value={pro} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* ── SELLER LISTING ────────────────────── */}
      <section className="pr-seller">
        <motion.div className="pr-seller-inner" {...reveal}>
          <div>
            <div className="pr-seller-tag">For Suppliers & Wholesalers</div>
            <h2 className="pr-seller-title">
              Get Your Business<br />Listed on Koraq.
            </h2>
            <p className="pr-seller-body">
              Reach thousands of traders actively looking to restock. A Koraq Seller Listing puts your products and services in front of buyers browsing the in-app supply marketplace, with your contact details, product catalogue, and location visible to the entire Koraq network.
              <br /><br />
              One payment. Permanent listing. No recurring fees.
            </p>
          </div>

          <div className="pr-seller-price-block">
            <div className="pr-seller-price-label">One-Time Fee</div>
            <div className="pr-seller-price-amount">₦15,000</div>
            <div className="pr-seller-price-note">No renewal</div>
            <DownloadButton className="pr-btn-primary">
              Get Listed <ArrowRight size={14} />
            </DownloadButton>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <section className="pr-faq-section">
        <motion.h2 className="pr-faq-title" {...reveal}>
          Questions,<br />answered.
        </motion.h2>

        {FAQS.map((item, i) => (
          <motion.div key={i} {...revealD(i * 0.06)}>
            <FAQ {...item} />
          </motion.div>
        ))}
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="pr-cta">
        <motion.h2 className="pr-cta-h" {...reveal}>
          READY TO<br /><em>START?</em>
        </motion.h2>
        <motion.p className="pr-cta-p" {...revealD(0.1)}>
          Download free today. No card. No commitment. Upgrade to Pro when your business demands it.
        </motion.p>
        <motion.div className="pr-cta-actions" {...revealD(0.18)}>
          <DownloadButton className="pr-cta-btn-primary">
            Download Free <ArrowRight size={15} />
          </DownloadButton>
          <Link to="/features" className="pr-cta-btn-ghost">
            See All Features
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Pricing;