import { AnimatePresence, motion } from "framer-motion";
import { setUserData } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/service/api";

const Navbar = ({ onGetStarted }) => {
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await api.get("/v0/auth/logout");
      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
    >
      <div className="max-w-7x1 mx-auto px-6 py-4 flex justify-between items-center'">
        <div className="text-lg font-semibold">WebCraft AI</div>
        <div className="flex items-center gap-5">
          <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
            Pricing
          </div>
          {userData && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
              <Coins size={14} className="text-yellow-400" />
              <span className="text-zinc-300">Credits</span>
              <span>{userData.credits}</span>
            </div>
          )}

          {!userData ? (
            <button
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm cursor-pointer"
              onClick={onGetStarted}
            >
              Get Started
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center"
              >
                <img
                  src={
                    userData.avatar ||
                    `https://ui-avatars.com/api/?background=random&&name=${userData.name}`
                  }
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border border-white/20 object-cover"
                />
              </button>
              {openProfile && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium truncate">
                        {userData.name}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {userData.email}
                      </p>
                    </div>

                    <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
                      <Coins size={14} className="text-yellow-400" />
                      <span className="text-zinc-300">Credits</span>
                      <span>{userData.credits}</span>
                      <span className="font-semibold">+</span>
                    </button>

                    <button
                      className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </button>
                    <button
                      className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
