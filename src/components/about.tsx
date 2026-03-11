'use client';

import { motion } from 'framer-motion';

// import MySkills from '@/components/MySkills';
import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-justify leading-7">
        <p className="mb-4">
          I&apos;m Tanvir Tonmoy, I bring ideas to life with stunning visuals
          that connect brands with people. Whether it&apos;s a static design,
          motion graphics, or complete visual storytelling, I create experiences
          leave a lasting impression. I&apos;m passionate about crafting
          captivating visuals that captivate audiences and leave a lasting
          lasting impression.
        </p>
        <p>
          I&apos;m open to Freelance work opportunities where I can contribute,
          learn and grow. If you have a good opportunity that matches my skills
          and experience then don&apos;t hesitate to contact me.
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
