import { AnimatePresence, motion } from "framer-motion";
import { setUserData } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Coins, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import api from "@/service/api";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onGetStarted }) => {
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="
        fixed top-0 left-0 right-0
        z-50
        backdrop-blur-xl
        bg-black/40
        border-b border-white/[0.08]
      "
    >
      {/* Subtle bottom gradient */}
      <div
        className="
          absolute bottom-0 left-1/2
          -translate-x-1/2
          w-1/3 h-px
          bg-linear-to-r
          from-transparent
          via-purple-500/40
          to-transparent
        "
      />

      <div
        className="
          max-w-7xl mx-auto
          px-6 py-4
          flex items-center justify-between
        "
      >

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          {/* Logo Icon */}
          <div
            className="
              relative
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              bg-linear-to-br
              from-purple-500
              to-blue-500
              shadow-[0_0_20px_rgba(139,92,246,0.25)]
              transition-all duration-300
              group-hover:shadow-[0_0_28px_rgba(139,92,246,0.45)]
              group-hover:scale-105
            "
          >
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          {/* Brand */}
          <span
            className="
              text-lg
              font-semibold
              tracking-tight
              bg-linear-to-r
              from-white
              to-white/70
              bg-clip-text
              text-transparent
            "
          >
            WebCraft AI
          </span>
        </button>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Pricing */}
          <button
            className="
              hidden md:inline-flex
              relative
              text-sm
              text-zinc-400
              hover:text-white
              transition-colors
              cursor-pointer
              group
            "
          >
            Pricing

            <span
              className="
                absolute
                -bottom-1
                left-0
                h-px
                w-0
                bg-purple-400
                transition-all duration-300
                group-hover:w-full
              "
            />
          </button>

          {/* Credits */}
          {userData && (
            <div
              className="
                hidden md:flex
                items-center
                gap-2
                px-3.5 py-1.5
                rounded-full
                border border-white/10
                bg-white/[0.04]
                text-sm
                transition-all duration-300
                hover:border-yellow-400/20
                hover:bg-white/[0.07]
              "
            >
              <Coins
                size={14}
                className="text-yellow-400"
              />

              <span className="text-zinc-400">
                Credits
              </span>

              <span className="font-medium text-white">
                {userData.credits}
              </span>
            </div>
          )}

          {/* Logged Out */}
          {!userData ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                relative
                px-5 py-2
                rounded-lg
                text-sm
                font-medium
                text-white
                border border-purple-400/20
                bg-linear-to-r
              
                
                hover:border-purple-400/40
                hover:from-purple-500/30
                hover:to-blue-500/30
                
                transition-all duration-300
                cursor-pointer
              "
              onClick={onGetStarted}
            >
              Get Started
            </motion.button>
          ) : (

            /* Logged In */
            <div className="relative">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenProfile(!openProfile)}
                className="
                  flex items-center gap-2
                  cursor-pointer
                  rounded-full
                  transition-all duration-300
                "
              >
                <div
                  className={`
                    p-[2px]
                    rounded-full
                    transition-all duration-300
                    ${
                      openProfile
                        ? "bg-linear-to-r from-purple-500 to-blue-500"
                        : "bg-white/10 hover:bg-purple-400/40"
                    }
                  `}
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?background=random&name=${userData.name}`
                    }
                    alt="User Avatar"
                    className="
                      w-9 h-9
                      rounded-full
                      object-cover
                      border-2 border-[#080808]
                    "
                  />
                </div>

                <ChevronDown
                  size={14}
                  className={`
                    hidden sm:block
                    text-zinc-500
                    transition-transform duration-300
                    ${openProfile ? "rotate-180" : ""}
                  `}
                />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {openProfile && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className="
                      absolute
                      right-0
                      mt-3
                      w-64
                      z-50
                      overflow-hidden
                      rounded-2xl
                      border border-white/10
                      bg-[#0a0a0a]/95
                      backdrop-blur-xl
                      shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                    "
                  >

                    {/* User Info */}
                    <div className="px-4 py-4 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">

                        <img
                          src={
                            userData.avatar ||
                            `https://ui-avatars.com/api/?background=random&name=${userData.name}`
                          }
                          alt="User Avatar"
                          className="
                            w-10 h-10
                            rounded-full
                            object-cover
                            border border-white/10
                          "
                        />

                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate text-white">
                            {userData.name}
                          </p>

                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Mobile Credits */}
                    <button
                      className="
                        md:hidden
                        w-full
                        px-4 py-3
                        flex items-center gap-2
                        text-sm
                        border-b border-white/[0.08]
                        hover:bg-white/[0.04]
                        transition-colors
                      "
                    >
                      <Coins
                        size={14}
                        className="text-yellow-400"
                      />

                      <span className="text-zinc-400">
                        Credits
                      </span>

                      <span className="ml-auto font-medium">
                        {userData.credits}
                      </span>

                      <span className="text-zinc-500">
                        +
                      </span>
                    </button>

                    {/* Dashboard */}
                    <button
                      className="
                        w-full
                        px-4 py-3
                        text-left
                        text-sm
                        text-zinc-300
                        hover:text-white
                        hover:bg-white/[0.04]
                        transition-colors
                      "
                      onClick={() => {
                        navigate("/dashboard");
                        setOpenProfile(false);
                      }}
                    >
                      Dashboard
                    </button>

                    {/* Logout */}
                    <button
                      className="
                        w-full
                        px-4 py-3
                        text-left
                        text-sm
                        text-red-400
                        hover:text-red-300
                        hover:bg-red-500/[0.05]
                        transition-colors
                        border-t border-white/[0.06]
                      "
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
