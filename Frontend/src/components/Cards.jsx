import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Code2,
  MonitorCheck,
  Rocket,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const Cards = () => {
  const highlights = [
    {
      title: "AI-Powered Code",
      description:
        "Turn natural language into clean, production-ready website code.",
      icon: Code2,
      accent: "from-purple-500/20 to-purple-500/0",
    },
    {
      title: "Fully Responsive",
      description:
        "Create beautiful layouts that adapt seamlessly to every screen.",
      icon: MonitorCheck,
      accent: "from-blue-500/20 to-blue-500/0",
    },
    {
      title: "One-Click Deployment",
      description:
        "Go from your first idea to a live website with just a few clicks.",
      icon: Rocket,
      accent: "from-violet-500/20 to-violet-500/0",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 pb-32">
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[250px]
        bg-purple-600/[0.07]
        blur-[120px]
        rounded-full
        pointer-events-none"
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full
          border border-white/10
          bg-white/[0.03]
          text-xs text-white/50"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-300" />
          Everything you need
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          From idea to{" "}
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            website
          </span>
        </h2>

        <p className="mt-3 max-w-xl mx-auto text-sm md:text-base text-white/40">
          WebCraft AI handles the code, design, and responsiveness so you can
          focus on your idea.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ y: 35, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className="group"
            >
              <Card
                className="
                  relative h-full min-h-[230px]
                  overflow-hidden
                  rounded-2xl
                  border-white/10
                  bg-white/[0.025]
                  p-7
                  text-white
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-purple-400/20
                  hover:bg-white/[0.045]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                "
              >
                {/* Gradient background */}
                <div
                  className={`
                    absolute -right-20 -top-20
                    h-48 w-48
                    rounded-full
                    bg-linear-to-br ${item.accent}
                    blur-3xl
                    opacity-50
                    transition-all duration-700
                    group-hover:scale-150
                    group-hover:opacity-100
                  `}
                />

                {/* Bottom gradient line */}
                <div
                  className="
                    absolute bottom-0 left-1/2
                    h-px w-0
                    -translate-x-1/2
                    bg-linear-to-r from-transparent via-purple-400 to-transparent
                    transition-all duration-500
                    group-hover:w-2/3
                  "
                />

                <div className="relative flex h-full flex-col">
                  {/* Icon */}
                  <div
                    className="
                      flex h-12 w-12 items-center justify-center
                      rounded-xl
                      border border-white/10
                      bg-white/[0.05]
                      shadow-inner
                      transition-all duration-500
                      group-hover:border-purple-400/30
                      group-hover:bg-purple-500/10
                      group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]
                    "
                  >
                    <Icon
                      className="
                        h-5 w-5
                        text-purple-300
                        transition-all duration-500
                        group-hover:scale-110
                        group-hover:text-purple-200
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold tracking-tight">
                        {item.title}
                      </h3>

                      <ArrowUpRight
                        className="
                          h-4 w-4
                          text-white/20
                          transition-all duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-purple-300
                        "
                      />
                    </div>

                    <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/55">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Cards;
