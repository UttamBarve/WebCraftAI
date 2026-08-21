import React from "react";
import { motion } from "motion/react";

const Hero = ({onGetStarted}) => {
  return (
    <div className="mb-20 pt-44 pb-32 px-6 text-center flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold tracking-tight flex items-center justify-center flex-col gap-2"
      >
        Turn Ideas into Websites
        <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          with WebCraft AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg "
      >
        Describe your vision. Let AI transform it into a stunning, responsive
        website in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <button
          className="px-10 py-4 rounded-xl font-semibold hover:scale-105 transition mt-8 text-black
        bg-linear-to-r from-purple-500 to-blue-400 cursor-pointer
        "
        onClick={onGetStarted}
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
