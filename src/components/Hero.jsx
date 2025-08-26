import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const techStackRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaRef = useRef(null);
  const techStack = [
    { name: "Node.js", icon: "/2.png", angle: 90 },
    { name: "React", icon: "/1.png", angle: -90 },
    { name: "Next JS", icon: "/6.png", angle: 90 },
    { name: "MongoDB", icon: "/3.png", angle: 90 },
    { name: "Express", icon: "/4.png", angle: 90 },
    { name: "Gsap", icon: "/5.png", angle: 90 },
  ];

  useEffect(() => {
    // === Left Side Animation ===
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(
      [heroRef.current.querySelector("h1"), heroRef.current.querySelector("p")],
      {
        y: -120,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }
    );

    tl.from(
      ctaRef.current,
      {
        y: -120,
        opacity: 0,
        duration: 1,
      },
      "-=0.5"
    );

    // === Tech stack cards entrance ===
    gsap.fromTo(
      cardRefs.current,
      { y: 120, opacity: 0, rotation: -20 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none reset",
        },
      }
    );

    // === Orbit Animation ===
    cardRefs.current.forEach((card, i) => {
      const radius = window.innerWidth < 640 ? 60 : 100;
      gsap.to(card, {
        x: () => Math.cos((techStack[i].angle * Math.PI) / 180) * radius,
        y: () => Math.sin((techStack[i].angle * Math.PI) / 180) * radius,
        duration: 4,
        repeat: -1,
        ease: "linear",
        modifiers: {
          x: (x) => `${parseFloat(x).toFixed(2)}px`,
          y: (y) => `${parseFloat(y).toFixed(2)}px`,
        },
        onUpdate: function () {
          techStack[i].angle += 0.6;
        },
      });
    });

    // === Scroll effect for container ===
    gsap.to(techStackRef.current, {
      y: -60,
      scale: 1.15,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // === Mouse Move Parallax Effect ===
    const handleMouseMove = (e) => {
      if (!techStackRef.current) return;

      const { left, top, width, height } =
        techStackRef.current.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      cardRefs.current.forEach((card, i) => {
        gsap.to(card, {
          x: `+=${x * 0.02 * (i + 1)}`,
          y: `+=${y * 0.02 * (i + 1)}`,
          rotationY: x * 0.02,
          rotationX: -y * 0.02,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    };

    const handleMouseLeave = () => {
      cardRefs.current.forEach((card) => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-8 lg:px-12 py-12 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* LEFT SIDE */}
      <div
        ref={textRef}
        className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 bg-clip-text text-transparent leading-tight">
          Hi, I’m Zawwar Khatri
        </h1>
        <p className="text-base sm:text-lg lg:text-2xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          A passionate{" "}
          <span className="font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            MERN Stack Developer
          </span>{" "}
          crafting modern, scalable and interactive web experiences using{" "}
          <span className="text-cyan-300 font-medium">MongoDB</span>,{" "}
          <span className="text-emerald-300 font-medium">Express</span>,{" "}
          <span className="text-sky-300 font-medium">React</span>, and{" "}
          <span className="text-indigo-300 font-medium">Node.js</span>.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4"
        >
          <a
            href="https://linktr.ee/zawwarkhatri"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-400 hover:opacity-90 active:scale-95 transition"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/Zawwar6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 transition"
            title="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.38-3.87-1.38-.52-1.31-1.28-1.66-1.28-1.66-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.2a10.9 10.9 0 0 1 5.7 0c2.19-1.51 3.15-1.2 3.15-1.2.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/zawwar-ahmed-4b8564276/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 transition"
            title="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-11 20H5V9h3v11zM6.5 7.5C5.1 7.5 4 6.4 4 5s1.1-2.5 2.5-2.5S9 3.6 9 5s-1.1 2.5-2.5 2.5zM20 20h-3v-5.5c0-1.7-.6-2.8-2-2.8s-2.3 1-2.3 2.7V20h-3V9h3v1.5c.7-1.1 2-1.8 3.3-1.8 2.4 0 4 1.6 4 4.9V20z" />
            </svg>
          </a>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        ref={techStackRef}
        className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0 relative"
      >
        <div className="relative w-full max-w-md h-80 sm:h-96 flex items-center justify-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.3),transparent_70%)] opacity-70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,0,255,0.25),transparent_60%)] opacity-60"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_80%)] opacity-30"></div>

          {/* Orbit Path */}
          <svg
            className="absolute w-64 h-64 sm:w-80 sm:h-80"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="100"
              fill="none"
              stroke="rgba(0, 200, 255, 0.15)"
              strokeWidth="2"
              strokeDasharray="10,5"
            />
          </svg>

          {/* Tech Stack Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-black/70 to-gray-900/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center border border-cyan-400/50 hover:border-cyan-400/80 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: "0 0 20px rgba(0, 200, 255, 0.4)",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-2"
                />
                <span className="text-sm sm:text-base font-semibold text-cyan-100 drop-shadow-[0_0_5px_rgba(0,200,255,0.5)]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
