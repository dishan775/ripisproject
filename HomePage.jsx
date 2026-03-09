import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';
import ThemeToggle from './ThemeToggle';
import '../styles/home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const learningCards = [
    {
      id: 1,
      title: 'Practice Professional English',
      icon: '✦',
      buttonText: 'Resume',
      buttonClass: 'primary',
    },
    {
      id: 2,
      title: 'Learn Programming',
      icon: '⟡',
      buttonText: 'Continue',
      buttonClass: 'secondary',
    },
    {
      id: 3,
      title: 'Core Computer Science',
      icon: '◈',
      buttonText: 'Explore',
      buttonClass: 'tertiary',
    },
    {
      id: 4,
      title: 'Enhance Reading Ability',
      icon: '▣',
      buttonText: 'Start',
      buttonClass: 'quaternary',
    },
  ];

  const recommendations = [
    {
      title: 'Mastering Python Data Structures',
      description: 'Deepen your understanding of lists, dictionaries, and sets with hands-on exercises.',
    },
    {
      title: 'Effective Communication Strategies',
      description: 'Build confidence in professional conversations and presentations.',
    },
  ];

  return (
    <div className="home-page-new">
      {/* ─── Header ─── */}
      <header className="home-header">
        <div className="home-container">
          <nav className="home-nav">
            <div className="home-logo">
              <div className="home-logo-icon">R</div>
              Ripis
            </div>

            <ul className="home-nav-links">
              <li><a href="#community">Community</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}>Portfolio</a></li>
              <li><a href="#ranking">Ranking</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>Dashboard</a></li>
              <li className="nav-item">
                <a href="#notifications">Notifications</a>
                <span className="notification-badge">New</span>
              </li>
            </ul>

            <div className="nav-header-right">
              <ThemeToggle />
              <div
                className="user-profile"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">{user?.avatar || 'U'}</div>
                <div>
                  <div className="user-welcome">Welcome,</div>
                  <div className="user-name">{user?.name || 'User'}</div>
                </div>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="user-dropdown"
                    >
                      <div className="dropdown-item" onClick={() => navigate('/profile')}>
                        👤 Profile
                      </div>
                      <div className="dropdown-item" onClick={() => navigate('/portfolio')}>
                        📁 Portfolio
                      </div>
                      <div className="dropdown-item" onClick={() => navigate('/dashboard')}>
                        📊 Dashboard
                      </div>
                      <div className="dropdown-divider" />
                      <div
                        className="dropdown-item logout"
                        onClick={() => {
                          useAuthStore.getState().logout();
                          navigate('/login');
                        }}
                      >
                        ↗ Logout
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="home-hero">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hero-content"
          >
            <h1>Start your learning journey here.</h1>
            <p>Build valuable skills, track your progress, and grow every day.</p>

            <div className="progress-section">
              <div className="progress-label">
                <span>Weekly Goal</span>
                <span className="progress-value">3 / 5 modules</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className="progress-fill"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Learning Cards ─── */}
      <section className="home-container">
        <div className="learning-grid">
          {learningCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
              className="learning-card"
              onClick={() => navigate('/dashboard')}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <button className={`card-button ${card.buttonClass}`}>
                {card.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Recommendations ─── */}
      <section className="home-container recommendations">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="section-title"
        >
          Recommended for you
        </motion.h2>
        <div className="recommendation-cards">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.08 }}
              className="recommendation-card"
            >
              <h3>{rec.title}</h3>
              <p>{rec.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Focus Session ─── */}
      <section className="home-container focus-session">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="focus-card"
        >
          <div className="focus-content">
            <h2>Start a focus session</h2>
            <p>Block distractions and concentrate on what matters most.</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="focus-button"
              onClick={() => navigate('/dashboard')}
            >
              Begin Session
            </motion.button>
          </div>
          <div className="focus-illustration">◎</div>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="home-footer">
        <div className="home-container">
          <div className="footer-content">
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
            <div className="footer-bottom">
              <span className="footer-copyright">© 2026 Ripis. All rights reserved.</span>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">𝕏</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
