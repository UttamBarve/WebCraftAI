import React from "react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import {
  Code2,
  MonitorCheck,
  Rocket,
} from "lucide-react";

const Cards = () => {
  const highlights = [
    {
      title: "AI-Powered Code",
      description: "Generate clean, production-ready code",
      icon: Code2,
    },
    {
      title: "Fully Responsive",
      description: "Beautiful layouts on every screen",
      icon: MonitorCheck,
    },
    {
      title: "One-Click Deployment",
      description: "Go from idea to live website instantly",
      icon: Rocket,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
            >
              <Card
                className="
                  group relative h-full min-h-40
                  overflow-hidden
                  border-white/10
                  bg-white/[0.035]
                  p-7
                  text-white
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/[0.06]
                "
              >
                {/* Subtle glow */}
                <div
                  className="
                    absolute -right-10 -top-10
                    h-24 w-24
                    rounded-full
                    bg-purple-500/10
                    blur-3xl
                    transition-all duration-500
                    group-hover:bg-purple-500/20
                  "
                />

                <div className="relative flex flex-col gap-5">
                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-lg
                      border border-white/10
                      bg-white/[0.06]
                    "
                  >
                    <Icon className="h-5 w-5 text-purple-300" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;