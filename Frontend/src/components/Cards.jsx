import React from "react";
import { motion } from "motion/react";

const Cards = () => {
  const highlights = [
    "AI-Powered Code",
    "Fully Responsive Designs",
    "One-Click Deployment",
  ];
  return (
    <div className="max-w-7xl mx-auto px-6 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {highlights.map((ele, ind) => (
          <motion.div
            key={ind}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-8"
          >
            <h1>{ele}</h1>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
