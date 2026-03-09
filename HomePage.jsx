import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import '../styles/home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const learningCards = [
    {
      id: 1,
      title: 'Practice Professional English',
      icon: '💼',
      gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
      buttonClass: 'primary',
      buttonText: 'Resume'
    },
    {
      id: 2,
      title: 'Learn Programming',
      icon: '💻',
      gradient: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
      buttonClass: 'secondary',
      buttonText: 'Continue'
    },
    {
      id: 3,
      title: 'Learn Core Computer Science Concepts',
      icon: '🖥️',
      gradient: 'linear-gradient(135deg, #FFE985 0%, #FA742B 100%)',
      buttonClass: 'tertiary',
      buttonText: 'Explore'
    },
    {
      id: 4,
      title: 'Enhance Your Reading Ability',
      icon: '📖',
      gradient: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)',
      buttonClass: 'quaternary',
      buttonText: 'Start Read'
    }
  ];

  const recommendations = [
    'Mastering Python Data Structures',
    'Effective Communication Strategies'
  ];

  useEffect(() => {
    // Parallax effect for background decorations
    const handleMouseMove = (e) => {
      const decorations = document.querySelectorAll('.bg-decoration');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        decoration.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-page-new">
      {/* Background Decorations */}
      <div className="bg-decoration"></div>
      <div className="bg-decoration"></div>

      {/* Header */}
      <header className="home-header">
        <div className="home-container">
          <nav className="home-nav">
            <div className="home-logo">
              <div className="home-logo-icon">R</div>
              Ripis
            </div>
            <ul className="home-nav-links">
              <li><a href="#community">Learner's Community</a></li>
              <li><a href="#" onClick={() => navigate('/portfolio')}>Portfolio</a></li>
              <li><a href="#ranking">Ranking</a></li>
              <li><a href="#" onClick={() => navigate('/dashboard')}>Dashboard</a></li>
              <li className="nav-item">
                <a href="#notifications">Notifications</a>
                <span className="notification-badge">New</span>
              </li>
            </ul>
            <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="user-avatar">{user?.avatar || 'U'}</div>
              <div>
                <div className="user-welcome">Welcome,</div>
                <div className="user-name">{user?.name || 'User'}</div>
              </div>
              
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
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
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item logout" onClick={() => {
                    useAuthStore.getState().logout();
                    navigate('/login');
                  }}>
                    🚪 Logout
                  </div>
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Start Your Learning Journey Here.</h1>
            <p>Learn valuable skills and create better tomorrow.</p>
            
            <div className="progress-section">
              <div className="progress-label">
                <span>Weekly Goal</span>
                <span className="progress-value">3/5 Modules Completed</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="progress-fill"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Cards */}
      <section className="home-container">
        <div className="learning-grid">
          {learningCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="learning-card"
            >
              <div className="card-icon" style={{ background: card.gradient }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`card-button ${card.buttonClass}`}
                onClick={() => navigate('/dashboard')}
              >
                {card.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="home-container recommendations">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="section-title"
        >
          Recommended For You
        </motion.h2>
        <div className="recommendation-cards">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="recommendation-card"
            >
              <h3>{rec}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Focus Session */}
      <section className="home-container focus-session">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="focus-card"
        >
          <div className="focus-content">
            <h2>Start The Focus Session!</h2>
            <p>Concentrate and achieve your goals.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="focus-button"
              onClick={() => navigate('/dashboard')}
            >
              Begin Session
            </motion.button>
          </div>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="focus-illustration"
          >
            📚
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-container">
          <div className="footer-content">
            <ul className="footer-links">
              <li><a href="#about">About Ripis</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
            <div className="social-links">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">▶</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
