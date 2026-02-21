import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../redux/slices/authSlice';
import { HeartPulse, LayoutDashboard, Users, User, LogOut, KeyRound, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={navStyle}
    >
      <div style={containerStyle}>
        <Link to={user ? (user.role === 'admin' ? '/admin' : '/donor') : '/'} style={logoStyle}>
          <HeartPulse size={28} color="var(--primary-red)" />
          <span>Blood Donor Hub</span>
        </Link>
        <div style={menuStyle}>
          {!user ? (
            <>
              <Link to="/login" style={linkStyle}>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <KeyRound size={18} />
                  Login
                </motion.div>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={registerBtn}
                >
                  <UserPlus size={18} />
                  Register
                </motion.button>
              </Link>
            </>
          ) : (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" style={linkStyle}>
                  <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <LayoutDashboard size={18} />
                    Dashboard
                  </motion.div>
                </Link>
              ) : (
                <Link to="/donor" style={linkStyle}>
                  <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={18} />
                    Donors
                  </motion.div>
                </Link>
              )}
              <div style={userInfo}>
                <User size={16} />
                <span>{user.username}</span>
              </div>
              <motion.button 
                onClick={handleLogout} 
                className="btn-danger"
                style={logoutBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

const navStyle = {
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  padding: '12px 0',
  boxShadow: 'var(--shadow-sm)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid rgba(0,0,0,0.05)'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  color: 'var(--primary-dark)',
  fontSize: '22px',
  fontWeight: '800',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  letterSpacing: '-0.5px'
};

const menuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '25px',
};

const linkStyle = {
  color: 'var(--text-main)',
  textDecoration: 'none',
  fontWeight: '600',
  transition: 'color 0.3s ease',
  fontSize: '15px'
};

const registerBtn = {
  background: 'var(--primary-red)',
  color: 'white',
  border: 'none',
  padding: '10px 24px',
  borderRadius: 'var(--border-radius-lg)',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: 'var(--shadow-sm)'
};

const userInfo = {
  color: 'var(--text-muted)',
  fontSize: '14px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 14px',
  background: 'var(--light-bg)',
  borderRadius: '20px',
};

const logoutBtn = {
  padding: '8px 20px',
  borderRadius: '20px',
  fontSize: '14px',
};

export default Navbar;

