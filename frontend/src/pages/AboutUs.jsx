import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const AboutUs = () => {
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
                    <Info size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>About Us</h1>
                <div style={textContainer}>
                    <p>
                        Welcome to the <strong>Blood Donor Hub</strong>. We are a passionate team dedicated to bridging the gap between blood donors and those in immediate need. Our platform was created out of a profound desire to make the process of blood donation and retrieval as seamless, swift, and secure as possible.
                    </p>
                    <p>
                        Every day, countless lives are at risk due to a shortage of accessible blood. Our network connects local hospitals, patients, and generous donors in real-time, ensuring that reliable help is always just a few clicks away.
                    </p>
                    <p>
                        We believe that technology can be a powerful force for good, and our mission is to harness that power to save lives in our community. Join us in making a difference, one drop at a time.
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

export default AboutUs;
