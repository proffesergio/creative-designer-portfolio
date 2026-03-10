'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// import Heading from './sub/Heading';
import { skillsData2 } from '@/lib/data';

const MySkills = () => {
  // Animation variants
  const variants = {
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 * index * 0.5,
      },
    }),
    hidden: { opacity: 0, y: 30 },
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-20 px-96">
      {/* <Heading text="Skills" /> */}

      <div className="flex w-full flex-wrap justify-between gap-x-8 gap-y-10 lg:gap-y-6">
        {skillsData2.map((skill, index) => (
          <motion.div
            custom={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.1 }}
            viewport={{ margin: '50px', once: true }}
            key={index}
            className="flex items-center justify-center gap-x-3 rounded-xl border border-yellow-500 bg-zinc-200 px-5 py-2 lg:px-2"
          >
            <Image
              src={skill.icon}
              width={50}
              height={50}
              alt="skills"
              className="h-auto w-[40px]"
            />
            {/* <p className="text-sm text-gray-600">{skill.name}</p> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MySkills;
