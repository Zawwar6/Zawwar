import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: "JavaScript", value: 90 },
  { name: "React", value: 85 },
  { name: "GSAP", value: 75 },
  { name: "Tailwind CSS", value: 80 },
  { name: "Three.js", value: 70 },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);
  const circlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in/out
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
            },
          }
        );
      });

      // Circular progress animation
      circlesRef.current.forEach((circle, i) => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        gsap.set(circle, { strokeDasharray: circumference, strokeDashoffset: circumference });

        gsap.to(circle, {
          strokeDashoffset: circumference - (circumference * skillsData[i].value) / 100,
          ease: "none",
          scrollTrigger: {
            trigger: itemsRef.current[i],
            start: "top 85%",
            end: "bottom 15%",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 sm:px-10 py-20 overflow-hidden"
    >
      {/* BG Grid + Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 sm:mb-14 text-center bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 bg-clip-text text-transparent drop-shadow-lg"
      >
        Skills
      </h2>

      {/* Skills Chart Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 relative z-10 w-full max-w-6xl">
        {skillsData.map((skill, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="flex flex-col items-center group"
          >
            {/* Circular Progress */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  ref={(el) => (circlesRef.current[i] = el)}
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#grad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#4facfe" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage Text */}
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                {skill.value}%
              </span>
            </div>

            {/* Skill Name */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
