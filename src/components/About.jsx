
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: "Next JS", icon: "/6.png", value: 70 },
  { name: "React", icon: "/1.png", value: 85 },
  { name: "GSAP", icon: "/5.png", value: 75 },
  { name: "Tailwind CSS", icon: "/3.png", value: 80 },
  { name: "Node JS", icon: "/2.png", value: 70 },
  { name: "Express.js", icon: "/4.png", value: 70 },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            scrub: true,
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      // Cards animation
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { 
            x: i % 2 === 0 ? -100 : 100, // Alternate left/right entrance
            y: 100,
            opacity: 0,
            rotation: i % 2 === 0 ? -15 : 15,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
            },
          }
        );

        // Hover effect
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.1,
            rotationX: 10,
            rotationY: 10,
            boxShadow: "0 0 30px rgba(0, 200, 255, 0.7)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            boxShadow: "0 0 15px rgba(0, 200, 255, 0.3)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      });

      // Cleanup event listeners
      return () => {
        itemsRef.current.forEach((item) => {
          item.removeEventListener("mouseenter", () => {});
          item.removeEventListener("mouseleave", () => {});
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 sm:px-10 py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.3),transparent_70%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,0,255,0.25),transparent_60%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_80%)] opacity-30"></div>
        {/* Static Particles */}
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 opacity-30 top-[20%] left-[30%]"></div>
          <div className="absolute w-2 h-2 rounded-full bg-teal-400 opacity-30 top-[50%] left-[70%]"></div>
          <div className="absolute w-2 h-2 rounded-full bg-purple-400 opacity-30 top-[80%] left-[40%]"></div>
        </div>
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 sm:mb-16 text-center bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,200,255,0.5)]"
      >
        Skills
      </h2>

      {/* Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 relative z-10 w-full max-w-6xl">
        {skillsData.map((skill, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="relative w-48 h-64 sm:w-56 sm:h-72 bg-gradient-to-br from-black/70 to-gray-900/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center border border-cyan-400/50 hover:border-cyan-400/80 transition-all duration-300 cursor-pointer"
            style={{ boxShadow: "0 0 15px rgba(0, 200, 255, 0.3)" }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-16 h-16 sm:w-20 sm:h-20 mb-4"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-100 drop-shadow-[0_0_5px_rgba(0,200,255,0.5)]">
              {skill.name}
            </h3>
            <p className="text-base sm:text-lg text-gray-300 font-medium">
              {skill.value}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
