import { ArrowLeft, Check, Coins, Crown, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import api from "@/service/api";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect to explore WebCraftAI.",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations",
    ],
    popular: false,
    bestValue: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    description: "For serious creators & freelancers.",
    features: [
      "Everything in Free",
      "Faster generation",
      "Edit & regenerate",
      "Advanced customization",
    ],
    popular: true,
    bestValue: false,
    button: "Upgrade to Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: 2000,
    description: "For power users, teams & growing businesses.",
    features: [
      "Everything in Pro",
      "2000 AI credits",
      "Unlimited iterations",
      "Priority generation",
      "Team collaboration",
      "Priority support",
    ],
    popular: false,
    bestValue: true,
    button: "Upgrade to Enterprise",
  },
];

function Pricing() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(null);

  const handleBuy = async (planKey) => {
    if (!userData) {
      navigate("/");
      return;
    }

    if (planKey === "free") {
      navigate("/dashboard");
      return;
    }

    setLoading(planKey);

    try {
      const result = await api.post(
        `/v0/billing/purchase`,
        { planType: planKey },
        { withCredentials: true },
      );

      window.location.href = result.data.sessionUrl;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] px-6 pt-16 pb-24 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      {/* Back */}
      <button
        className="relative z-10 mb-10 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto mb-14 max-w-4xl text-center"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
          <Sparkles size={14} className="text-indigo-400" />
          Simple & transparent pricing
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Choose the plan that
          <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            fits your workflow.
          </span>
        </h1>

        <p className="text-lg text-zinc-400">
          Buy credits once. Build anytime.
        </p>
      </motion.div>

      {/* Plans */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-7 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.12,
              duration: 0.5,
            }}
            whileHover={{
              y: p.popular || p.bestValue ? -6 : -4,
              scale: p.popular || p.bestValue ? 1.015 : 1.01,
              transition: {
                duration: 0.01,
                ease: "easeOut",
              },
            }}
            className={`relative flex flex-col rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300

              ${
                p.popular
                  ? `
                    border-indigo-500
                    bg-gradient-to-b
                    from-indigo-500/20
                    via-indigo-500/10
                    to-transparent
                    shadow-2xl
                    shadow-indigo-500/20
                  `
                  : p.bestValue
                    ? `
                      border-purple-400/40
                      bg-gradient-to-b
                      from-purple-500/15
                      via-purple-500/5
                      to-transparent
                      shadow-xl
                      shadow-purple-500/10
                    `
                    : `
                      border-white/10
                      bg-white/5
                      hover:border-indigo-400/40
                      hover:bg-white/[0.07]
                    `
              }
            `}
          >
            {/* Most Popular */}
            {p.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold shadow-lg shadow-indigo-500/30">
                  <Sparkles size={13} />
                  Most Popular
                </span>
              </div>
            )}

            {/* Best Value */}
            {p.bestValue && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-purple-400/30 bg-[#18121f] px-4 py-1.5 text-xs font-semibold text-purple-300 shadow-lg shadow-purple-500/20">
                  <Crown size={13} />
                  Best Value
                </span>
              </div>
            )}

            <div className="flex h-full flex-col">
              {/* Name */}
              <div className="mb-7">
                <h2 className="mb-2 text-xl font-semibold">{p.name}</h2>

                <p className="min-h-[40px] text-sm leading-6 text-zinc-400">
                  {p.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-5 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  {p.price}
                </span>

                {p.key !== "free" && (
                  <span className="mb-1 text-sm text-zinc-500">/one-time</span>
                )}
              </div>

              {/* Credits */}
              <div
                className={`mb-8 flex items-center gap-2 rounded-xl border px-4 py-3

                  ${
                    p.popular
                      ? "border-indigo-400/20 bg-indigo-500/10"
                      : p.bestValue
                        ? "border-purple-400/20 bg-purple-500/10"
                        : "border-white/5 bg-white/[0.04]"
                  }
                `}
              >
                <Coins
                  size={18}
                  className={
                    p.popular || p.bestValue
                      ? "text-yellow-400"
                      : "text-zinc-400"
                  }
                />

                <span className="font-semibold">
                  {p.credits.toLocaleString()} Credits
                </span>

                {p.bestValue && (
                  <span className="ml-auto text-xs font-medium text-purple-300">
                    More value
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mb-10 flex-1 space-y-3">
                {p.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        p.popular
                          ? "text-indigo-400"
                          : p.bestValue
                            ? "text-purple-400"
                            : "text-green-400"
                      }`}
                    />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={loading !== null}
                onClick={() => handleBuy(p.key)}
                className={`w-full rounded-xl py-3.5 font-semibold transition

                  ${
                    p.popular
                      ? `
                        bg-indigo-500
                        text-white
                        shadow-lg
                        shadow-indigo-500/20
                        hover:bg-indigo-600
                      `
                      : p.bestValue
                        ? `
                          bg-white
                          text-black
                          shadow-lg
                          shadow-purple-500/10
                          hover:bg-zinc-200
                        `
                        : `
                          bg-white/10
                          text-white
                          hover:bg-white/20
                        `
                  }

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                `}
              >
                {loading === p.key ? "Redirecting..." : p.button}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom */}
      <div className="relative z-10 mx-auto mt-14 max-w-2xl text-center">
        <p className="text-sm text-zinc-500">
          One-time payment • No monthly subscription • Build whenever you want
        </p>
      </div>
    </div>
  );
}

export default Pricing;
