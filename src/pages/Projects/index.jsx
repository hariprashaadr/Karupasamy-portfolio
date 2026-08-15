import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Search, Filter } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectFilter } from '../../components/projects/ProjectFilter';
import { ProjectSearch } from '../../components/projects/ProjectSearch';
import { ProjectModal } from '../../components/projects/ProjectModal';

export const ProjectsPage = () => {
  const { projects } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [quickViewProject, setQuickViewProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // 1. Category filter matching
      const matchesFilter =
        activeFilter === 'All' ||
        project.category?.toLowerCase() === activeFilter.toLowerCase() ||
        (project.categories && project.categories.some(c => c.toLowerCase() === activeFilter.toLowerCase())) ||
        (project.technologies && project.technologies.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

      // 2. Search term matching
      const s = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !s ||
        project.title.toLowerCase().includes(s) ||
        project.category?.toLowerCase().includes(s) ||
        project.shortDescription?.toLowerCase().includes(s) ||
        project.description?.toLowerCase().includes(s) ||
        (project.technologies && project.technologies.some(t => t.toLowerCase().includes(s)));

      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, searchTerm]);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <SectionTitle
        badge="Portfolio Archive"
        title="Software Projects & Applications"
        subtitle="Explore my interactive web applications, full-stack systems, and developer tools built with Python and React."
      />

      {/* Controls: Search and Filter */}
      <div className="space-y-6">
        <ProjectSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ProjectFilter
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />
      </div>

      {/* Projects Grid */}
      <div className="min-h-[300px]">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500 mx-auto flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-charcoal-900 dark:text-white">
              No projects found
            </h3>
            <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
              No projects matched "{searchTerm}" under "{activeFilter}". Try adjusting your search query or selected filter.
            </p>
            <button
              onClick={() => { setActiveFilter('All'); setSearchTerm(''); }}
              className="mt-2 text-xs font-mono text-charcoal-900 dark:text-white underline font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onQuickView={setQuickViewProject}
                  isFeatured={false}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProject && (
        <ProjectModal
          project={quickViewProject}
          onClose={() => setQuickViewProject(null)}
        />
      )}
    </PageTransition>
  );
};
