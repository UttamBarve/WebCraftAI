import React from "react";
import { motion } from "motion/react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import Cards from "../components/Cards";
const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Cards */}
      <Cards />
    </div>
  );
};

export default Home;
