import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
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
                    <FileText size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>Terms of Service</h1>
                <div style={textContainer}>
                    <p>
                        By accessing and utilizing the <strong>Blood Donor Hub</strong>, you strictly agree to the following legally binding terms and robust guidelines:
                    </p>
                    <ul style={listStyle}>
                        <li><strong>Accuracy of Information:</strong> You certify that the health, contact, and demographic data you supply during registration is fully accurate. False documentation can delay emergency medical response.</li>
                        <li><strong>Prohibited Use cases:</strong> The platform is designed solely to facilitate emergency blood donation links. Using the directory to scrape data, harass registered users, or monetize medical contact lists will result in an immediate, permanent ban.</li>
                        <li><strong>Disclaimers & Liability:</strong> We act purely as a connective platform between donors and those in need. We are not liable for medical malpractice, donation complications, or unfulfilled commitments by the users communicating on our application.</li>
                        <li><strong>Medical Adherence:</strong> Final verification and health screening testing must be conducted physically at the medical facility prior to donation. Our system does not replace stringent clinical testing standards.</li>
                    </ul>
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

const listStyle = {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};

export default TermsOfService;
