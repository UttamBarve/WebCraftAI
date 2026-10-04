import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = ({ onGetStarted }) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Typewriter animation text
  const text =
    "Describe your vision. Let AI transform it into a stunning, responsive website in seconds.";

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-20 pt-44 pb-32 px-6 text-center flex flex-col items-center justify-center overflow-hidden">

      {/* Background Glow */}
      <div
        className="
          absolute top-40 left-1/2 -translate-x-1/2
          w-[600px] h-[300px]
          bg-purple-600/20
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          relative
          text-5xl md:text-7xl
          font-bold
          tracking-tight
          flex flex-col
          items-center
          justify-center
          gap-2
        "
      >
        <span>Turn Ideas into Websites</span>

        <span
          className="
            bg-linear-to-r
            from-purple-400
            via-violet-400
            to-blue-400
            bg-clip-text
            text-transparent
          "
        >
          with WebCraft AI
        </span>
      </motion.h1>

      {/* Animated Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-8 max-w-2xl mx-auto min-h-[60px]"
      >
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
          {displayText}
          <span
            className="
              ml-1
              inline-block
              w-[2px]
              h-5
              bg-purple-400
              animate-pulse
              align-middle
            "
          />
        </p>
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <button
          className="
            relative
            mt-8
            px-10
            py-4
            rounded-xl
            font-semibold
            text-black
            bg-linear-to-r
            from-purple-500
            to-blue-400
            hover:text-white
            cursor-pointer
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]
          "
          onClick={() =>
            userData ? navigate("/dashboard") : onGetStarted()
          }
        >
          {userData ? "Go To Dashboard" : "Get Started"}
        </button>
      </motion.div>

    </div>
  );
};

export default Hero;