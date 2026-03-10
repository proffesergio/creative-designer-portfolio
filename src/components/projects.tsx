'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Project } from '@/components/project';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { projectsData } from '@/lib/data';

const FILTERS = [
  'All',
  'Branding',
  'Print Media',
  'Social Media Posts',
  'Marketing Ads',
] as const;

type Filter = (typeof FILTERS)[number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const Projects = () => {
  const { ref } = useSectionInView('Projects');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section ref={ref} id="projects" className="my-16 scroll-mt-28 md:mb-28">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading="Static Graphics & Projects"
          content="Projects I worked on. Each of them containing its own case study."
        />
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        className="mb-8 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                : 'border border-gray-700 bg-gray-900 text-gray-400 hover:border-rose-500/50 hover:text-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <Project
                key={`${project.title}-${index}`}
                project={project}
                index={index}
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center text-gray-500"
            >
              No projects in this category yet.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
