import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import Cards from "../components/Cards";
import Footer from "@/components/Footer";
import LoginCard from "@/components/LoginCard";



const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  console.log(openLogin)
  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      {/* Header */}
      <Navbar onGetStarted={()=> setOpenLogin(true)} />

      {/* Hero Section */}
      <Hero onGetStarted={()=> setOpenLogin(true)} />

      {/* Cards */}
      <Cards />

      {/* Footer */}
      <Footer />

      {/* Login */}
      {openLogin && (
        <LoginCard onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
};

export default Home;
