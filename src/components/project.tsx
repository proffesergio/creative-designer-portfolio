'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import Image from 'next/image';

import { ImageModal } from '@/components/image-modal';
import { projectsData } from '@/lib/data';

interface ProjectProps {
  project: (typeof projectsData)[number];
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Project = ({ project, index }: ProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98] as const,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={itemVariants}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="group-hover:scale-115 object-cover transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/30"
            >
              <Eye className="size-5" />
              <span>Quick View</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-400">
              {project.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-400 transition-colors group-hover:text-gray-300">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Button */}
          {project.links.preview && project.links.preview !== '#' && (
            <motion.a
              href={project.links.preview}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Visit Project
              <span>→</span>
            </motion.a>
          )}
        </div>

        {/* Decorative Border Glow */}
        <div className="absolute inset-0 -z-10 origin-center rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 opacity-0 blur transition-opacity duration-300 group-hover:opacity-10" />
      </motion.div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={project.image}
        title={project.title}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
