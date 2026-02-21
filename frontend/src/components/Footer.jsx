import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Droplets, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Mission', path: '/mission' },
      { name: 'How It Works', path: '/how-it-works' },
      { name: 'Success Stories', path: '/success-stories' },
    ],
    quickLinks: [
      { name: 'Find Donors', path: '/donor' },
     
    ],
    bloodGroups: [
      'A+ • A-',
      'B+ • B-',
      'AB+ • AB-',
      'O+ • O-',
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, name: 'Facebook', url: '#' },
    { icon: <Instagram size={20} />, name: 'Instagram', url: '#' },
    { icon: <Twitter size={20} />, name: 'Twitter', url: '#' },
    { icon: <Youtube size={20} />, name: 'YouTube', url: '#' },
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={footerStyle}
    >
      <div style={containerStyle}>
        {/* Top Section */}
        <div style={topSectionStyle}>
          {/* Brand Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={brandSectionStyle}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              style={{ marginBottom: '15px', color: 'var(--primary-red)' }}
            >
              <Droplets size={48} />
            </motion.div>
            <h3 style={brandTitleStyle}>Blood Donor Hub</h3>
            <p style={brandDescStyle}>
              Connecting donors with those in need. Every drop counts, every donor matters.
            </p>
            <div style={socialContainerStyle}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(); }}
                  whileHover={{ scale: 1.2, color: 'var(--primary-red)' }}
                  whileTap={{ scale: 0.9 }}
                  style={socialIconStyle}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* About Links */}
          <motion.div style={linkColumnStyle}>
            <h4 style={columnTitleStyle}>About</h4>
            {footerLinks.about.map((link, index) => (
              <Link key={index} to={link.path} onClick={handleLinkClick} style={footerLinkStyle}>
                <motion.div
                  whileHover={{ x: 5, color: 'var(--primary-red)' }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Quick Links */}
          <motion.div style={linkColumnStyle}>
            <h4 style={columnTitleStyle}>Quick Links</h4>
            {footerLinks.quickLinks.map((link, index) => (
              <Link key={index} to={link.path} onClick={handleLinkClick} style={footerLinkStyle}>
                <motion.div
                  whileHover={{ x: 5, color: 'var(--primary-red)' }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Blood Groups */}
          <motion.div style={linkColumnStyle}>
            <h4 style={columnTitleStyle}>Blood Groups</h4>
            {footerLinks.bloodGroups.map((group, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                style={bloodGroupStyle}
              >
                {group}
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ ...bloodGroupStyle, marginTop: '15px', background: 'rgba(230, 57, 70, 0.1)', color: 'var(--primary-red)', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}
            >
              <Phone size={16} /> Emergency: 24/7
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={dividerStyle}
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={bottomSectionStyle}
        >
          <p style={copyrightStyle}>
            © {currentYear} Blood Donor Hub. All rights reserved. Built with precision for humanity.
          </p>
          <div style={bottomLinksStyle}>
            <Link to="/privacy" onClick={handleLinkClick} style={bottomLinkStyle}>
              <motion.div whileHover={{ color: '#fff' }}>Privacy Policy</motion.div>
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <Link to="/terms" onClick={handleLinkClick} style={bottomLinkStyle}>
              <motion.div whileHover={{ color: '#fff' }}>Terms of Service</motion.div>
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <Link to="/contact" onClick={handleLinkClick} style={bottomLinkStyle}>
              <motion.div whileHover={{ color: '#fff' }}>Contact Us</motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

const footerStyle = {
  background: 'var(--dark-color)',
  color: 'rgba(255,255,255,0.8)',
  padding: '80px 20px 30px',
  marginTop: '80px',
  position: 'relative',
  overflow: 'hidden',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
};

const topSectionStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '50px',
  marginBottom: '50px',
};

const brandSectionStyle = {
  textAlign: 'left',
};

const brandTitleStyle = {
  fontSize: '24px',
  fontWeight: '800',
  color: '#fff',
  marginBottom: '15px',
};

const brandDescStyle = {
  fontSize: '15px',
  lineHeight: '1.6',
  marginBottom: '25px',
  color: 'rgba(255,255,255,0.6)',
  maxWidth: '280px'
};

const socialContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '15px',
};

const socialIconStyle = {
  color: 'rgba(255,255,255,0.6)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  padding: '8px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const linkColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const columnTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#fff',
  marginBottom: '15px',
};

const footerLinkStyle = {
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  fontSize: '15px',
  transition: 'all 0.3s ease',
  fontWeight: '500'
};

const bloodGroupStyle = {
  color: 'rgba(255,255,255,0.6)',
  fontSize: '15px',
  padding: '8px 0',
  borderRadius: '5px',
  fontWeight: '600'
};

const dividerStyle = {
  height: '1px',
  background: 'rgba(255,255,255,0.1)',
  margin: '30px 0',
};

const bottomSectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px',
};

const copyrightStyle = {
  fontSize: '14px',
  color: 'rgba(255,255,255,0.5)',
  margin: 0,
};

const bottomLinksStyle = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const bottomLinkStyle = {
  fontSize: '14px',
  color: 'rgba(255,255,255,0.5)',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

export default Footer;
