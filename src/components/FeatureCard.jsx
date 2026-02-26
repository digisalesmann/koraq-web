import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, variant, accentColor, index }) => {
  // Variants for Framer Motion animations
  const cardEntry = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1, 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.div 
      variants={cardEntry}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`feature-card ${variant}`}
      style={{ '--accent-color': accentColor }}
    >
      {/* Visual Ambient Glow */}
      <div className="card-glow" />

      <div className="card-inner">
        <div className="icon-container">
          <div className="icon-bg" />
          <span className="actual-icon">{icon}</span>
        </div>

        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      {/* Subtle bottom-right accent for the 'Pro' look */}
      <div className="corner-accent" />
    </motion.div>
  );
};

export default FeatureCard;