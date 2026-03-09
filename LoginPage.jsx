import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';
import '../styles/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      // Accept any email/password - directly login
      const displayName = formData.name || formData.email.split('@')[0];
      login(formData.email, displayName);
      
      // Show success message
      showMessage("Welcome to RIPIS!");
      
      // Navigate to home
      setTimeout(() => navigate('/home'), 500);
      setIsLoading(false);
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAuthMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setFormData({ email: '', password: '', name: '' });
  };

  const showMessage = (text) => {
    const msg = document.getElementById('statusMessage');
    if (msg) {
      msg.innerText = text;
      msg.classList.add('visible');
      setTimeout(() => msg.classList.remove('visible'), 3000);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-background"></div>
      <div className="login-grid-overlay"></div>

      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="login-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="back-btn"
        onClick={() => navigate('/')}
      >
        <span>←</span> Back to Home
      </motion.button>

      <div id="statusMessage" className="status-message">Action completed!</div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="login-container"
      >
        <div className="login-header">
          <motion.h2
            key={isSignUpMode ? 'signup' : 'login'}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="login-title"
          >
            {isSignUpMode ? 'Create Account' : 'Welcome Back'}
          </motion.h2>
          <motion.p
            key={isSignUpMode ? 'signup-sub' : 'login-sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="login-subtitle"
          >
            {isSignUpMode ? 'Join RIPIS and start mastering interviews' : 'Sign in to continue your practice journey'}
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <AnimatePresence>
            {isSignUpMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="form-group"
              >
                <label htmlFor="name">FULL NAME</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
          >
            {isLoading ? 'Processing...' : (isSignUpMode ? 'Create Account' : 'Sign In')}
          </motion.button>
        </form>

        <div className="signup-link">
          <span>{isSignUpMode ? 'Already have an account?' : "Don't have an account?"}</span>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleAuthMode(); }}>
            {isSignUpMode ? 'Sign In' : 'Sign Up'}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
