import React from 'react';
import DownloadButton from '../components/DownloadButton';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── tiny helpers ─────────────────────────────── */
const Tag   = ({ children }) => <div className="ft-tag">{children}</div>;
const Title = ({ children, style }) => <h2 className="ft-ed-h" style={style}>{children}</h2>;
const Body  = ({ children }) => <p className="ft-ed-p">{children}</p>;

const reveal = {
  initial:     { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-80px' },
  transition:  { duration: 1, ease: [0.16, 1, 0.3, 1] },
};
const revealD = (d = 0) => ({ ...reveal, transition: { ...reveal.transition, delay: d } });

/* Screenshot in a landscape tablet frame */
const LandShot = ({ src, alt, rotate = 0, placeholder = false }) => (
  <div
    className="ft-ss-land"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {placeholder ? (
      <div className="ft-placeholder">
        <span>Screenshot coming soon</span>
      </div>
    ) : (
      <img src={src} alt={alt} />
    )}
  </div>
);

/* Screenshot in a portrait phone frame */
const TallShot = ({ src, alt, rotate = 0, placeholder = false }) => (
  <div
    className="ft-ss-tall"
    style={{ transform: `rotate(${rotate}deg)`, width: 'min(260px, 54%)' }}
  >
    {placeholder ? (
      <div className="ft-placeholder" style={{ height: 420 }}>
        <span>Screenshot coming soon</span>
      </div>
    ) : (
      <img src={src} alt={alt} />
    )}
  </div>
);

/* Full editorial row — copy left, image right (or flipped) */
const EdRow = ({ flip = false, visual, tag, title, body, link, linkLabel, linkTo, children }) => (
  <section className={`ft-ed ${flip ? 'flip' : ''}`}>
    <motion.div className="ft-ed-copy" {...reveal}>
      <Tag>{tag}</Tag>
      <Title>{title}</Title>
      <Body>{body}</Body>
      {link && (
        <Link to={linkTo || '/reports'} className="ft-ed-link">
          {linkLabel} <ArrowUpRight size={13} />
        </Link>
      )}
      {children}
    </motion.div>
    <motion.div className="ft-ed-img-panel" {...revealD(0.14)}>
      {visual}
    </motion.div>
  </section>
);

/* Full-bleed statement row (no image, just large type + aside copy) */
const BleedRow = ({ tag, title, body, cta = false }) => (
  <motion.section className="ft-bleed" {...reveal}>
    <div className="ft-bleed-tag">{tag}</div>
    <h2 className="ft-bleed-h" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="ft-bleed-aside">
      <p className="ft-bleed-p">{body}</p>
      {cta && (
        <DownloadButton className="ft-btn-primary" style={{ fontSize: '0.8rem' }}>
          Get Started <ArrowRight size={13} />
        </DownloadButton>
      )}
    </div>
  </motion.section>
);

/* ─── Feature bullet list ──────────────────────── */
const Bullets = ({ items }) => (
  <ul className="ft-bullets">
    {items.map((item, i) => (
      <li key={i}>
        <span className="ft-bullet-dot" />
        {item}
      </li>
    ))}
  </ul>
);

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
const Features = () => (
  <div className="ft-root">
    <style>{`
      /* ── Root ───────────────────────────────── */
      .ft-root {
        background: #080808;
        color: #fff;
        overflow-x: hidden;
        font-family: 'Satoshi', sans-serif;
      }

      /* ── Hero ───────────────────────────────── */
      .ft-hero {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 140px 6% 10vh;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid rgba(255,255,255,0.055);
      }

      .ft-hero::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 70% 55% at 50% 0%,
          rgba(255,152,0,0.06) 0%, transparent 68%);
        pointer-events: none;
      }

      .ft-hero-eyebrow {
        font-size: 0.67rem;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #ff9800;
        margin-bottom: 28px;
        text-align: center;
        position: relative; z-index: 1;
      }

      .ft-hero-title {
        font-size: clamp(3.4rem, 9vw, 7rem);
        font-weight: 900;
        letter-spacing: -0.055em;
        line-height: 0.88;
        text-align: center;
        color: #fff;
        position: relative; z-index: 1;
        margin-bottom: 32px;
      }

      .ft-hero-title em {
        font-style: normal;
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(255,255,255,0.22);
      }

      .ft-hero-sub {
        max-width: 400px;
        text-align: center;
        color: #404040;
        font-size: 0.97rem;
        line-height: 1.65;
        font-weight: 400;
        position: relative; z-index: 1;
        margin-bottom: 44px;
      }

      /* ── Feature index strip ─────────────────── */
      .ft-index {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid rgba(255,255,255,0.055);
        padding: 0 6%;
        gap: 0;
      }

      .ft-index::-webkit-scrollbar { display: none; }

      .ft-index-item {
        flex-shrink: 0;
        padding: 20px 28px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #2a2a2a;
        border-right: 1px solid rgba(255,255,255,0.055);
        white-space: nowrap;
        cursor: default;
        transition: color 0.2s;
      }

      .ft-index-item:last-child { border-right: none; }
      .ft-index-item:hover { color: #ff9800; }

      /* ── Numbers row ─────────────────────────── */
      .ft-numbers {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-bottom: 1px solid rgba(255,255,255,0.055);
      }

      .ft-num-cell {
        padding: 48px 5%;
        border-right: 1px solid rgba(255,255,255,0.055);
      }

      .ft-num-cell:last-child { border-right: none; }

      .ft-num-val {
        font-size: clamp(1.8rem, 3vw, 2.6rem);
        font-weight: 900;
        letter-spacing: -0.05em;
        color: #fff;
        line-height: 1;
        margin-bottom: 9px;
      }

      .ft-num-val span { color: #ff9800; }

      .ft-num-lbl {
        font-size: 0.67rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #2a2a2a;
      }

      /* ── Shared editorial ────────────────────── */
      .ft-ed {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 82vh;
        border-bottom: 1px solid rgba(255,255,255,0.055);
      }

      .ft-ed.flip { direction: rtl; }
      .ft-ed.flip > * { direction: ltr; }

      .ft-ed-copy {
        padding: clamp(52px, 7vw, 106px) clamp(32px, 5.5%, 92px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid rgba(255,255,255,0.055);
      }

      .ft-ed.flip .ft-ed-copy {
        border-right: none;
        border-left: 1px solid rgba(255,255,255,0.055);
      }

      .ft-tag {
        font-size: 0.64rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #ff9800;
        margin-bottom: 22px;
      }

      .ft-ed-h {
        font-size: clamp(2rem, 3.8vw, 3.3rem);
        font-weight: 900;
        letter-spacing: -0.05em;
        line-height: 0.92;
        margin-bottom: 22px;
        color: #fff;
      }

      .ft-ed-p {
        font-size: 0.95rem;
        color: #3a3a3a;
        line-height: 1.72;
        max-width: 340px;
        font-weight: 400;
        margin-bottom: 36px;
      }

      .ft-ed-link {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #fff;
        text-decoration: none;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 3px;
        width: fit-content;
        transition: color 0.2s, border-color 0.2s;
      }

      .ft-ed-link:hover { color: #ff9800; border-color: #ff9800; }

      /* Image panel */
      .ft-ed-img-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0c0c0c;
        overflow: hidden;
        position: relative;
        padding: 56px 36px;
      }

      .ft-ed-img-panel::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 55% 45% at 50% 50%,
          rgba(255,152,0,0.04) 0%, transparent 70%);
        pointer-events: none;
      }

      /* Frames */
      .ft-ss-land {
        border-radius: 20px;
        overflow: hidden;
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.08),
          0 40px 80px rgba(0,0,0,0.75),
          0 80px 160px rgba(0,0,0,0.4);
        max-width: 88%;
        transition: transform 0.6s ease;
      }

      .ft-ss-land:hover { transform: scale(1.014) rotate(0deg) !important; }
      .ft-ss-land img { display: block; width: 100%; height: auto; }

      .ft-ss-tall {
        border-radius: 28px;
        overflow: hidden;
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.08),
          0 40px 80px rgba(0,0,0,0.75),
          0 80px 160px rgba(0,0,0,0.4);
        max-height: 65vh;
        transition: transform 0.6s ease;
      }

      .ft-ss-tall:hover { transform: scale(1.014) rotate(0deg) !important; }
      .ft-ss-tall img { display: block; width: 100%; height: 100%; object-fit: cover; }

      /* Placeholder */
      .ft-placeholder {
        width: 100%;
        min-height: 340px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #111;
        border: 1px dashed rgba(255,255,255,0.08);
        border-radius: 20px;
      }

      .ft-placeholder span {
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #252525;
      }

      /* ── Bullets ─────────────────────────────── */
      .ft-bullets {
        list-style: none;
        padding: 0; margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .ft-bullets li {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.85rem;
        color: #3a3a3a;
        font-weight: 500;
        line-height: 1.4;
      }

      .ft-bullet-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #ff9800;
        flex-shrink: 0;
      }

      /* ── Full-bleed statement ────────────────── */
      .ft-bleed {
        padding: clamp(80px, 11vw, 150px) 6%;
        border-bottom: 1px solid rgba(255,255,255,0.055);
        position: relative;
      }

      .ft-bleed-tag {
        font-size: 0.64rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #ff9800;
        margin-bottom: 30px;
      }

      .ft-bleed-h {
        font-size: clamp(2.6rem, 6vw, 5.5rem);
        font-weight: 900;
        letter-spacing: -0.055em;
        line-height: 0.88;
        color: #fff;
        max-width: 780px;
        margin-bottom: 0;
      }

      .ft-bleed-h em { font-style: normal; color: #ff9800; }

      .ft-bleed-aside {
        position: absolute;
        right: 6%;
        bottom: clamp(80px, 11vw, 150px);
        max-width: 300px;
        text-align: right;
      }

      .ft-bleed-p {
        font-size: 0.9rem;
        color: #303030;
        line-height: 1.7;
        margin-bottom: 22px;
      }

      /* ── Card section (Digital Card) ─────────── */
      .ft-card-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 82vh;
        border-bottom: 1px solid rgba(255,255,255,0.055);
      }

      .ft-card-visual {
        background: #0c0c0c;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 56px 36px;
        border-right: 1px solid rgba(255,255,255,0.055);
        position: relative;
        overflow: hidden;
      }

      .ft-card-visual::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 55% 45% at 50% 50%,
          rgba(255,152,0,0.04) 0%, transparent 70%);
        pointer-events: none;
      }

      .ft-card-img {
        width: min(380px, 86%);
        border-radius: 22px;
        overflow: hidden;
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.08),
          0 40px 80px rgba(0,0,0,0.75);
        transition: transform 0.6s ease;
      }

      .ft-card-img:hover { transform: scale(1.014); }
      .ft-card-img img { display: block; width: 100%; height: auto; }

      /* ── Two-col text row ────────────────────── */
      .ft-two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-bottom: 1px solid rgba(255,255,255,0.055);
      }

      .ft-two-col-cell {
        padding: clamp(52px, 7vw, 106px) clamp(32px, 5.5%, 92px);
        border-right: 1px solid rgba(255,255,255,0.055);
      }

      .ft-two-col-cell:last-child { border-right: none; }

      /* ── CTA ─────────────────────────────────── */
      .ft-cta {
        padding: clamp(100px, 14vw, 180px) 6%;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .ft-cta::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 80% 65% at 50% 100%,
          rgba(255,152,0,0.05) 0%, transparent 65%);
        pointer-events: none;
      }

      .ft-cta-h {
        font-size: clamp(3rem, 9vw, 7.5rem);
        font-weight: 900;
        letter-spacing: -0.065em;
        line-height: 0.86;
        color: #fff;
        margin-bottom: 30px;
      }

      .ft-cta-h em {
        font-style: normal;
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(255,255,255,0.18);
      }

      .ft-cta-p {
        color: #2a2a2a;
        font-size: 0.9rem;
        max-width: 320px;
        margin: 0 auto 44px;
        line-height: 1.65;
      }

      /* ── Shared buttons ──────────────────────── */
      .ft-btn-primary {
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

      .ft-btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

      .ft-btn-ghost {
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
        text-decoration: none;
      }

      .ft-btn-ghost:hover { border-color: rgba(255,255,255,0.18); color: #fff; }

      /* ── Responsive ──────────────────────────── */
      @media (max-width: 860px) {
        .ft-ed,
        .ft-card-section,
        .ft-two-col { grid-template-columns: 1fr; min-height: auto; }

        .ft-ed.flip { direction: ltr; }

        .ft-ed-copy {
          border-right: none !important;
          border-left: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .ft-card-visual {
          border-right: none;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          min-height: 320px;
        }

        .ft-ed-img-panel { min-height: 320px; padding: 40px 20px; }

        .ft-numbers { grid-template-columns: repeat(2, 1fr); }
        .ft-num-cell:nth-child(2) { border-right: none; }
        .ft-num-cell:nth-child(3),
        .ft-num-cell:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.055); }

        .ft-bleed-aside {
          position: static;
          text-align: left;
          max-width: none;
          margin-top: 36px;
        }

        .ft-two-col-cell {
          border-right: none;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .ft-two-col-cell:last-child { border-bottom: none; }
      }
    `}</style>

    {/* ── HERO ──────────────────────────────────── */}
    <section className="ft-hero">
      <motion.p
        className="ft-hero-eyebrow"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Built for Nigerian Traders
      </motion.p>

      <motion.h1
        className="ft-hero-title"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        EVERYTHING<br />YOUR BUSINESS<br /><em>NEEDS.</em>
      </motion.h1>

      <motion.p
        className="ft-hero-sub"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        One app. Every tool a trader, shop owner, or freelancer needs to track profit, manage stock, and grow with confidence.
      </motion.p>

      <motion.div
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <DownloadButton className="ft-btn-primary">
          Download Free <ArrowRight size={15} />
        </DownloadButton>
        <Link to="/reports" className="ft-btn-ghost">
          Preview Reports
        </Link>
      </motion.div>
    </section>

    {/* ── FEATURE INDEX STRIP ───────────────────── */}
    <div className="ft-index">
      {[
        'Ledger','Analytics','Invoices','Inventory',
        'Debt Tracker','AI Insights','Escrow',
        'Digital Card','Thermal Print','Credit Score',
      ].map((label, i) => (
        <div className="ft-index-item" key={i}>{label}</div>
      ))}
    </div>

    {/* ── NUMBERS ───────────────────────────────── */}
    <div className="ft-numbers">
      {[
        { val: '10',  sup: '+',    lbl: 'Built-in Features'   },
        { val: '6',   sup: ' FX',  lbl: 'Currencies'          },
        { val: '100', sup: '%',    lbl: 'Encrypted'           },
        { val: '300', sup: '–850', lbl: 'AI Credit Score'      },
      ].map(({ val, sup, lbl }, i) => (
        <motion.div className="ft-num-cell" key={i} {...revealD(i * 0.07)}>
          <div className="ft-num-val">{val}<span>{sup}</span></div>
          <div className="ft-num-lbl">{lbl}</div>
        </motion.div>
      ))}
    </div>

    {/* ══════════════════════════════════════════════
        1. LEDGER
    ══════════════════════════════════════════════ */}
    <EdRow
      tag="01 — Ledger"
      title={<>Record Every<br />Sale. Instantly.</>}
      body="Log sales and expenses in seconds. Assign categories, attach notes, toggle privacy mode to hide amounts when needed, and auto-reset daily, weekly, or monthly."
      link linkLabel="Add a Transaction" linkTo="/add-transaction"
      visual={
        <TallShot src="/images/1.jpg" alt="Koraq transaction entry screen" rotate={-1.5} />
      }
    >
      <Bullets items={[
        'Sales & expense logging',
        'Category tagging & notes',
        'Privacy mode, hide amounts',
        'Auto-reset by day, week, or month',
        'Export to PDF for your accountant',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        2. ANALYTICS
    ══════════════════════════════════════════════ */}
    <EdRow
      flip
      tag="02 — Analytics"
      title={<>See Your Real<br />Profit. Anytime.</>}
      body="Koraq deducts cost-of-goods and logistics from every sale automatically, giving you net margin, cash flow charts, and revenue vs expense breakdowns at a glance."
      link linkLabel="Open Dashboard" linkTo="/dashboard"
      visual={
        <LandShot src="/images/2.jpg" alt="Koraq business analytics dashboard" rotate={1.5} />
      }
    >
      <Bullets items={[
        'Automatic net margin calculation',
        'Cash flow chart (1W · 1M · 3M · ALL)',
        'Revenue vs expenses bar',
        'Recent activity log',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        3. INVOICES & REPORTS
    ══════════════════════════════════════════════ */}
    <EdRow
      tag="03 — Invoices & Reports"
      title={<>Professional<br />Invoices.<br />One Tap.</>}
      body="Generate branded PDF invoices in seconds. Fill in your business details once, add line items, and share directly on WhatsApp or via email, all from inside the app."
      link linkLabel="Preview a Report" linkTo="/reports"
      visual={
        <LandShot src="/images/3.jpg" alt="Koraq invoice generator" rotate={-1.5} />
      }
    >
      <Bullets items={[
        'Branded PDF invoice generation',
        'WhatsApp share with one tap',
        'Bluetooth thermal printer support (Pro)',
        'Audit-ready PDF reports',
        'Client name, address & payment details',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        4. INVENTORY & RESTOCK
    ══════════════════════════════════════════════ */}
    <EdRow
      flip
      tag="04 — Inventory & Restock"
      title={<>Stock Levels.<br />Always<br />Known.</>}
      body="Track every product in real time. Get push notifications before you run out, adjust quantities instantly, and connect with suppliers directly from the app to restock fast."
      visual={
        <LandShot src="/images/inventory.jpeg" alt="Koraq stock manager" rotate={1} />
      }
    >
      <Bullets items={[
        'Real-time stock level tracking',
        'Low-stock push notifications',
        'Adjust quantities in one tap',
        'Browse & contact suppliers in-app',
        'Unlimited inventory entries (Pro)',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        5. DEBT TRACKER
    ══════════════════════════════════════════════ */}
    <EdRow
      tag="05 — Debt Tracker"
      title={<>Know Who<br />Owes You.<br />Always.</>}
      body="Record customer debts, set due dates, and send reminders directly from Koraq. Mark debts as settled when paid, keeping your receivables clean and your cash flow accurate."
      visual={
        <LandShot src="/images/debt.jpeg" alt="Koraq debt tracker — ledger view" rotate={-1} />
      }
    >
      <Bullets items={[
        'Record customer debts with due dates',
        'Send payment reminders',
        'Mark as settled when paid',
        'Total receivables at a glance',
        'Full debt history log',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        6. AI INSIGHTS — full-bleed then image
    ══════════════════════════════════════════════ */}
    <BleedRow
      tag="06 — AI Insights"
      title="Smarter Decisions.<br /><em>Every Week.</em>"
      body="Koraq's AI analyses your last 30 transactions and refreshes every 7 days, surfacing revenue opportunities, flagging expense risks, and telling you exactly where to focus."
    />

    <EdRow
      flip
      tag=""
      title={<>Ask Any<br />Business<br />Question.</>}
      body="Not sure why your profit dropped this week? Just ask. The AI assistant explains your numbers, navigates features, and gives you instant, actionable answers, no accountant needed."
      visual={
        <LandShot src="/images/ai.jpeg" alt="Koraq AI business insights" rotate={1} />
      }
    >
      <Bullets items={[
        'Weekly AI report, refreshes automatically',
        'Revenue, expense & growth signals',
        'Ask free-form business questions',
        'Powered by your own transaction data',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        7. ESCROW
    ══════════════════════════════════════════════ */}
    <BleedRow
      tag="07 — Escrow Payments"
      title="Send Money.<br /><em>Risk-Free.</em>"
      body="Koraq holds funds securely until both parties confirm the deal is done, then releases to the payee instantly. Built for trades, freelance work, and marketplace transactions where trust is everything."
      cta
    />

    <EdRow
      tag=""
      title={<>Funds Held.<br />Until Done.</>}
      body="Koraq holds the payment until both parties confirm the deal, then releases instantly. Every escrow transaction shows status, amount, and both parties in a clear timeline."
      visual={
        <LandShot src="/images/4.jpg" alt="Koraq escrow transaction screen" rotate={1} />
      }
    >
      <Bullets items={[
        'Funds held until both parties confirm',
        'Instant release on deal completion',
        'Full transaction status timeline',
        'Works for trades, freelance & marketplaces',
        'Available on Free plan',
      ]} />
    </EdRow>

    {/* ══════════════════════════════════════════════
        8. DIGITAL BUSINESS CARD
    ══════════════════════════════════════════════ */}
    <section className="ft-card-section">
      <motion.div className="ft-card-visual" {...reveal}>
        <div className="ft-card-img">
          <img src="/images/card.jpg" alt="Koraq digital business card" />
        </div>
      </motion.div>

      <motion.div className="ft-ed-copy" {...revealD(0.14)}
        style={{ borderRight: 'none', borderLeft: '1px solid rgba(255,255,255,0.055)' }}
      >
        <Tag>08 — Digital Business Card</Tag>
        <Title>Your Business.<br />One Scan Away.</Title>
        <Body>
          Share your business identity instantly with a Koraq digital card. It includes your business name, contact info, and a scannable QR code that exports as a vCard, ready to share on WhatsApp or save to any phone.
        </Body>
        <Bullets items={[
          'Business name, phone & email',
          'Location details',
          'Scannable QR code, exports as vCard',
          'Share via WhatsApp instantly',
          'Saves directly to any contact list',
        ]} />
      </motion.div>
    </section>

    {/* ══════════════════════════════════════════════
        9. THERMAL PRINTER  +  10. CREDIT SCORE
        — side by side text, placeholder visuals
    ══════════════════════════════════════════════ */}
    <section className="ft-two-col">
      <motion.div className="ft-two-col-cell" {...reveal}>
        <Tag>09 — Thermal Printer</Tag>
        <Title style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
          Print Receipts.<br />Bluetooth Fast.
        </Title>
        <Body>
          Connect any Bluetooth thermal printer and print professional receipts on the spot, no cables, no delays. Perfect for market stalls, POS shops, and delivery handoffs. Available on Pro.
        </Body>
        <Bullets items={[
          'Pairs with any Bluetooth thermal printer',
          'One-tap receipt printing',
          'No Wi-Fi or cables required',
          'Works at market stalls & POS shops',
          'Pro feature',
        ]} />

        <LandShot src="/images/6.jpg" alt="Koraq Bluetooth thermal printing" rotate={-1} />
      </motion.div>

      <motion.div className="ft-two-col-cell" {...revealD(0.14)}>
        <Tag>10 — Credit Score</Tag>
        <Title style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
          Know Your<br />Business Score.
        </Title>
        <Body>
          Koraq tracks your business behaviour and calculates a credit score from 300-850 based on transaction consistency, income trends, and inventory activity. Use the Insights tab to understand what's driving it.
        </Body>
        <Bullets items={[
          'Score range: 300-850',
          'Based on your real transaction data',
          'Income consistency & inventory signals',
          'Insights tab shows what to improve',
          'Refreshes with every 30 transactions',
        ]} />

        <LandShot src="/images/5.jpg" alt="Koraq credit score insights" rotate={1} />
      </motion.div>
    </section>

    {/* ── CTA ───────────────────────────────────── */}
    <section className="ft-cta">
      <motion.h2 className="ft-cta-h" {...reveal}>
        ALL OF THIS.<br /><em>ONE APP.</em>
      </motion.h2>
      <motion.p className="ft-cta-p" {...revealD(0.1)}>
        Download Koraq free and start tracking today. Upgrade to Pro when your business is ready to scale.
      </motion.p>
      <motion.div
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        {...revealD(0.18)}
      >
        <DownloadButton className="ft-btn-primary" style={{ fontSize: '0.98rem', padding: '18px 48px' }}>
          Download Koraq Free
        </DownloadButton>
        <Link to="/" className="ft-btn-ghost">
          Back to Home
        </Link>
      </motion.div>
    </section>
  </div>
);

export default Features;