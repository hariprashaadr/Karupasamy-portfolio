import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProfile } from '../data/profile';
import { initialProjects } from '../data/projects';
import { initialSkills } from '../data/skills';
import { initialExperience } from '../data/experience';
import { initialEducation } from '../data/education';
import { initialCertifications } from '../data/certifications';
import { initialCodingProfiles } from '../data/codingProfiles';
import { initialSocials } from '../data/socials';

const STORAGE_KEY = 'karuppasamy_portfolio_data_v1';

const defaultSettings = {
  particleEnabled: true,
  threeDEnabled: true,
  contactFormEnabled: true,
  animationIntensity: 'standard', // 'subtle' | 'standard' | 'high'
  defaultTheme: 'dark',
  availabilityStatus: "Available for Junior Full Stack Developer Opportunities",
  isAvailable: true
};

const PortfolioDataContext = createContext();

export const PortfolioDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          profile: parsed.profile || initialProfile,
          projects: parsed.projects || initialProjects,
          skills: parsed.skills || initialSkills,
          experience: parsed.experience || initialExperience,
          education: parsed.education || initialEducation,
          certifications: parsed.certifications || initialCertifications,
          codingProfiles: parsed.codingProfiles || initialCodingProfiles,
          socials: parsed.socials || initialSocials,
          settings: { ...defaultSettings, ...(parsed.settings || {}) }
        };
      }
    } catch (e) {
      console.error('Error loading portfolio state from localStorage:', e);
    }
    return {
      profile: initialProfile,
      projects: initialProjects,
      skills: initialSkills,
      experience: initialExperience,
      education: initialEducation,
      certifications: initialCertifications,
      codingProfiles: initialCodingProfiles,
      socials: initialSocials,
      settings: defaultSettings
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving portfolio state to localStorage:', e);
    }
  }, [data]);

  // Profile
  const updateProfile = (newProfile) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...newProfile }
    }));
  };

  // Projects CRUD
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    };
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    return newProject;
  };

  const updateProject = (id, updatedProject) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updatedProject } : p))
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const toggleProjectFeatured = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, featured: !p.featured } : p))
    }));
  };

  const reorderProjects = (newProjectsList) => {
    setData(prev => ({
      ...prev,
      projects: newProjectsList
    }));
  };

  // Skills CRUD
  const addSkillCategory = (categoryName, icon = "Code2", description = "") => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: categoryName, icon, description, skills: [] }]
    }));
  };

  const deleteSkillCategory = (categoryName) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(c => c.category !== categoryName)
    }));
  };

  const addSkill = (categoryName, skillObj) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.category === categoryName) {
          return {
            ...cat,
            skills: [...cat.skills, skillObj]
          };
        }
        return cat;
      })
    }));
  };

  const updateSkill = (categoryName, skillIndex, updatedSkill) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.category === categoryName) {
          const nextSkills = [...cat.skills];
          nextSkills[skillIndex] = { ...nextSkills[skillIndex], ...updatedSkill };
          return { ...cat, skills: nextSkills };
        }
        return cat;
      })
    }));
  };

  const deleteSkill = (categoryName, skillIndex) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.category === categoryName) {
          return {
            ...cat,
            skills: cat.skills.filter((_, idx) => idx !== skillIndex)
          };
        }
        return cat;
      })
    }));
  };

  // Experience CRUD
  const addExperience = (exp) => {
    const newExp = { ...exp, id: Date.now() };
    setData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
  };

  const updateExperience = (id, updatedExp) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e.id === id ? { ...e, ...updatedExp } : e))
    }));
  };

  const deleteExperience = (id) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  // Education CRUD
  const addEducation = (edu) => {
    const newEdu = { ...edu, id: Date.now() };
    setData(prev => ({
      ...prev,
      education: [newEdu, ...prev.education]
    }));
  };

  const updateEducation = (id, updatedEdu) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...updatedEdu } : e))
    }));
  };

  const deleteEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Certifications CRUD
  const addCertification = (cert) => {
    const newCert = { ...cert, id: Date.now() };
    setData(prev => ({
      ...prev,
      certifications: [newCert, ...prev.certifications]
    }));
  };

  const updateCertification = (id, updatedCert) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => (c.id === id ? { ...c, ...updatedCert } : c))
    }));
  };

  const deleteCertification = (id) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Coding Profiles & Socials
  const updateCodingProfiles = (codingProfiles) => {
    setData(prev => ({ ...prev, codingProfiles }));
  };

  const updateSocials = (socials) => {
    setData(prev => ({ ...prev, socials }));
  };

  // Settings
  const updateSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  // Reset to original defaults
  const resetToDefaults = () => {
    setData({
      profile: initialProfile,
      projects: initialProjects,
      skills: initialSkills,
      experience: initialExperience,
      education: initialEducation,
      certifications: initialCertifications,
      codingProfiles: initialCodingProfiles,
      socials: initialSocials,
      settings: defaultSettings
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        ...data,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        reorderProjects,
        addSkillCategory,
        deleteSkillCategory,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        updateCodingProfiles,
        updateSocials,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
