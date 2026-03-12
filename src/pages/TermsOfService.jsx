import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, UserCheck, AlertCircle, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="terms-viewport">
      <style>{`
        .terms-viewport {
          padding: 160px 5% 120px;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .terms-inner {
          width: 100%;
          max-width: 800px;
        }

        .terms-header {
          margin-bottom: 80px;
        }

        .terms-header h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        /* --- Quick Summary Grid --- */
        .terms-summary {
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

        /* --- Content Layout --- */
        .terms-content h2 {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          color: #eee;
          padding-top: 40px;
        }

        .terms-content p {
          color: #888;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 24px;
        }

        .terms-content strong {
          color: #fff;
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

        .download-clause {
          background: rgba(255, 255, 255, 0.03);
          border-left: 3px solid #ff9800;
          padding: 24px;
          margin: 40px 0;
          border-radius: 0 12px 12px 0;
        }

        @media (max-width: 600px) {
          .terms-summary { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="terms-inner">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.header className="terms-header" {...fadeInUp}>
          <h1>Terms of <br/> Service.</h1>
          <p style={{ color: '#444', fontWeight: 600 }}>Effective Date: February 26, 2026</p>
        </motion.header>

        {/* Rapid Clause Summary */}
        <motion.div className="terms-summary" {...fadeInUp}>
          <div className="summary-item">
            <UserCheck size={24} color="#666" />
            <h3>Personal Use</h3>
          </div>
          <div className="summary-item">
            <Scale size={24} color="#666" />
            <h3>Your Data</h3>
          </div>
          <div className="summary-item">
            <AlertCircle size={24} color="#666" />
            <h3>No Warranty</h3>
          </div>
        </motion.div>

        <motion.div className="terms-content" {...fadeInUp}>
          <section>
            <p>
              Welcome to <strong>Koraq</strong>. By accessing or using our website and mobile application, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>1. Nature of Service</h2>
            <p>
              Koraq is a profit and expense tracking tool for business owners, POS agents, and WhatsApp sellers. Our website showcases these features. <strong>All transaction logging and data management occur within the Koraq mobile application.</strong>
            </p>
            <p>
              Koraq stores your data securely in the cloud via Firebase (Google) and syncs it across your devices. By using Koraq, you agree to our data handling practices as described in our <a href="/privacypolicy" style={{color:'#ff9800'}}>Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2>2. User Responsibility</h2>
            <p>
              You are responsible for:
            </p>
            <p>
              • Maintaining the security of your device, account, and biometric locks.<br/>
              • Backing up your data using the export features provided.<br/>
              • Ensuring the accuracy of the financial records you enter.<br/>
              • Managing your subscription and payment details via Flutterwave.
            </p>
          </section>

          <section>
            <h2>3. Data Handling & Third-Party Services</h2>
            <p>
              Koraq uses third-party services to deliver its features:
            </p>
            <ul style={{color:'#ccc', marginBottom:20}}>
              <li><strong>Firebase (Google)</strong>: authentication, cloud database, push notifications</li>
              <li><strong>Flutterwave</strong>: payment processing for Premium subscriptions</li>
              <li><strong>OpenAI</strong>: AI-powered features (Priority Inbox, Koraq AI Chat)</li>
              <li><strong>Termii</strong>: SMS delivery for debt reminders</li>
              <li><strong>Google Gmail API</strong>: read-only inbox access for Priority Inbox</li>
            </ul>
            <p>
              By using Koraq, you consent to data processing by these providers as described in our Privacy Policy. We do not sell, rent, or trade your data.
            </p>
          </section>

          <section>
            <h2>4. Gmail Integration</h2>
            <p>
              If you connect your Gmail account, Koraq requests read-only access to your inbox. Only email metadata (sender, subject, preview) is processed for Priority Inbox. You can disconnect Gmail at any time, which revokes access and deletes your token. See our Privacy Policy for details.
            </p>
          </section>

          <section>
            <h2>5. Data Retention & Deletion</h2>
            <p>
              Your data is retained as long as your account is active. If you delete your account, all associated data is permanently deleted from our servers within 30 days. Contact us to request deletion.
            </p>
          </section>

          <section>
            <h2>6. Children’s Privacy</h2>
            <p>
              Koraq is not intended for children under 13. We do not knowingly collect data from children.
            </p>
          </section>

          <div className="download-clause">
            <p style={{ margin: 0, color: '#eee' }}>
              <strong>Important:</strong> Koraq is not a financial institution or a bank. We provide a digital ledger for record-keeping only. We do not process payments or handle customer funds.
            </p>
          </div>

          <section>
            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and UI design, is the property of Koraq Technologies and protected by law.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              Koraq provides its services "as is." We are not liable for any financial losses, data loss, or business interruptions resulting from the use or inability to use the application. Your use of the service is at your own risk.
            </p>
          </section>

          <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '60px', marginTop: '60px' }}>
            <h2>Need Clarity?</h2>
            <p>
              If you have any questions regarding these terms, please contact our legal desk via email.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
               <a href="mailto:koraqapp@gmail.com" style={{ color: '#ff9800', fontWeight: 700, textDecoration: 'none', fontSize: '1.2rem' }}>
                 koraqapp@gmail.com
               </a>
               <div style={{ width: '1px', height: '20px', background: '#222' }} />
               <button style={{ background: 'none', border: 'none', color: '#444', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
                 <Download size={16} /> PDF Version
               </button>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;