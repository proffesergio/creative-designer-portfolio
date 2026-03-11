'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { skillsData2 } from '@/lib/data';

// import Image from 'next/image';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const Skills = () => {
  return (
    <div className="mt-10 flex w-full flex-wrap justify-between gap-10 px-5 sm:justify-center sm:px-0 md:mt-14 lg:justify-between">
      {skillsData2.map((icon, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          // eslint-disable-next-line prettier/prettier
          whileHover={{ scale: 1.5 }}
          viewport={{
            once: true,
          }}
        >
          <Image
            src={icon.icon}
            width={50}
            height={50}
            alt="skills"
            className="h-auto w-[40px]"
          />
          {/* {icon} */}
        </motion.div>
      ))}
    </div>
  );
};
