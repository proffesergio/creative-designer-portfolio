'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

import { VideoModal } from '@/components/video-modal';
import { motionGraphicsData } from '@/lib/data';
import { getVideoUrl } from '@/lib/videoUrl';

interface MotionGraphicProps {
  item: (typeof motionGraphicsData)[number];
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MotionGraphic = ({ item, index }: MotionGraphicProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleQuickView = () => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <motion.div
        variants={itemVariants}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg transition-all duration-300 hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Video Container */}
        <div className="relative h-56 w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={getVideoUrl(item.video)}
            className="size-full object-cover"
            onEnded={() => setIsPlaying(false)}
            muted
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          >
            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className="flex items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-md transition-all hover:bg-white/30"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="size-6 fill-white text-white" />
              ) : (
                <Play className="size-6 fill-white text-white" />
              )}
            </motion.button>

            {/* Quick View Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickView}
              className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/50"
            >
              Full Screen
            </motion.button>
          </motion.div>

          {/* Play Icon Indicator */}
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                <Play className="size-8 fill-white text-white" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white transition-colors group-hover:text-purple-400">
              {item.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-400 transition-colors group-hover:text-gray-300">
              {item.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Button */}
          {item.links.preview && item.links.preview !== '#' && (
            <motion.a
              href={item.links.preview}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300"
            >
              Visit Project
              <span>→</span>
            </motion.a>
          )}
        </div>

        {/* Decorative Border Glow */}
        <div className="absolute inset-0 -z-10 origin-center rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 opacity-0 blur transition-opacity duration-300 group-hover:opacity-10" />
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        videoUrl={getVideoUrl(item.video)}
        title={item.title}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
