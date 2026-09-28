import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import axios from "axios";
import api from "@/service/api";

const Generate = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleGenerateWebsite = async () => {
    // setLoading(true);
    try {
      const result = await api.post(
        `/v0/website/generate`,
        { prompt },
      );
      console.log(result);
      // setProgress(100);
      // setLoading(false);
      // navigate(`/editor/${result.data.websiteId}`);
    } catch (error) {
      // setLoading(false);
      // setError(error.response.data.message || "something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => navigate("/")}
            >
            <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">
              WebCraft <span className="text-zinc-400">AI</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 mt-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
            Build Websites with
            <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Real AI Power
            </span>
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Describe your idea, and let AI turn it into a fully functional
            website.
          </p>
        </motion.div>

        <div className="mb-14  flex justify-center items-center flex-col">
          
          <div className="relative">
            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder="Describe your website in detail..."
              className="w-[70vw] h-50  p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"
            ></textarea>
          </div>

          {/* 
                    {error && <p className='mt-4 text-sm text-red-400'>{error}</p>} */}
        </div>
        
        <div className='flex justify-center'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleGenerateWebsite}
                        // disabled={!prompt.trim() && loading}
                        // className={`px-14 py-4 rounded-2xl font-semibold text-lg ${prompt.trim() && !loading
                            // ? "bg-white text-black"
                            // : "bg-white/20 text-zinc-400 cursor-not-allowed"
                            // }`}
                    >
                        Generate Website
                    </motion.button>
                </div>
      </div>
    </div>
  );
};

export default Generate;
