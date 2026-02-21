import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Search, Hospital, Droplet, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

const LandingPage = () => {
  return (
    <div style={pageStyle}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={heroSection}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={iconContainer}
        >
          <div style={pulseCircle}></div>
          <Droplet size={80} color="var(--primary-red)" fill="var(--primary-red)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={titleStyle}
        >
          Welcome to <span style={highlightText}>Blood Donor Hub</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={subtitleStyle}
        >
          Save Lives by Donating Blood. Every Drop Counts. Join our network of life-savers today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={buttonContainer}
        >
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-lg)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={primaryButton}
            >
              <Heart size={20} />
              Register as Donor
            </motion.button>
          </Link>

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-lg)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
              style={secondaryButton}
            >
              Login securely <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={featuresContainer}
        >
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="card" style={featureCard}>
            <div style={cardIconWrapper}><Droplet size={32} color="var(--primary-red)" /></div>
            <h3 style={cardTitle}>Donate Blood</h3>
            <p style={cardDescription}>Register as a donor and help save lives in your local community.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="card" style={featureCard}>
            <div style={cardIconWrapper}><Search size={32} color="var(--primary-red)" /></div>
            <h3 style={cardTitle}>Find Donors</h3>
            <p style={cardDescription}>Easily search for compatible blood donors in your area when you need them.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="card" style={featureCard}>
            <div style={cardIconWrapper}><Hospital size={32} color="var(--primary-red)" /></div>
            <h3 style={cardTitle}>Save Lives</h3>
            <p style={cardDescription}>Connect directly with those in need and make a profound difference.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={statsContainer}
        >
          <div style={statBox}>
            <Activity size={32} color="var(--primary-red)" style={{ marginBottom: '10px' }} />
            <p style={{ color: 'var(--text-main)', fontSize: '16px', fontWeight: '600' }}>One donation can save up to 3 lives</p>
          </div>
          <div style={statBox}>
            <ShieldCheck size={32} color="var(--primary-red)" style={{ marginBottom: '10px' }} />
            <p style={{ color: 'var(--text-main)', fontSize: '16px', fontWeight: '600' }}>100% Secure & Private</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const pageStyle = {
  minHeight: 'calc(100vh - 70px)',
  background: 'linear-gradient(180deg, var(--light-bg) 0%, rgba(230, 57, 70, 0.05) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
  position: 'relative',
  overflow: 'hidden'
};

const heroSection = {
  textAlign: 'center',
  maxWidth: '1200px',
  width: '100%',
  zIndex: 10
};

const iconContainer = {
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '30px',
  width: '160px',
  height: '160px'
};

const pulseCircle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'rgba(230, 57, 70, 0.1)',
  borderRadius: '50%',
  zIndex: -1,
  animation: 'pulse 2s infinite ease-in-out'
};

const titleStyle = {
  fontSize: '56px',
  fontWeight: '800',
  color: 'var(--dark-color)',
  marginBottom: '20px',
  letterSpacing: '-1px',
  lineHeight: '1.1'
};

const highlightText = {
  color: 'var(--primary-red)'
};

const subtitleStyle = {
  fontSize: '20px',
  color: 'var(--text-muted)',
  marginBottom: '50px',
  maxWidth: '600px',
  margin: '0 auto 50px auto',
  lineHeight: '1.6'
};

const buttonContainer = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  marginBottom: '80px',
  flexWrap: 'wrap',
};

const primaryButton = {
  padding: '16px 36px',
  fontSize: '18px',
  borderRadius: '50px',
};

const secondaryButton = {
  padding: '16px 36px',
  fontSize: '18px',
  borderRadius: '50px',
};

const featuresContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '30px',
  marginBottom: '60px',
};

const featureCard = {
  padding: '40px 30px',
  textAlign: 'center',
  borderTop: '4px solid var(--primary-red)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const cardIconWrapper = {
  background: 'rgba(230, 57, 70, 0.1)',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px'
};

const cardTitle = {
  color: 'var(--dark-color)',
  marginBottom: '15px',
  fontSize: '22px'
};

const cardDescription = {
  color: 'var(--text-muted)',
  fontSize: '15px',
  lineHeight: '1.6'
};

const statsContainer = {
  display: 'flex',
  gap: '40px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '30px',
  background: 'var(--white)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-sm)',
  maxWidth: '800px',
  margin: '0 auto'
};

const statBox = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '200px'
};

// Simple global animation injection for pulse effect
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 0.4; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
}

export default LandingPage;
