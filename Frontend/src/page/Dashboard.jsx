import { ArrowLeft, Check, Rocket, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [websites, setWebsites] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  function capitalizeWords(str) {
    return str
      .toLowerCase() // 1. Lowercase everything safely
      .split(" ") // 2. Break string into an array of words
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + // 3. Capitalize the first letter
          word.slice(1), // 4. Attach the rest of the word
      )
      .join(" "); // 5. Glue the array back into a string
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition"
            onClick={() => navigate("/generate")}
          >
            + New Website
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-sm text-zinc-400">Welcome Back</p>
            <h1 className="text-3xl font-bold">{capitalizeWords(userData.name)}</h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
