import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Code2, 
  Share2, 
  Settings, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Check, 
  X, 
  Sparkles, 
  Eye, 
  ExternalLink,
  Menu,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useToast } from '../../context/ToastContext';
import { PageTransition } from '../../components/layout/PageTransition';

export const AdminPage = () => {
  const { logout, adminUser } = useAuth();
  const { addToast } = useToast();
  const data = usePortfolioData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(data.profile);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(data.settings);

  // Coding Profiles State
  const [codingProfilesForm, setCodingProfilesForm] = useState(data.codingProfiles);

  // Socials State
  const [socialsForm, setSocialsForm] = useState(data.socials);

  // Modals for CRUD
  const [projectModal, setProjectModal] = useState({ open: false, editing: null });
  const [projectFormData, setProjectFormData] = useState({});

  const [skillModal, setSkillModal] = useState({ open: false, category: '', editingIndex: null });
  const [skillFormData, setSkillFormData] = useState({ name: '', level: 'Proficient', highlight: '' });

  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [experienceModal, setExperienceModal] = useState({ open: false, editing: null });
  const [experienceFormData, setExperienceFormData] = useState({});

  const [educationModal, setEducationModal] = useState({ open: false, editing: null });
  const [educationFormData, setEducationFormData] = useState({});

  const [certModal, setCertModal] = useState({ open: false, editing: null });
  const [certFormData, setCertFormData] = useState({});

  // Sync profile when external data changes
  React.useEffect(() => {
    setProfileForm(data.profile);
    setSettingsForm(data.settings);
    setCodingProfilesForm(data.codingProfiles);
    setSocialsForm(data.socials);
  }, [data.profile, data.settings, data.codingProfiles, data.socials]);

  // Handle Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    data.updateProfile(profileForm);
    addToast({ type: 'success', message: 'Profile details updated successfully.' });
  };

  // Handle Settings Save
  const handleSaveSettings = (e) => {
    e.preventDefault();
    data.updateSettings(settingsForm);
    addToast({ type: 'success', message: 'Appearance and site settings saved.' });
  };

  // Handle Coding Profiles Save
  const handleSaveCodingProfiles = (e) => {
    e.preventDefault();
    data.updateCodingProfiles(codingProfilesForm);
    addToast({ type: 'success', message: 'Coding profile links updated.' });
  };

  // Handle Socials Save
  const handleSaveSocials = (e) => {
    e.preventDefault();
    data.updateSocials(socialsForm);
    addToast({ type: 'success', message: 'Social links updated.' });
  };

  // Handle Project Form Submit
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const techArray = typeof projectFormData.technologies === 'string'
      ? projectFormData.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : projectFormData.technologies || [];

    const featuresArray = typeof projectFormData.features === 'string'
      ? projectFormData.features.split('\n').map(f => f.trim()).filter(Boolean)
      : projectFormData.features || [];

    const payload = {
      ...projectFormData,
      technologies: techArray,
      features: featuresArray
    };

    if (projectModal.editing) {
      data.updateProject(projectModal.editing.id, payload);
      addToast({ type: 'success', message: `Updated project "${payload.title}"` });
    } else {
      data.addProject(payload);
      addToast({ type: 'success', message: `Added new project "${payload.title}"` });
    }
    setProjectModal({ open: false, editing: null });
  };

  // Handle Skill Submit
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!skillFormData.name.trim()) return;

    if (skillModal.editingIndex !== null) {
      data.updateSkill(skillModal.category, skillModal.editingIndex, skillFormData);
      addToast({ type: 'success', message: `Updated skill ${skillFormData.name}` });
    } else {
      data.addSkill(skillModal.category, skillFormData);
      addToast({ type: 'success', message: `Added ${skillFormData.name} to ${skillModal.category}` });
    }
    setSkillModal({ open: false, category: '', editingIndex: null });
  };

  // Handle Experience Submit
  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    const respArray = typeof experienceFormData.responsibilities === 'string'
      ? experienceFormData.responsibilities.split('\n').map(r => r.trim()).filter(Boolean)
      : experienceFormData.responsibilities || [];

    const payload = { ...experienceFormData, responsibilities: respArray };

    if (experienceModal.editing) {
      data.updateExperience(experienceModal.editing.id, payload);
      addToast({ type: 'success', message: 'Experience record updated.' });
    } else {
      data.addExperience(payload);
      addToast({ type: 'success', message: 'New experience record created.' });
    }
    setExperienceModal({ open: false, editing: null });
  };

  // Handle Education Submit
  const handleEducationSubmit = (e) => {
    e.preventDefault();
    if (educationModal.editing) {
      data.updateEducation(educationModal.editing.id, educationFormData);
      addToast({ type: 'success', message: 'Education record updated.' });
    } else {
      data.addEducation(educationFormData);
      addToast({ type: 'success', message: 'New education record added.' });
    }
    setEducationModal({ open: false, editing: null });
  };

  // Handle Certification Submit
  const handleCertSubmit = (e) => {
    e.preventDefault();
    const techArray = typeof certFormData.technologies === 'string'
      ? certFormData.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : certFormData.technologies || [];

    const payload = { ...certFormData, technologies: techArray };

    if (certModal.editing) {
      data.updateCertification(certModal.editing.id, payload);
      addToast({ type: 'success', message: 'Certification updated.' });
    } else {
      data.addCertification(payload);
      addToast({ type: 'success', message: 'New certification added.' });
    }
    setCertModal({ open: false, editing: null });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: data.projects.length },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: data.experience.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: data.education.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: data.certifications.length },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'codingProfiles', label: 'Coding Profiles', icon: Code2 },
    { id: 'socials', label: 'Social Links', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 flex items-center justify-center font-mono font-bold text-xs">
            ADMIN
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-charcoal-950 dark:text-white">
              Portfolio Control Center
            </h1>
            <p className="text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
              Live React Context & Local Storage Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (window.confirm('Reset all portfolio data back to default initial values?')) {
                data.resetToDefaults();
                addToast({ type: 'info', message: 'Portfolio data reset to default.' });
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-400 text-xs font-mono hover:text-black dark:hover:text-white hover:border-charcoal-500 transition-colors"
            title="Reset to initial default data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono font-bold hover:bg-rose-500 hover:text-white transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar */}
        <aside className={`lg:col-span-3 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md p-3 space-y-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-charcoal-950 text-white dark:bg-white dark:text-charcoal-950 font-bold shadow-md'
                    : 'text-charcoal-600 dark:text-charcoal-400 hover:bg-charcoal-100 dark:hover:bg-charcoal-800/60 hover:text-charcoal-950 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[10px] rounded-md ${isActive ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black' : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* ================= TAB: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70">
                  <span className="text-xs font-mono text-charcoal-400">Total Projects</span>
                  <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white mt-1">
                    {data.projects.length}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-mono mt-1 block">
                    {data.projects.filter(p => p.featured).length} Featured
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70">
                  <span className="text-xs font-mono text-charcoal-400">Total Skills</span>
                  <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white mt-1">
                    {data.skills.reduce((acc, c) => acc + c.skills.length, 0)}
                  </div>
                  <span className="text-[11px] text-charcoal-400 font-mono mt-1 block">
                    Across {data.skills.length} categories
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70">
                  <span className="text-xs font-mono text-charcoal-400">Certifications</span>
                  <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white mt-1">
                    {data.certifications.length}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-mono mt-1 block">
                    Verified credentials
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70">
                  <span className="text-xs font-mono text-charcoal-400">Technical Jobs</span>
                  <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white mt-1">
                    {data.experience.length}
                  </div>
                  <span className="text-[11px] text-charcoal-400 font-mono mt-1 block">
                    ELV & Networking
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70">
                  <span className="text-xs font-mono text-charcoal-400">Education Entries</span>
                  <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white mt-1">
                    {data.education.length}
                  </div>
                  <span className="text-[11px] text-charcoal-400 font-mono mt-1 block">
                    B.Sc. CS + Diploma IT
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70">
                  <span className="text-xs font-mono text-charcoal-400">Coding Profiles</span>
                  <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white mt-1">
                    {data.codingProfiles.filter(p => p.url).length}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-mono mt-1 block">
                    Configured external links
                  </span>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="p-6 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-4">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-charcoal-400">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setProjectFormData({
                        title: '',
                        slug: '',
                        category: 'React',
                        shortDescription: '',
                        description: '',
                        technologies: 'React.js, JavaScript, Tailwind CSS',
                        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
                        github: '',
                        liveDemo: '',
                        featured: false,
                        status: 'Completed',
                        problemStatement: '',
                        solution: '',
                        features: 'Responsive UI\nModular components'
                      });
                      setProjectModal({ open: true, editing: null });
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs font-mono font-medium text-charcoal-800 dark:text-charcoal-200 hover:border-charcoal-500"
                  >
                    <User className="w-4 h-4" />
                    <span>Edit Profile & Availability</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('skills')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs font-mono font-medium text-charcoal-800 dark:text-charcoal-200 hover:border-charcoal-500"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Manage Skills</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between border-b border-charcoal-200 dark:border-charcoal-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-charcoal-950 dark:text-white">
                    Profile & Identity Settings
                  </h2>
                  <p className="text-xs text-charcoal-500">Edit your name, titles, bio, and availability status badge.</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">Subtitle</label>
                    <input
                      type="text"
                      value={profileForm.subtitle}
                      onChange={(e) => setProfileForm({ ...profileForm, subtitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">Availability Status Text</label>
                  <input
                    type="text"
                    value={profileForm.availabilityStatus}
                    onChange={(e) => setProfileForm({ ...profileForm, availabilityStatus: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">Hero Description</label>
                  <textarea
                    rows={3}
                    value={profileForm.heroDescription}
                    onChange={(e) => setProfileForm({ ...profileForm, heroDescription: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">About Story & Narrative</label>
                  <textarea
                    rows={4}
                    value={profileForm.aboutSummary}
                    onChange={(e) => setProfileForm({ ...profileForm, aboutSummary: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= TAB: PROJECTS ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80">
                <h2 className="text-base font-bold text-charcoal-950 dark:text-white">
                  Projects Management ({data.projects.length})
                </h2>
                <button
                  onClick={() => {
                    setProjectFormData({
                      title: '',
                      slug: '',
                      category: 'React',
                      shortDescription: '',
                      description: '',
                      technologies: 'React.js, JavaScript',
                      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
                      github: '',
                      liveDemo: '',
                      featured: false,
                      status: 'Completed',
                      problemStatement: '',
                      solution: '',
                      features: 'Dynamic UI\nState synchronization'
                    });
                    setProjectModal({ open: true, editing: null });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=120&q=80'}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover border border-charcoal-200 dark:border-charcoal-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">{proj.title}</h4>
                          {proj.featured && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 border border-amber-500/30">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-500 font-mono mt-0.5">/{proj.slug} • {proj.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => data.toggleProjectFeatured(proj.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${proj.featured ? 'border-amber-500/50 bg-amber-500/10 text-amber-600' : 'border-charcoal-300 dark:border-charcoal-700 text-charcoal-500'}`}
                      >
                        {proj.featured ? 'Unfeature' : 'Make Featured'}
                      </button>

                      <button
                        onClick={() => {
                          setProjectFormData({
                            ...proj,
                            technologies: proj.technologies ? proj.technologies.join(', ') : '',
                            features: proj.features ? proj.features.join('\n') : ''
                          });
                          setProjectModal({ open: true, editing: proj });
                        }}
                        className="p-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:text-black dark:hover:text-white"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.title}"?`)) {
                            data.deleteProject(proj.id);
                            addToast({ type: 'info', message: 'Project removed.' });
                          }
                        }}
                        className="p-2 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: SKILLS ================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80">
                <h2 className="text-base font-bold text-charcoal-950 dark:text-white">
                  Skills & Category Architecture
                </h2>
                <button
                  onClick={() => setCategoryModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="space-y-6">
                {data.skills.map((cat, catIdx) => (
                  <div
                    key={catIdx}
                    className="p-6 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-charcoal-950 dark:text-white">{cat.category}</h3>
                        <p className="text-xs text-charcoal-500">{cat.description || 'Configured Category'}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSkillFormData({ name: '', level: 'Proficient', highlight: '' });
                            setSkillModal({ open: true, category: cat.category, editingIndex: null });
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-charcoal-300 dark:border-charcoal-700 text-xs font-mono"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Skill</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete entire category "${cat.category}"?`)) {
                              data.deleteSkillCategory(cat.category);
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-800/50 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-charcoal-950 dark:text-white">{skill.name}</h4>
                            <span className="text-[10px] font-mono text-charcoal-400">{skill.level}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setSkillFormData(skill);
                                setSkillModal({ open: true, category: cat.category, editingIndex: sIdx });
                              }}
                              className="p-1 text-charcoal-400 hover:text-black dark:hover:text-white"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => data.deleteSkill(cat.category, sIdx)}
                              className="p-1 text-rose-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: EXPERIENCE ================= */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80">
                <h2 className="text-base font-bold text-charcoal-950 dark:text-white">
                  Experience Management
                </h2>
                <button
                  onClick={() => {
                    setExperienceFormData({
                      role: '',
                      company: '',
                      location: 'India',
                      period: '2026',
                      type: 'Full-time',
                      transferableSkills: ['Diagnostics', 'System Testing'],
                      responsibilities: ''
                    });
                    setExperienceModal({ open: true, editing: null });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">{exp.role} — {exp.company}</h4>
                      <p className="text-xs text-charcoal-500 font-mono mt-0.5">{exp.period} • {exp.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setExperienceFormData({
                            ...exp,
                            responsibilities: exp.responsibilities ? exp.responsibilities.join('\n') : ''
                          });
                          setExperienceModal({ open: true, editing: exp });
                        }}
                        className="p-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-300 hover:text-black dark:hover:text-white"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this experience entry?')) {
                            data.deleteExperience(exp.id);
                          }
                        }}
                        className="p-2 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: EDUCATION ================= */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80">
                <h2 className="text-base font-bold text-charcoal-950 dark:text-white">
                  Education Management
                </h2>
                <button
                  onClick={() => {
                    setEducationFormData({
                      degree: '',
                      institution: '',
                      location: '',
                      period: '2026',
                      status: 'Completed',
                      highlights: ''
                    });
                    setEducationModal({ open: true, editing: null });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">{edu.degree}</h4>
                      <p className="text-xs text-charcoal-500 font-mono mt-0.5">{edu.institution} • {edu.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEducationFormData(edu);
                          setEducationModal({ open: true, editing: edu });
                        }}
                        className="p-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this education entry?')) {
                            data.deleteEducation(edu.id);
                          }
                        }}
                        className="p-2 rounded-lg border border-rose-500/30 text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: CERTIFICATIONS ================= */}
          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80">
                <h2 className="text-base font-bold text-charcoal-950 dark:text-white">
                  Internships & Certifications
                </h2>
                <button
                  onClick={() => {
                    setCertFormData({
                      title: '',
                      issuer: '',
                      location: '',
                      period: '2026',
                      type: 'Internship & Certification',
                      description: '',
                      technologies: 'Python, React.js',
                      certificateUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=80'
                    });
                    setCertModal({ open: true, editing: null });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Credential</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">{cert.title}</h4>
                      <p className="text-xs text-charcoal-500 font-mono mt-0.5">{cert.issuer} • {cert.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCertFormData({
                            ...cert,
                            technologies: cert.technologies ? cert.technologies.join(', ') : ''
                          });
                          setCertModal({ open: true, editing: cert });
                        }}
                        className="p-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete credential "${cert.title}"?`)) {
                            data.deleteCertification(cert.id);
                          }
                        }}
                        className="p-2 rounded-lg border border-rose-500/30 text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: RESUME ================= */}
          {activeTab === 'resume' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-6">
              <h2 className="text-lg font-bold text-charcoal-950 dark:text-white">
                Resume Configuration
              </h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">PDF File Path / Download URL</label>
                  <input
                    type="text"
                    value={profileForm.resumeUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                    placeholder="/assets/resume/Karuppasamy-A-Resume.pdf"
                    className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-mono"
                  />
                  <p className="text-[11px] text-charcoal-400">Updating this file path instantly reflects across all "Download Resume" buttons on the portfolio.</p>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Resume Settings</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= TAB: CODING PROFILES & SOCIALS ================= */}
          {activeTab === 'codingProfiles' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-6">
              <h2 className="text-lg font-bold text-charcoal-950 dark:text-white">
                External Coding Profiles (Leave blank to hide)
              </h2>
              <form onSubmit={handleSaveCodingProfiles} className="space-y-4">
                {codingProfilesForm.map((p, idx) => (
                  <div key={p.id} className="space-y-1">
                    <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">{p.name} URL</label>
                    <input
                      type="url"
                      value={p.url || ''}
                      onChange={(e) => {
                        const next = [...codingProfilesForm];
                        next[idx].url = e.target.value;
                        setCodingProfilesForm(next);
                      }}
                      placeholder={`https://${p.name.toLowerCase()}.com/username`}
                      className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Coding Profile Links</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-6">
              <h2 className="text-lg font-bold text-charcoal-950 dark:text-white">
                Social Links & Messaging Channels
              </h2>
              <form onSubmit={handleSaveSocials} className="space-y-4">
                {socialsForm.map((s, idx) => (
                  <div key={s.id} className="space-y-1">
                    <label className="block text-xs font-mono text-charcoal-600 dark:text-charcoal-400">{s.name} Link</label>
                    <input
                      type="text"
                      value={s.url || ''}
                      onChange={(e) => {
                        const next = [...socialsForm];
                        next[idx].url = e.target.value;
                        setSocialsForm(next);
                      }}
                      placeholder="URL or handle"
                      className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-sans"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Social Links</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= TAB: SETTINGS ================= */}
          {activeTab === 'settings' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-6">
              <h2 className="text-lg font-bold text-charcoal-950 dark:text-white">
                Appearance & Effects Configuration
              </h2>
              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-charcoal-50/50 dark:bg-charcoal-800/50">
                  <div>
                    <span className="text-sm font-bold text-charcoal-950 dark:text-white block">Particle Background</span>
                    <span className="text-xs text-charcoal-500">Enable responsive canvas interactive constellation.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.particleEnabled !== false}
                    onChange={(e) => setSettingsForm({ ...settingsForm, particleEnabled: e.target.checked })}
                    className="w-5 h-5 accent-charcoal-900 dark:accent-white cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-charcoal-50/50 dark:bg-charcoal-800/50">
                  <div>
                    <span className="text-sm font-bold text-charcoal-950 dark:text-white block">3D Hero Interactive Mesh</span>
                    <span className="text-xs text-charcoal-500">Three.js / React Three Fiber developer core in the hero section.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.threeDEnabled !== false}
                    onChange={(e) => setSettingsForm({ ...settingsForm, threeDEnabled: e.target.checked })}
                    className="w-5 h-5 accent-charcoal-900 dark:accent-white cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-charcoal-50/50 dark:bg-charcoal-800/50">
                  <div>
                    <span className="text-sm font-bold text-charcoal-950 dark:text-white block">Contact Form Enabled</span>
                    <span className="text-xs text-charcoal-500">Enable direct Web3Forms contact submission.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.contactFormEnabled !== false}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactFormEnabled: e.target.checked })}
                    className="w-5 h-5 accent-charcoal-900 dark:accent-white cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-charcoal-50/50 dark:bg-charcoal-800/50">
                  <div>
                    <span className="text-sm font-bold text-charcoal-950 dark:text-white block">Available for Opportunities Badge</span>
                    <span className="text-xs text-charcoal-500">Show green status pill in navbar and hero.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.isAvailable !== false}
                    onChange={(e) => setSettingsForm({ ...settingsForm, isAvailable: e.target.checked })}
                    className="w-5 h-5 accent-charcoal-900 dark:accent-white cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Appearance Settings</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT PROJECT ================= */}
      {projectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 p-6 sm:p-8 my-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-200 dark:border-charcoal-800 pb-3">
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-white">
                {projectModal.editing ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setProjectModal({ open: false, editing: null })}
                className="p-1 text-charcoal-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-charcoal-500">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectFormData.title || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                    className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-charcoal-500">Slug (URL identifier)</label>
                  <input
                    type="text"
                    value={projectFormData.slug || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                    className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-charcoal-500">Category</label>
                  <select
                    value={projectFormData.category || 'React'}
                    onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                    className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                  >
                    <option value="React">React</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-charcoal-500">Status</label>
                  <input
                    type="text"
                    value={projectFormData.status || 'Completed'}
                    onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
                    className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-charcoal-500">Short Summary</label>
                <input
                  type="text"
                  required
                  value={projectFormData.shortDescription || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, shortDescription: e.target.value })}
                  className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-charcoal-500">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={projectFormData.technologies || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                  placeholder="React.js, JavaScript, Tailwind CSS"
                  className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-charcoal-500">GitHub URL</label>
                  <input
                    type="url"
                    value={projectFormData.github || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, github: e.target.value })}
                    className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-charcoal-500">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectFormData.liveDemo || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, liveDemo: e.target.value })}
                    className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-charcoal-500">Thumbnail URL</label>
                <input
                  type="url"
                  value={projectFormData.thumbnail || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, thumbnail: e.target.value })}
                  className="w-full p-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="feat-chk"
                  checked={!!projectFormData.featured}
                  onChange={(e) => setProjectFormData({ ...projectFormData, featured: e.target.checked })}
                  className="w-4 h-4 accent-charcoal-900 dark:accent-white"
                />
                <label htmlFor="feat-chk" className="text-xs font-mono text-charcoal-700 dark:text-charcoal-300">
                  Feature this project on the Home page
                </label>
              </div>

              <div className="pt-4 border-t border-charcoal-200 dark:border-charcoal-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProjectModal({ open: false, editing: null })}
                  className="px-4 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  {projectModal.editing ? 'Save Project Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT SKILL ================= */}
      {skillModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-200 dark:border-charcoal-800 pb-3">
              <h3 className="text-base font-bold text-charcoal-950 dark:text-white">
                {skillModal.editingIndex !== null ? 'Edit Skill' : `Add Skill to ${skillModal.category}`}
              </h3>
              <button
                onClick={() => setSkillModal({ open: false, category: '', editingIndex: null })}
                className="p-1 text-charcoal-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSkillSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-charcoal-500">Skill / Technology Name</label>
                <input
                  type="text"
                  required
                  value={skillFormData.name}
                  onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                  placeholder="e.g. FastAPI"
                  className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-charcoal-500">Level / Badge</label>
                <input
                  type="text"
                  value={skillFormData.level}
                  onChange={(e) => setSkillFormData({ ...skillFormData, level: e.target.value })}
                  placeholder="Core Framework"
                  className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-charcoal-500">Highlight / Focus Areas</label>
                <input
                  type="text"
                  value={skillFormData.highlight}
                  onChange={(e) => setSkillFormData({ ...skillFormData, highlight: e.target.value })}
                  placeholder="Async APIs, Pydantic, Endpoints"
                  className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
                />
              </div>

              <div className="pt-3 border-t border-charcoal-200 dark:border-charcoal-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSkillModal({ open: false, category: '', editingIndex: null })}
                  className="px-4 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD CATEGORY ================= */}
      {categoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-charcoal-950 dark:text-white">
              Add New Skill Category
            </h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Cloud Infrastructure"
              className="w-full p-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCategoryModal(false)}
                className="px-4 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newCategoryName.trim()) {
                    data.addSkillCategory(newCategoryName.trim());
                    setNewCategoryName('');
                    setCategoryModal(false);
                    addToast({ type: 'success', message: 'Added skill category.' });
                  }
                }}
                className="px-5 py-2 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
