import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Styling
import './App.css';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import History from './pages/History';
import Reports from './pages/Reports';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Global Components
import Header from './components/Header';
import Footer from './components/Footer';

// A wrapper to handle page transitions
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/add-transaction" element={<PageWrapper><AddTransaction /></PageWrapper>} />
        <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
        <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
        <Route path="/helpcenter" element={<PageWrapper><HelpCenter /></PageWrapper>} />
        <Route path="/privacypolicy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
        <Route path="/termsofservice" element={<PageWrapper><TermsOfService /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-main-container">
        {/* The Header is global, appearing on every page */}
        <Header />
        
        <main className="content-area">
          <AnimatedRoutes />
        </main>

        {/* The Footer is global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;