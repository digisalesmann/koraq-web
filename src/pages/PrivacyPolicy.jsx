import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, ServerOff, Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="policy-viewport">
      <style>{`
        .policy-viewport {
          padding: 160px 5% 120px;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .policy-inner {
          width: 100%;
          max-width: 800px;
        }

        .policy-header {
          margin-bottom: 80px;
        }

        .policy-header h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .summary-box {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 80px;
        }

        .summary-item {
          background: #0a0a0a;
          padding: 30px;
          text-align: center;
        }

        .summary-item h3 {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ff9800;
          margin-top: 15px;
        }

        .policy-section {
          margin-bottom: 60px;
        }

        .policy-section h2 {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          color: #eee;
        }

        .policy-section p {
          color: #888;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        .policy-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .policy-list li {
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #ccc;
          display: flex;
          gap: 12px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #444;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 40px;
          transition: color 0.3s;
        }

        .back-link:hover { color: #ff9800; }

        @media (max-width: 600px) {
          .summary-box { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="policy-inner">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.header className="policy-header" {...fadeInUp}>
          <h1>Privacy <br/> Policy.</h1>
          <p style={{ color: '#444', fontWeight: 600 }}>Last Updated: February 2026</p>
        </motion.header>

        {/* Executive Summary */}
        <motion.div className="summary-box" {...fadeInUp}>
          <div className="summary-item">
            <Shield size={24} color="#666" />
            <h3>Encrypted Sync</h3>
          </div>
          <div className="summary-item">
            <EyeOff size={24} color="#666" />
            <h3>No Ads Ever</h3>
          </div>
          <div className="summary-item">
            <Lock size={24} color="#666" />
            <h3>You Own Your Data</h3>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="policy-content" {...fadeInUp}>
          <section className="policy-section">
            <h2>Our Core Philosophy</h2>
            <p>
              At Koraq, your business data belongs to you. We collect only what is necessary to deliver the app's features, we never sell your data to third parties, and we never use your financial records for advertising. This policy explains exactly what we collect, why, and how it is protected.
            </p>
          </section>

          <section className="policy-section">
            <h2>Data We Collect</h2>
            <p>
              Koraq stores your data securely in the cloud via Firebase (Google) so you can access it across devices. The following information is collected and stored under your account:
            </p>
            <ul className="policy-list">
              <li>• Account information: email address and display name used to create your Koraq account</li>
              <li>• Transaction records: sales amounts, expense amounts, categories, dates, notes, and currency</li>
              <li>• Debt records: customer names, amounts owed, due dates, and optional contact details (email/phone) you provide for reminder delivery</li>
              <li>• Inventory items: product names, quantities, and prices you enter</li>
              <li>• Business settings: your business name, selected currency, and notification preferences</li>
              <li>• Subscription status: your premium plan type and expiry date, managed via Flutterwave</li>
              <li>• Device token: your FCM push notification token, used only to deliver reminders and alerts to your device</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Gmail Integration (Priority Inbox)</h2>
            <p>
              If you choose to connect your Gmail account to the Priority Inbox feature, Koraq requests read-only access to your inbox. We want to be fully transparent about how this works:
            </p>
            <ul className="policy-list">
              <li>• We read only the sender name, email address, subject line, and a short message preview (snippet), never the full email body</li>
              <li>• This metadata is processed by our AI to generate a priority score (0–100) for each email</li>
              <li>• Only the score, subject, sender name, and preview are stored in your Koraq account, raw email data is not persisted</li>
              <li>• Your Gmail OAuth refresh token is stored securely on our servers and is never shared with or exposed to any third party</li>
              <li>• You can disconnect your Gmail account at any time from the Priority Inbox settings, which immediately revokes our access and deletes your token</li>
            </ul>
            <p>
              Koraq's use of Gmail data complies with Google's API Services User Data Policy, including the Limited Use requirements.
            </p>
          </section>

          <section className="policy-section">
            <h2>Third-Party Services</h2>
            <p>
              Koraq uses the following third-party services to power its features. Each service operates under its own privacy policy:
            </p>
            <ul className="policy-list">
              <li>• <strong style={{color:'#ccc'}}>Firebase (Google):</strong> authentication, cloud database, push notifications, and cloud functions</li>
              <li>• <strong style={{color:'#ccc'}}>Flutterwave:</strong> payment processing for Premium subscriptions. We do not store your card details</li>
              <li>• <strong style={{color:'#ccc'}}>OpenAI:</strong> AI-powered features (Priority Inbox, Koraq Chat). Only anonymized email metadata and chat messages are sent</li>
              <li>• <strong style={{color:'#ccc'}}>Termii:</strong> SMS delivery for debt payment reminders, using only the phone number you provide</li>
              <li>• <strong style={{color:'#ccc'}}>Google Gmail API:</strong> read-only inbox access for Priority Inbox, as described above</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Data Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal data. We do not use your financial records for advertising. Data is shared with third-party services only to the extent necessary to deliver the specific feature you are using, as described above.
            </p>
          </section>

          <section className="policy-section">
            <h2>Data Retention & Deletion</h2>
            <p>
              Your data is retained for as long as your account is active. If you delete your account, all associated data, transactions, debts, inventory, email connections, and profile information, is permanently deleted from our servers within 30 days. To request account deletion, contact us at the email below.
            </p>
          </section>

          <section className="policy-section">
            <h2>Security</h2>
            <p>
              All data is transmitted over HTTPS and stored in Firebase with industry-standard encryption at rest. Sensitive tokens (such as your Gmail refresh token) are stored server-side only and are never returned to client devices. We recommend enabling biometric lock (Fingerprint or Face ID) on your device for an additional layer of protection.
            </p>
          </section>

          <section className="policy-section">
            <h2>Children's Privacy</h2>
            <p>
              Koraq is intended for use by business owners and is not directed at children under the age of 13. We do not knowingly collect data from children.
            </p>
          </section>

          <section className="policy-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '60px' }}>
            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy, how your data is handled, or wish to request data deletion, contact us:
            </p>
            <a
              href="mailto:koraqapp@gmail.com"
              style={{ color: '#ff9800', fontWeight: 700, textDecoration: 'none', fontSize: '1.2rem' }}
            >
              koraqapp@gmail.com
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;