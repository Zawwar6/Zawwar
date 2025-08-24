import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Loader from "./components/Loader"; // 👈 Loader import
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper", // Fixed wrapper
        content: "#smooth-content", // Scrollable content
        smooth: 1.5, // Smoothness
        effects: true,
      });
    }
  }, [loading]);

  return (
    <div className="bg-black text-white">
      {loading ? (
        <Loader setLoading={setLoading} /> // 👈 Loader chalega
      ) : (
        <div id="smooth-wrapper">
          <div id="smooth-content" className="relative">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.15),transparent_70%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Main Sections */}
            <Navbar />
            <Hero />
            <About />
            <Project />
            <Contact />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
