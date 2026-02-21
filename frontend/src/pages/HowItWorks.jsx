import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const HowItWorks = () => {
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
                    <Zap size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>How It Works</h1>
                <div style={textContainer}>
                    <p>
                        The <strong>Blood Donor Hub</strong> process is designed to be frictionless, fast, and remarkably intuitive for both donors and recipients:
                    </p>
                    <ol style={listStyle}>
                        <li>
                            <strong>Register or Login:</strong> Potential donors create an account, filling in their blood type, age, location, and previous donation timelines.
                        </li>
                        <li>
                            <strong>Join the Directory:</strong> Once registered, individuals are added to our secure, local blood-type directory. Their contact details can be searched by hospitals and verified patients.
                        </li>
                        <li>
                            <strong>Search the Network:</strong> If a person urgently requires blood, they can filter by the necessary group. They will instantly see a list of matched donors in their locale.
                        </li>
                        <li>
                            <strong>Connect:</strong> Reach out to the available donors directly using the contact methods provided. Because our system is localized, response times are incredibly fast.
                        </li>
                        <li>
                            <strong>Save Lives:</strong> Meet at an accredited medical facility to complete the life-changing donation.
                        </li>
                    </ol>
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

export default HowItWorks;
