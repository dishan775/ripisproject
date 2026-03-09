import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/intro.css';

const faqs = [
  {
    q: 'What is RIPIS and who is it for?',
    a: 'RIPIS is an AI-powered interview preparation platform built for software engineers, CS students, and developers who want to sharpen their technical interview skills. Whether you are a beginner or a senior engineer, RIPIS adapts to your level.',
  },
  {
    q: 'How does real-time feedback work?',
    a: 'RIPIS captures on-screen content and listens to spoken questions during your practice session. It instantly analyses the context and delivers structured hints, reasoning steps, and explanations — all without interrupting your flow.',
  },
  {
    q: 'Does RIPIS give away answers directly?',
    a: 'No. RIPIS is built around progressive hinting. It guides you toward the solution by asking the right questions, pointing out edge cases, and explaining trade-offs — so you develop genuine problem-solving skills, not memorised answers.',
  },
  {
    q: 'What types of questions does RIPIS support?',
    a: 'RIPIS automatically detects and handles Data Structures & Algorithms (DSA) problems, system design questions, operating systems, DBMS, networking, and other core CS theory topics.',
  },
  {
    q: 'Is RIPIS ethical to use for practice?',
    a: 'Yes. RIPIS is designed exclusively for practice and learning environments. All AI assistance is fully transparent, and the system is intentionally built to teach, not to cheat.',
  },
  {
    q: 'Can I control how much help I receive?',
    a: 'Absolutely. You can choose your hint level — from a subtle nudge in the right direction to a detailed step-by-step explanation. You are always in control of how much assistance the AI provides.',
  },
];

const IntroPage = () => {
  const navigate = useNavigate();
  const [navVisible, setNavVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [theme, setTheme] = useState('light');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '.section-header, .feature-card, .step-item, .benefit-card, .cta-content, .faq-item'
    );

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach((el) => {
        if (el.getBoundingClientRect().top < windowHeight - 100) {
          el.classList.add('reveal');
        }
      });
    };

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setNavVisible(!(currentScroll > lastScroll && currentScroll > 100));
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', handleScroll);
    revealOnScroll();

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScroll]);

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="intro-page">
      {/* ── Navigation ── */}
      <nav className={`intro-navbar ${!navVisible ? 'hidden' : ''}`}>
        <div className="nav-logo">
          <div className="nav-logo-icon">R</div>
          <span>RIPIS</span>
        </div>

        <div className="nav-links">
          {['hero', 'features', 'how', 'benefits', 'faq'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
            >
              {id === 'how' ? 'How It Works' : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              /* Moon icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              /* Sun icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>
          <button className="nav-btn" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">✦ Introducing RIPIS</div>
          <h1 className="hero-title">Master Technical<br />Interviews with AI</h1>
          <p className="hero-subtitle">
            Real-time, intelligent feedback that transforms how you prepare, think, and excel in technical interviews.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/login')}>Start Your Journey</button>
            <button className="btn-secondary" onClick={() => scrollToSection('features')}>Learn More</button>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div className="section-badge">Core Features</div>
          <h2 className="section-title">What Makes RIPIS Different</h2>
          <p className="section-description">
            Experience the next generation of interview preparation with AI-powered insights that adapt to your learning style.
          </p>
        </div>
        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Real-Time Feedback', desc: 'Get instant, contextual guidance during practice sessions. No more waiting until after to know where you went wrong.' },
            { icon: '🧠', title: 'Intelligent Reasoning', desc: 'Focus on understanding problem-solving approaches, not memorizing answers. Develop genuine reasoning skills.' },
            { icon: '🎯', title: 'Context-Aware Detection', desc: 'Automatically identifies DSA problems, system design questions, and theory topics with intelligent parsing.' },
            { icon: '🎓', title: 'Progressive Hinting', desc: 'Choose your level of assistance. From subtle nudges to detailed explanations, control how much help you need.' },
            { icon: '⚙️', title: 'Low-Latency Performance', desc: 'Experience seamless, non-disruptive guidance. Feedback arrives instantly without breaking your flow.' },
            { icon: '✦', title: 'Ethical & Transparent', desc: 'Built for learning environments with complete integrity. All AI assistance is visible and designed for practice.' },
          ].map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="how-section">
        <div className="section-header">
          <div className="section-badge">Simple Process</div>
          <h2 className="section-title">How RIPIS Works</h2>
          <p className="section-description">
            Three powerful modules working together to supercharge your interview preparation.
          </p>
        </div>
        <div className="steps-container">
          {[
            { n: '01', title: 'Context Understanding', desc: 'Our system captures and interprets on-screen content and spoken questions in real-time. It detects technical topics like arrays, trees, OS, DBMS, and handles even partial or ambiguous prompts with intelligent parsing.' },
            { n: '02', title: 'Reasoning & Analysis', desc: 'The AI engine generates structured explanations emphasising problem-solving approaches, key concepts, trade-offs, and common mistakes. Get progressive hints instead of immediate answers.' },
            { n: '03', title: 'Visual Feedback', desc: 'Receive guidance through a clean, non-intrusive desktop interface. See reasoning steps, pseudocode, diagrams, and performance summaries — all designed to maximise learning clarity.' },
          ].map(({ n, title, desc }) => (
            <div className="step-item" key={n}>
              <div className="step-number">{n}</div>
              <div className="step-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="benefits" className="benefits-section">
        <div className="section-header">
          <div className="section-badge">Key Benefits</div>
          <h2 className="section-title">Why Choose RIPIS</h2>
          <p className="section-description">Transform your interview preparation with benefits that matter.</p>
        </div>
        <div className="benefits-grid">
          {[
            { icon: '📈', title: 'Improve Faster', desc: 'Immediate feedback accelerates learning by 3× compared to post-session reviews.' },
            { icon: '💡', title: 'Build Real Skills', desc: 'Focus on reasoning and explanation abilities, not just memorised solutions.' },
            { icon: '🎯', title: 'Realistic Practice', desc: 'Simulate actual interview pressure with real-time assistance and ambiguous scenarios.' },
            { icon: '🛡️', title: 'Ethical Foundation', desc: 'Practice with integrity using a system designed for learning, not cheating.' },
            { icon: '🔧', title: 'Customisable Hints', desc: 'Control the depth of assistance to match your current skill level and learning goals.' },
            { icon: '📊', title: 'Track Progress', desc: 'Comprehensive performance summaries help you identify strengths and areas for growth.' },
          ].map(({ icon, title, desc }) => (
            <div className="benefit-card" key={title}>
              <div className="benefit-icon">{icon}</div>
              <div className="benefit-text">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="faq-section">
        <div className="section-header">
          <div className="section-badge">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Everything you need to know about RIPIS before you get started.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? 'open' : ''}`}
              onClick={() => toggleFaq(i)}
            >
              <div className="faq-question">
                <span>{item.q}</span>
                <div className="faq-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Interview Prep?</h2>
          <p>
            Join thousands of developers mastering technical interviews with RIPIS. Start your journey to interview success today.
          </p>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <div className="nav-logo-icon">R</div>
            <span>RIPIS</span>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} RIPIS. Built for learners, by builders.</p>
          <div className="footer-links">
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('how'); }}>How It Works</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;
