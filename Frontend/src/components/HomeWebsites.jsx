import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import api from "@/service/api";
import { useNavigate } from "react-router-dom";

export const HomeWebsites = () => {
  const [websites, setWebsites] = useState(null);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const handleGetAllWebsites = async () => {
      try {
        const result = await api.get(`v0/website/getAllWebsites`);
        setWebsites(result.data || []);
        console.log(result);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
          }
    };
    handleGetAllWebsites();
  }, [userData]);
  return (
    <>
      {userData && websites?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <h3 className="text-2xl font-semibold mb-6">Your Websites</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {websites.slice(0, 3).map((w, i) => (
              <motion.div
                key={w._id}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/editor/${w._id}`)}
                className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <div className="h-40 bg-black">
                  <iframe
                    srcDoc={w.latestCode}
                    className="w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold line-clamp-2">
                    {w.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Last Updated {""}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
