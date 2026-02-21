import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const OurMission = () => {
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
                    <Target size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>Our Mission</h1>
                <div style={textContainer}>
                    <p>
                        At <strong>Blood Donor Hub</strong>, our central mission is to eliminate blood scarcity and ensure that no life is lost due to a lack of available blood. We visualize a world where an emergency blood requirement is met instantly and securely through the collective power of a committed donor community.
                    </p>
                    <p>
                        We are dedicated to:
                    </p>
                    <ul style={listStyle}>
                        <li><strong>Speed & Efficiency:</strong> Streamlining the process so patients receive help rapidly.</li>
                        <li><strong>Safety & Trust:</strong> Verifying donor profiles and maintaining high data privacy standards.</li>
                        <li><strong>Community Building:</strong> Fostering a culture of regular blood donation and awareness.</li>
                    </ul>
                    <p>
                        Our core belief is simple: human life is paramount, and by uniting compassionate individuals with technology, we can create a resilient safety net for society.
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

const listStyle = {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

export default OurMission;
