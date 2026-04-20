import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  BookOpenCheck,
  MessageSquareHeart,
  ShieldCheck,
  Zap,
  ArrowRightCircle,
  HelpCircle,
  Users,
  Smartphone,
  CloudOff,
  WifiOff
} from 'lucide-react';

const HelpCentre = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const categories = [
    { 
      title: "Getting Started", 
      desc: "Learn how to record your first sale and set up stock costs." 
    },
    { 
      title: "Data & Privacy", 
      desc: "How Koraq keeps your financial records strictly on-device." 
    },
    { 
      title: "WhatsApp Sharing", 
      desc: "Generating and sending professional PDF reports to partners." 
    }
  ];

  const faqs = [
  {
    question: "Is my data synced across devices?",
    answer: "Yes. Koraq syncs your transactions, debts, and settings across all your devices in real time using Firebase. Simply sign in with the same account on any device to access your data."
  },
  {
    question: "What happens to my data if I uninstall the app?",
    answer: "Your data is safely stored in the cloud and tied to your account. Reinstalling the app and signing back in will restore all your transactions, debts, inventory, and settings."
  },
  {
    question: "Does Koraq require a constant internet connection?",
    answer: "Koraq requires an internet connection for most features, including logging transactions, syncing data, and accessing AI tools. Make sure you have a stable connection for the best experience."
  },
  {
    question: "What is included in the Premium plan?",
    answer: "Premium unlocks Invoice Generator, Priority Inbox (AI email scoring), Koraq AI Chat, advanced financial reports, PDF and image export, inventory management with stock value tracking, and debt reminders via email and SMS."
  },
  {
    question: "How do I generate and share an invoice?",
    answer: "Go to the Invoice Generator from the main menu, fill in your client details and line items, set your tax rate if applicable, then tap Generate & Share. The invoice is created as a professional PDF you can share instantly via WhatsApp, email, or any other app."
  },
  {
    question: "How does Priority Inbox work?",
    answer: "Priority Inbox connects to your Gmail account with read-only access and uses AI to score every email 0–100 based on business importance. High-scoring emails, like payment confirmations, client messages, and invoices, are surfaced at the top so you never miss what matters."
  },
  {
    question: "Is my Gmail data safe?",
    answer: "Yes. Koraq only reads email metadata (sender, subject, and a short preview), never the full email body. Your Gmail access token is stored securely on our servers and is never exposed to any third party. You can disconnect your Gmail account at any time from the Priority Inbox settings."
  },
  {
    question: "How do debt reminders work?",
    answer: "When you add a debt with a due date and your customer's contact details, Koraq automatically sends a reminder email and/or SMS 24 hours before the due date. You can also send a reminder manually at any time from the debt detail screen."
  },
  {
    question: "What currencies does Koraq support?",
    answer: "Koraq supports multiple currencies including NGN, USD, GBP, EUR, GHS, KES, and more. You can set your display currency in Settings and record transactions in any supported currency, Koraq handles conversion for your reports automatically."
  },
  {
    question: "How do I cancel or manage my subscription?",
    answer: "Your subscription is managed through Flutterwave. Monthly plans renew every 31 days and yearly plans every 365 days. To cancel, simply do not renew when your current period ends. Your premium access remains active until the expiry date."
  },
  {
    question: "Can I export my financial data?",
    answer: "Yes. From the Reports screen you can download a full PDF financial statement for any month, or export your entire transaction history as a PDF. You can also share a visual report card as an image directly to WhatsApp or any messaging app."
  },
  {
    question: "What is the Credit Score feature?",
    answer: "Koraq calculates a business credit score between 300 and 850 based on your transaction history, revenue consistency, expense ratio, and debt settlement rate. It gives you a quick pulse on the financial health of your business."
  },
];

  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="help-viewport">
      <style>{`
        .help-viewport {
          padding: 160px 5% 120px;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .help-inner {
          width: 100%;
          max-width: 1100px;
        }

        /* --- Editorial Header --- */
        .help-hero {
          text-align: center;
          margin-bottom: 100px;
        }

        .help-hero h1 {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.85;
          margin-bottom: 2rem;
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .help-search-bar {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px 20px 20px 55px;
          border-radius: 20px;
          color: #fff;
          font-size: 1.1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .help-search-bar:focus {
          border-color: #ff9800;
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #444;
        }

        /* --- Blueprint Category Grid --- */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 100px;
        }

        .category-cell {
          background: #0a0a0a;
          padding: 50px 40px;
          transition: background 0.3s ease;
        }

        .category-cell:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .cat-icon {
          color: #ff9800;
          margin-bottom: 30px;
        }

        .category-cell h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.03em;
        }

        .category-cell p {
          color: #555;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* --- FAQ List --- */
        .faq-section {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          padding: 30px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .faq-item h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #eee;
        }

        /* --- Support CTA --- */
        .support-footer {
          margin-top: 120px;
          text-align: center;
          padding: 80px 40px;
          background: linear-gradient(180deg, rgba(255, 152, 0, 0.05) 0%, transparent 100%);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        @media (max-width: 850px) {
          .category-grid { grid-template-columns: 1fr; }
          .help-hero h1 { font-size: 3.5rem; }
        }
      `}</style>

      <div className="help-inner">
        {/* Header & Search */}
        <motion.header className="help-hero" {...fadeInUp}>
          <span style={{ color: '#ff9800', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Resources</span>
          <h1>How can we <br/> help you?</h1>
          <div className="search-container">
            <Search className="search-icon" size={24} />
            <input 
              type="text" 
              className="help-search-bar" 
              placeholder="Search for guides or questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search help center"
            />
          </div>
        </motion.header>

        {/* Categories */}
        <div className="category-grid">
          {categories.map((cat, i) => (
            <motion.div 
              key={i} 
              className="category-cell"
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="cat-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Common Questions */}
        <div className="faq-section">
          <motion.h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '40px', letterSpacing: '-0.04em' }} {...fadeInUp}>
            Common Questions
          </motion.h2>
          {faqs.filter(faq =>
            faq.question.toLowerCase().includes(search.toLowerCase()) ||
            faq.answer.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <div style={{ color: '#888', textAlign: 'center', margin: '40px 0' }}>No results found.</div>
          )}
          {faqs.filter(faq =>
            faq.question.toLowerCase().includes(search.toLowerCase()) ||
            faq.answer.toLowerCase().includes(search.toLowerCase())
          ).map((faq, i) => (
            <motion.div 
              key={i} 
              className="faq-item"
              {...fadeInUp}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {faq.icon}
                <h4 style={{ flex: 1 }}>{faq.question}</h4>
                <ArrowRightCircle size={22} color={openFaq === i ? '#10b981' : '#222'} style={{ transform: openFaq === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
              {openFaq === i && (
                <div style={{ color: '#bbb', marginTop: 16, fontSize: '1rem', lineHeight: 1.7 }}>{faq.answer}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <motion.div className="support-footer" {...fadeInUp}>
          <HelpCircle size={40} color="#ff9800" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Still need support?</h2>
          <p style={{ color: '#666', marginBottom: '40px', maxWidth: '450px', marginInline: 'auto' }}>
            Our team is available on WhatsApp to help you grow your business and master your numbers.
          </p>
          <button className="btn-primary" style={{ padding: '16px 40px' }}>
            Chat on WhatsApp
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCentre;