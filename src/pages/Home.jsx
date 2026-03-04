import React from 'react';
import DownloadButton from '../components/DownloadButton';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="home-canvas">
      <style>{`
        .home-canvas { background: #0a0a0a; color: #fff; overflow-x: hidden; }

        /* --- Hero: The Statement --- */
        .hero-statement {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 5% 0 5%; /* Add top padding for desktop */
          position: relative;
        }

        @media (max-width: 900px) {
          .hero-statement {
            padding-top: 0;
          }
        }

        .hero-statement h1 {
          font-size: clamp(4rem, 15vw, 9rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.8;
          text-align: center;
          background: linear-gradient(180deg, #fff 40%, rgba(255,255,255,0.2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-sub {
          margin-top: 40px;
          max-width: 500px;
          text-align: center;
          color: #666;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        /* --- Asymmetric Display Sections --- */
        .editorial-row {
          max-width: 1400px;
          margin: 0 auto;
          padding: 150px 5%;
          display: flex;
          align-items: center;
          gap: 100px;
        }

        .editorial-row.alt { flex-direction: row-reverse; }

        .content-block { flex: 1; }
        .content-block span { 
          color: #ff9800; 
          font-weight: 800; 
          font-size: 0.7rem; 
          letter-spacing: 0.3em; 
          text-transform: uppercase;
          margin-bottom: 20px;
          display: block;
        }

        .content-block h2 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.9;
          margin-bottom: 30px;
        }

        .visual-block { 
          flex: 1.2; 
          position: relative;
        }

        .img-container {
          width: 100%;
          border-radius: 40px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #111;
          position: relative;
        }

        .img-container img {
          width: 100%;
          display: block;
          filter: grayscale(20%);
          transition: filter 0.5s ease;
        }

        .img-container:hover img { filter: grayscale(0%); }

        /* --- Floating Stats Bar --- */
        .stats-marquee {
          display: flex;
          justify-content: space-between;
          padding: 60px 5%;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .stat-unit h3 { font-size: 2.5rem; font-weight: 900; letter-spacing: -0.04em; }
        .stat-unit p { font-size: 0.75rem; color: #444; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; }

        @media (max-width: 1024px) {
          .editorial-row, .editorial-row.alt { flex-direction: column; text-align: center; gap: 60px; }
          .stats-marquee { flex-direction: column; gap: 40px; text-align: center; }
        }
      `}</style>

      {/* Hero: The Statement */}
      <section className="hero-statement">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          PURE <br/> PROFIT.
        </motion.h1>
        <motion.div className="hero-sub" {...fadeInUp} transition={{ delay: 0.2 }}>
          <p>The high-fidelity ledger for modern Nigerian trade. Track every kobo with a zero-latency interface built for growth.</p>
          <DownloadButton className="btn-primary" style={{ marginTop: '40px', padding: '20px 48px', borderRadius: '100px' }}>
            Get Started <ArrowRight size={20} style={{ marginLeft: 12 }} />
          </DownloadButton>
        </motion.div>
      </section>

      {/* Floating Metrics Bar */}
      <div className="stats-marquee">
        <div className="stat-unit">
          <h3>100%</h3>
          <p>On-Device Privacy</p>
        </div>
        <div className="stat-unit">
          <h3>Zero</h3>
          <p>Internet Required</p>
        </div>
        <div className="stat-unit">
          <h3>Offline</h3>
          <p>Sync Capability</p>
        </div>
        <div className="stat-unit">
          <h3>NGN</h3>
          <p>Native Optimization</p>
        </div>
      </div>

      {/* Editorial Row 1: Margins */}
      <section className="editorial-row">
        <motion.div className="content-block" {...fadeInUp}>
          <span>Intelligence</span>
          <h2>Automatic <br/> Net Margins.</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Forget the calculator. Koraq instantly deducts cost-of-goods and logistics from every sale to reveal your true bottom line.
          </p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle2 size={24} /> Verified Accuracy
          </div>
        </motion.div>
        
        <motion.div className="visual-block" {...fadeInUp} transition={{ delay: 0.2 }}>
          <div className="img-container">
            <img src="/images/happy.jpg" alt="Analytics View" />
          </div>
        </motion.div>
      </section>

      {/* Editorial Row 2: WhatsApp (Alt Layout) */}
      <section className="editorial-row alt">
        <motion.div className="content-block" {...fadeInUp}>
          <span>Reporting</span>
          <h2>WhatsApp <br/> Ready PDFs.</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Impress your business partners with professional audit logs. Generate clean PDF summaries and share them instantly with a single tap.
          </p>
          <Link to="/reports" style={{
            background: 'transparent',
            border: '1px solid #222',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '12px',
            fontWeight: 600,
            display: 'inline-block',
            textDecoration: 'none',
            textAlign: 'center'
          }}>
            Preview Report
          </Link>
        </motion.div>
        
        <motion.div className="visual-block" {...fadeInUp} transition={{ delay: 0.2 }}>
          <div className="img-container">
            <img src="/images/icon.jpg" alt="WhatsApp Sync" />
          </div>
        </motion.div>
      </section>

      {/* Editorial Row 3: Trust */}
      <section className="editorial-row">
        <motion.div className="content-block" {...fadeInUp}>
          <span>Security</span>
          <h2>Your Data. <br/> Local Only.</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            We don't want your data. Koraq uses bank-grade local storage to keep your financial secrets exactly where they belong, on your device.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
             <Globe size={32} color="#333" />
          </div>
        </motion.div>
        
        <motion.div className="visual-block" {...fadeInUp} transition={{ delay: 0.2 }}>
          <div className="img-container">
            <img src="/images/student.jpg" alt="Device Security" />
          </div>
        </motion.div>
      </section>

      {/* Final Call to Action */}
      <section style={{ padding: '150px 5%', textAlign: 'center' }}>
        <motion.div {...fadeInUp}>
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.8 }}>
            Upgrade to <br/> <span style={{ color: '#ff9800' }}>Koraq Pro.</span>
          </h2>
          <p style={{ color: '#444', margin: '30px auto', maxWidth: '400px', fontWeight: 700 }}>
            Join the elite circle of Nigerian merchants tracking with precision.
          </p>
          {/* Use DownloadButton for working download */}
          <DownloadButton className="btn-primary" style={{ padding: '24px 64px', fontSize: '1.2rem', borderRadius: '20px' }}>
            Download Now
          </DownloadButton>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;