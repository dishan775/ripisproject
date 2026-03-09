import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, Upload, FileText, Image as ImageIcon, Code, File } from 'lucide-react';
import useAuthStore from '../store/authStore';
import '../styles/portfolio.css';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Portfolio state
  const [portfolioData, setPortfolioData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    qualification: user?.qualification || '',
    about: user?.about || '',
    skills: user?.skills || [],
    projects: user?.projects || [],
    experiences: user?.experiences || [],
  });

  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  // Form states
  const [aboutText, setAboutText] = useState(portfolioData.about);
  const [newSkill, setNewSkill] = useState('');
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    files: []
  });

  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const [basicInfoForm, setBasicInfoForm] = useState({
    name: portfolioData.name,
    title: portfolioData.title,
    qualification: portfolioData.qualification
  });

  const [editingBasicInfo, setEditingBasicInfo] = useState(false);

  // Handle About Me
  const handleSaveAbout = () => {
    const updated = { ...portfolioData, about: aboutText };
    setPortfolioData(updated);
    updateUser({ about: aboutText });
    setShowAboutModal(false);
  };

  // Handle Skills
  const handleAddSkill = () => {
    if (newSkill.trim() && !portfolioData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...portfolioData.skills, newSkill.trim()];
      setPortfolioData({ ...portfolioData, skills: updatedSkills });
      updateUser({ skills: updatedSkills });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = portfolioData.skills.filter(skill => skill !== skillToRemove);
    setPortfolioData({ ...portfolioData, skills: updatedSkills });
    updateUser({ skills: updatedSkills });
  };

  // Handle Projects
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      id: Date.now() + Math.random(), // Unique ID for key mapping
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setProjectForm({ ...projectForm, files: [...projectForm.files, ...fileData] });
  };

  const handleRemoveFile = (fileId) => {
    const fileToRemove = projectForm.files.find(f => f.id === fileId);
    if (fileToRemove?.url) {
      URL.revokeObjectURL(fileToRemove.url); // Prevent memory leaks
    }
    const updatedFiles = projectForm.files.filter(f => f.id !== fileId);
    setProjectForm({ ...projectForm, files: updatedFiles });
  };

  const handleSaveProject = () => {
    const newProject = {
      id: Date.now(),
      ...projectForm,
      createdAt: new Date().toISOString()
    };
    const updatedProjects = [...portfolioData.projects, newProject];
    setPortfolioData({ ...portfolioData, projects: updatedProjects });
    updateUser({ projects: updatedProjects });
    setShowProjectModal(false);
    setProjectForm({ title: '', description: '', technologies: '', link: '', files: [] });
  };

  const handleDeleteProject = (id) => {
    const projectToDelete = portfolioData.projects.find(p => p.id === id);
    // Cleanup any lingering file URLs inside the deleted project
    projectToDelete?.files?.forEach(file => {
        if (file.url) URL.revokeObjectURL(file.url);
    });

    const updatedProjects = portfolioData.projects.filter(p => p.id !== id);
    setPortfolioData({ ...portfolioData, projects: updatedProjects });
    updateUser({ projects: updatedProjects });
  };

  // Handle Experience
  const handleSaveExperience = () => {
    const newExperience = {
      id: Date.now(),
      ...experienceForm
    };
    const updatedExperiences = [...portfolioData.experiences, newExperience];
    setPortfolioData({ ...portfolioData, experiences: updatedExperiences });
    updateUser({ experiences: updatedExperiences });
    setShowExperienceModal(false);
    setExperienceForm({ title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' });
  };

  const handleDeleteExperience = (id) => {
    const updatedExperiences = portfolioData.experiences.filter(e => e.id !== id);
    setPortfolioData({ ...portfolioData, experiences: updatedExperiences });
    updateUser({ experiences: updatedExperiences });
  };

  // Handle Basic Info
  const handleSaveBasicInfo = () => {
    setPortfolioData({ ...portfolioData, ...basicInfoForm });
    updateUser(basicInfoForm);
    setEditingBasicInfo(false);
  };

  const getFileIcon = (type) => {
    if (type.includes('image')) return <ImageIcon className="w-5 h-5" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
    if (type.includes('text') || type.includes('code')) return <Code className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Memoize sorting so it doesn't run on every render
  const sortedExperiences = useMemo(() => {
    return [...portfolioData.experiences].sort((a, b) => 
      new Date(b.startDate) - new Date(a.startDate)
    );
  }, [portfolioData.experiences]);

  return (
    <div className="portfolio-page">
      <div className="bg-decoration"></div>
      <div className="bg-decoration"></div>

      {/* Header */}
      <div className="portfolio-header">
        <div className="portfolio-container">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="back-button"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </div>
      </div>

      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="portfolio-hero">
            <div className="portfolio-hero-content">
              <div className="hero-avatar">
                {user?.avatar || user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hero-info">
                {editingBasicInfo ? (
                  <div className="edit-form-inline">
                    <input
                      type="text"
                      value={basicInfoForm.name}
                      onChange={(e) => setBasicInfoForm({ ...basicInfoForm, name: e.target.value })}
                      placeholder="Your Name"
                      className="hero-input"
                    />
                    <input
                      type="text"
                      value={basicInfoForm.title}
                      onChange={(e) => setBasicInfoForm({ ...basicInfoForm, title: e.target.value })}
                      placeholder="Your Title (e.g., Full Stack Developer)"
                      className="hero-input-small"
                    />
                    <input
                      type="text"
                      value={basicInfoForm.qualification}
                      onChange={(e) => setBasicInfoForm({ ...basicInfoForm, qualification: e.target.value })}
                      placeholder="Qualification (e.g., B.Tech Computer Science)"
                      className="hero-input-small"
                    />
                    <div className="inline-actions">
                      <button onClick={handleSaveBasicInfo} className="save-inline-btn">
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button onClick={() => setEditingBasicInfo(false)} className="cancel-inline-btn">
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="hero-name">{portfolioData.name || 'Your Name'}</h1>
                    <p className="hero-title">{portfolioData.title || 'Add your title'}</p>
                    <p className="hero-qualification">
                      🎓 {portfolioData.qualification || 'Add your qualification'}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="edit-hero-btn"
                      onClick={() => setEditingBasicInfo(true)}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Info
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="portfolio-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>
            <button
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="overview-grid">
                  <div className="overview-card">
                    <div className="card-header-flex">
                      <h3>About Me</h3>
                      <button onClick={() => setShowAboutModal(true)} className="icon-btn">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p>{portfolioData.about || 'Click edit to add your bio...'}</p>
                  </div>
                  <div className="overview-card">
                    <h3>Quick Stats</h3>
                    <div className="quick-stats">
                      <div className="stat-item">
                        <span className="stat-number">{portfolioData.skills.length}</span>
                        <span className="stat-label">Skills</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{portfolioData.projects.length}</span>
                        <span className="stat-label">Projects</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{portfolioData.experiences.length}</span>
                        <span className="stat-label">Experiences</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="section-header">
                  <div>
                    <h2>My Skills</h2>
                    <p>Add your technical and soft skills</p>
                  </div>
                </div>

                <div className="add-skill-section">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Enter a skill (e.g., React, Python, Communication)"
                    className="skill-input"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddSkill}
                    className="add-skill-btn"
                  >
                    <Plus className="w-5 h-5" />
                    Add Skill
                  </motion.button>
                </div>

                <div className="skills-grid">
                  {portfolioData.skills.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">🎯</div>
                      <p>No skills added yet. Start by adding your first skill!</p>
                    </div>
                  ) : (
                    portfolioData.skills.map((skill) => (
                      <motion.div
                        key={skill} // Changed from index to actual string value
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="skill-chip"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="remove-skill-btn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="section-header">
                  <div>
                    <h2>My Projects</h2>
                    <p>Showcase your best work</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="add-item-btn"
                    onClick={() => setShowProjectModal(true)}
                  >
                    <Plus className="w-5 h-5" />
                    Add Project
                  </motion.button>
                </div>

                {portfolioData.projects.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💼</div>
                    <p>No projects added yet. Showcase your work!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="add-item-btn"
                      onClick={() => setShowProjectModal(true)}
                      style={{ marginTop: '2rem' }}
                    >
                      <Plus className="w-5 h-5" />
                      Add Your First Project
                    </motion.button>
                  </div>
                ) : (
                  <div className="projects-list">
                    {portfolioData.projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="project-card"
                      >
                        <div className="project-header">
                          <h3>{project.title}</h3>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="delete-btn"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="project-description">{project.description}</p>
                        {project.technologies && (
                          <div className="project-tech">
                            <strong>Technologies:</strong> {project.technologies}
                          </div>
                        )}
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                            🔗 View Project
                          </a>
                        )}
                        {project.files && project.files.length > 0 && (
                          <div className="project-files">
                            <strong>Attachments:</strong>
                            <div className="files-grid">
                              {project.files.map((file) => (
                                <div key={file.id || file.name} className="file-item">
                                  {getFileIcon(file.type)}
                                  <span>{file.name}</span>
                                  <span className="file-size">{formatFileSize(file.size)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="section-header">
                  <div>
                    <h2>Work Experience</h2>
                    <p>Your professional journey</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="add-item-btn"
                    onClick={() => setShowExperienceModal(true)}
                  >
                    <Plus className="w-5 h-5" />
                    Add Experience
                  </motion.button>
                </div>

                {portfolioData.experiences.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💼</div>
                    <p>No experience added yet. Add your professional journey!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="add-item-btn"
                      onClick={() => setShowExperienceModal(true)}
                      style={{ marginTop: '2rem' }}
                    >
                      <Plus className="w-5 h-5" />
                      Add Your First Experience
                    </motion.button>
                  </div>
                ) : (
                  <div className="timeline">
                    {sortedExperiences.map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="timeline-item"
                      >
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <div className="experience-header">
                            <div>
                              <h3>{exp.title}</h3>
                              <p className="company">{exp.company} • {exp.location}</p>
                              <p className="duration">
                                {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                {' - '}
                                {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="delete-btn"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="experience-description">{exp.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>

      {/* MODALS */}
      
      {/* About Me Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowAboutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Edit About Me</h2>
                <button onClick={() => setShowAboutModal(false)} className="close-btn">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Tell us about yourself, your interests, goals, and what makes you unique..."
                className="modal-textarea"
                rows="8"
              />
              <div className="modal-actions">
                <button onClick={() => setShowAboutModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleSaveAbout} className="save-btn">
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowProjectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="modal-content large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Add New Project</h2>
                <button onClick={() => setShowProjectModal(false)} className="close-btn">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="modal-form">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="E.g., E-commerce Website"
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Describe your project..."
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Technologies Used</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    placeholder="E.g., React, Node.js, MongoDB"
                  />
                </div>

                <div className="form-group">
                  <label>Project Link</label>
                  <input
                    type="url"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label>Upload Files (Images, PDFs, Code, etc.)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="projectFiles"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="projectFiles" className="file-upload-btn">
                      <Upload className="w-5 h-5" />
                      Choose Files
                    </label>
                  </div>
                  
                  {projectForm.files.length > 0 && (
                    <div className="uploaded-files">
                      {projectForm.files.map((file) => (
                        <div key={file.id} className="uploaded-file-item">
                          {getFileIcon(file.type)}
                          <div className="file-info">
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">{formatFileSize(file.size)}</span>
                          </div>
                          <button onClick={() => handleRemoveFile(file.id)} className="remove-file-btn">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button onClick={() => setShowProjectModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProject} 
                  className="save-btn"
                  disabled={!projectForm.title || !projectForm.description}
                >
                  <Save className="w-4 h-4" /> Save Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Experience Modal */}
      <AnimatePresence>
        {showExperienceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowExperienceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="modal-content large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Add Work Experience</h2>
                <button onClick={() => setShowExperienceModal(false)} className="close-btn">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="modal-form">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    value={experienceForm.title}
                    onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                    placeholder="E.g., Software Engineer"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Company *</label>
                    <input
                      type="text"
                      value={experienceForm.company}
                      onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                      placeholder="E.g., Google"
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={experienceForm.location}
                      onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                      placeholder="E.g., San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="month"
                      value={experienceForm.startDate}
                      onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={experienceForm.endDate}
                      onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                      disabled={experienceForm.current}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={experienceForm.current}
                      onChange={(e) => setExperienceForm({ ...experienceForm, current: e.target.checked })}
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={experienceForm.description}
                    onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                    placeholder="Describe your role, responsibilities, and achievements..."
                    rows="5"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button onClick={() => setShowExperienceModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button 
                  onClick={handleSaveExperience} 
                  className="save-btn"
                  disabled={!experienceForm.title || !experienceForm.company || !experienceForm.startDate}
                >
                  <Save className="w-4 h-4" /> Save Experience
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage; 
