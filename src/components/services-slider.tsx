'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Clapperboard, Megaphone, Palette, Scissors } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Brand identity, print & social media graphics',
    gradient: 'from-rose-500 to-pink-600',
    glow: 'group-hover:shadow-rose-500/30',
    border: 'group-hover:border-rose-500/50',
  },
  {
    icon: Clapperboard,
    title: 'Motion Ads Design',
    description: 'Eye-catching animated ads for digital platforms',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'group-hover:shadow-violet-500/30',
    border: 'group-hover:border-violet-500/50',
  },
  {
    icon: Scissors,
    title: 'Video Editing',
    description: 'Professional cuts, reels & cinematic edits',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'group-hover:shadow-blue-500/30',
    border: 'group-hover:border-blue-500/50',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Campaign creatives for social & digital ads',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'group-hover:shadow-amber-500/30',
    border: 'group-hover:border-amber-500/50',
  },
];

// Duplicate for seamless loop
const loopItems = [...services, ...services, ...services];

const CARD_WIDTH = 280;
const GAP = 24;
const ITEM_WIDTH = CARD_WIDTH + GAP;
const TOTAL_WIDTH = services.length * ITEM_WIDTH;

export const ServicesSlider = () => {
  const x = useMotionValue(0);
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    let current = x.get();
    current -= (delta / 1000) * 60 * directionRef.current;
    // When we've scrolled one full set, reset to 0
    if (current <= -TOTAL_WIDTH) {
      current += TOTAL_WIDTH;
    }
    x.set(current);
  });

  return (
    <section className="w-full overflow-hidden py-14">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="font-mono text-sm uppercase tracking-widest text-rose-500">
          What I Do
        </p>
        <h2 className="font-heading mt-2 text-3xl font-extrabold md:text-4xl">
          Core{' '}
          <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Services
          </span>
        </h2>
      </motion.div>

      {/* Fade masks */}
      <div className="relative">
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />

        {/* Track */}
        <div className="flex" style={{ overflow: 'hidden' }}>
          <motion.div className="flex" style={{ x, gap: GAP }}>
            {loopItems.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  style={{ width: CARD_WIDTH, flexShrink: 0 }}
                  className={`group relative flex flex-col items-start gap-4 rounded-2xl border border-gray-700/60 bg-gradient-to-br from-gray-900 to-gray-950 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl ${service.glow} ${service.border}`}
                >
                  {/* Icon blob */}
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}
                  >
                    <Icon className="size-6 text-white" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r ${service.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
