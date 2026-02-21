import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import CustomDialog from '../components/CustomDialog';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <>
      <CustomDialog />
      <div style={pageStyle}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card"
          style={cardStyle}
        >
          <div style={headerIcon}>
            <ShieldCheck size={40} color="var(--primary-red)" />
          </div>
          <h2 style={titleStyle}>
            Welcome Back
          </h2>
          <p style={subtitleStyle}>Login securely to access your dashboard</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={errorStyle}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputContainer}>
              <Mail size={18} style={inputIcon} />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputContainer}>
              <Lock size={18} style={inputIcon} />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary"
              style={submitButton}
              disabled={loading}
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </motion.button>
          </form>

          <div style={footerStyle}>
            <p style={footerText}>
              Don't have an account?{' '}
              <Link to="/register" style={linkStyle}>
                Create an account
              </Link>
            </p>
            <motion.div
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(230, 57, 70, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ email: 'admin@blooddonor.com', password: 'admin@123' })}
              style={{ ...adminHintBox, cursor: 'pointer', transition: 'background 0.3s' }}
            >
              <p style={adminHintTitle}>
                Admin Login (Click to auto-fill)
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

const pageStyle = {
  minHeight: 'calc(100vh - 70px)',
  padding: '40px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'var(--light-bg)'
};

const cardStyle = {
  maxWidth: '420px',
  width: '100%',
  padding: '40px 30px',
  boxShadow: 'var(--shadow-lg)',
  borderRadius: 'var(--border-radius-lg)',
};

const headerIcon = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  background: 'rgba(230, 57, 70, 0.1)',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  alignItems: 'center',
  margin: '0 auto 20px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '10px',
  color: 'var(--dark-color)',
  fontSize: '28px',
  fontWeight: '800'
};

const subtitleStyle = {
  textAlign: 'center',
  color: 'var(--text-muted)',
  marginBottom: '30px',
  fontSize: '15px'
};

const errorStyle = {
  background: 'rgba(217, 4, 41, 0.1)',
  color: 'var(--danger)',
  padding: '12px 16px',
  borderRadius: 'var(--border-radius-sm)',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontWeight: '600',
  fontSize: '14px',
  border: '1px solid rgba(217, 4, 41, 0.2)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const inputContainer = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const inputIcon = {
  position: 'absolute',
  left: '14px',
  color: 'var(--text-muted)'
};

const inputStyle = {
  paddingLeft: '45px',
  marginBottom: '0',
  width: '100%'
};

const submitButton = {
  width: '100%',
  marginTop: '10px',
  padding: '12px',
  fontSize: '16px',
  justifyContent: 'center'
};

const footerStyle = {
  marginTop: '30px',
  textAlign: 'center'
};

const footerText = {
  color: 'var(--text-muted)',
  marginBottom: '20px',
  fontSize: '15px'
};

const linkStyle = {
  color: 'var(--primary-red)',
  fontWeight: '700',
  textDecoration: 'none'
};

const adminHintBox = {
  background: 'var(--light-bg)',
  padding: '12px',
  borderRadius: 'var(--border-radius-sm)',
  border: '1px dashed #ccc'
};

const adminHintTitle = {
  color: 'var(--text-main)',
  fontSize: '14px',
  fontWeight: '600',
  margin: 0
};

export default Login;
