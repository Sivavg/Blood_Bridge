import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const CustomDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showDialog, dialogMessage, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => {
        dispatch(closeDialog());
        // Navigate after dialog closes
        if (user) {
          if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showDialog, dispatch, navigate, user]);

  return (
    <AnimatePresence mode="wait">
      {showDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlayStyle}
          onClick={() => dispatch(closeDialog())}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            style={dialogStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              style={iconWrapper}
            >
              <CheckCircle2 size={60} color="var(--success)" />
            </motion.div>

            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={titleStyle}
            >
              Success!
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={messageStyle}
            >
              {dialogMessage}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(4px)',
};

const dialogStyle = {
  background: 'var(--white)',
  padding: '40px',
  borderRadius: 'var(--border-radius-lg)',
  textAlign: 'center',
  boxShadow: 'var(--shadow-lg)',
  minWidth: '340px',
  maxWidth: '90%',
  borderTop: '5px solid var(--success)',
};

const iconWrapper = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  background: 'rgba(42, 157, 143, 0.1)',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  margin: '0 auto 20px auto',
  alignItems: 'center'
};

const titleStyle = {
  color: 'var(--dark-color)',
  marginBottom: '10px',
  fontSize: '26px',
  fontWeight: '800'
};

const messageStyle = {
  color: 'var(--text-muted)',
  fontSize: '16px',
  margin: 0,
  fontWeight: '500'
};

export default CustomDialog;
