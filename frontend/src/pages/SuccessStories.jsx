import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const SuccessStories = () => {
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
                    <Heart size={40} color="var(--primary-red)" />
                </div>
                <h1 style={titleStyle}>Success Stories</h1>
                <div style={textContainer}>
                    <p>
                        The true impact of our network can be measured by the powerful connections made across our community and the lives successfully saved. Here are a few notable outcomes:
                    </p>
                    <div style={storyWrapper}>
                        <blockquote style={quoteStyle}>
                            "My father required an urgent B- transfusion late at night. The hospital's bank was depleted. Using the Blood Donor Hub, I found three local donors within ten minutes. They arrived inside the hour, and my dad is recovering well today. Thank you!" <br /> - <strong>Rahul S.</strong>
                        </blockquote>
                        <blockquote style={quoteStyle}>
                            "As a regular donor, I love how straightforward the hub is. I got a notification that a patient nearby needed O+ blood. It felt incredible to be matched and directly help someone in my own city without jumping through bureaucratic hoops." <br /> - <strong>Sarah M.</strong>
                        </blockquote>
                    </div>
                    <p style={{ marginTop: '20px' }}>
                        When you join the <strong>Blood Donor Hub</strong>, you aren't just registering data; you are stepping into a profound, life-altering role for someone in need.
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
};

const storyWrapper = {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginTop: '20px'
};

const quoteStyle = {
    margin: 0,
    padding: '20px 30px',
    background: 'var(--light-bg)',
    borderLeft: '5px solid var(--primary-red)',
    borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
    fontStyle: 'italic',
    color: 'var(--text-main)'
};

export default SuccessStories;
