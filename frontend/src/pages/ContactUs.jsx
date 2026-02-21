import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={pageStyle}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card"
                style={contentStyle}
            >
                <div style={iconWrapper}>
                    <Mail size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>Contact Us</h1>
                <div style={textContainer}>
                    <p style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Whether you are a donor facing an issue, a medical facility needing assistance syncing with our directory, or just someone looking to support our mission, the <strong>Blood Donor Hub</strong> team is here for you.
                    </p>

                    <div style={contactGrid}>
                        <div style={contactBox}>
                            <Phone size={32} color="var(--primary-red)" style={{ marginBottom: '15px' }} />
                            <h3 style={boxTitle}>24/7 Support Helpline</h3>
                            <p style={{ margin: 0 }}>+1 (800) 123-BLOOD</p>
                            <p style={{ margin: 0 }}>+1 (800) 456-DONOR</p>
                        </div>

                        <div style={contactBox}>
                            <Mail size={32} color="var(--primary-red)" style={{ marginBottom: '15px' }} />
                            <h3 style={boxTitle}>Email Inquiries</h3>
                            <p style={{ margin: 0 }}>support@blooddonor.com</p>
                            <p style={{ margin: 0 }}>admin@blooddonor.com</p>
                        </div>

                        <div style={contactBox}>
                            <MapPin size={32} color="var(--primary-red)" style={{ marginBottom: '15px' }} />
                            <h3 style={boxTitle}>Headquarters</h3>
                            <p style={{ margin: 0 }}>123 Florence Way, Suite 400</p>
                            <p style={{ margin: 0 }}>San Francisco, CA 94107</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const pageStyle = {
    minHeight: 'calc(100vh - 70px)',
    padding: '60px 20px',
    background: 'var(--light-bg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
};

const contentStyle = {
    maxWidth: '900px',
    width: '100%',
    padding: '50px',
    background: 'var(--white)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-lg)'
};

const iconWrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(230, 57, 70, 0.1)',
    margin: '0 auto 20px auto'
};

const titleStyle = {
    textAlign: 'center',
    color: 'var(--dark-color)',
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '20px'
};

const textContainer = {
    color: 'var(--text-main)',
    fontSize: '18px',
    lineHeight: '1.8',
    display: 'flex',
    flexDirection: 'column',
};

const contactGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
};

const contactBox = {
    background: 'var(--light-bg)',
    padding: '30px 20px',
    borderRadius: 'var(--border-radius-md)',
    textAlign: 'center',
    border: '1px solid #eef0f2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const boxTitle = {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--dark-color)',
    marginBottom: '10px'
};

export default ContactUs;
