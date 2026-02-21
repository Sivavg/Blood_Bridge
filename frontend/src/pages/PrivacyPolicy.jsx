import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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
                    <Shield size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>Privacy Policy</h1>
                <div style={textContainer}>
                    <p>
                        Your privacy is of paramount importance to us at the <strong>Blood Donor Hub</strong>.
                    </p>
                    <p>
                        When you register as a donor, the personal data you provide—such as your name, blood type, age, phone number, and location—is securely encrypted. We only display necessary details to authenticated users searching for donors in your area. We guarantee that your robust health data and personal identifiers will never be sold, distributed to third-party marketers, or made public.
                    </p>
                    <p>
                        You retain full control over your profile. At any instant, you may edit your demographic information or permanently request the deletion of your account. By utilizing our services, you consent to our secure, privacy-first data collection practices aimed solely at facilitating blood donations.
                    </p>
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
    maxWidth: '800px',
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
    marginBottom: '40px'
};

const textContainer = {
    color: 'var(--text-main)',
    fontSize: '18px',
    lineHeight: '1.8',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
};

export default PrivacyPolicy;
