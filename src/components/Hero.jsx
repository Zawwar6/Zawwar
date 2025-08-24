import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // 👇 Sab elements ko ek timeline me rakhenge
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Sab elements upar se neeche girte hue aayenge
    tl.from([heroRef.current.querySelector("h1"), heroRef.current.querySelector("p")], {
      y: -120,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
    });

    tl.from(ctaRef.current, {
      y: -120,
      opacity: 0,
      duration: 1,
    }, "-=0.5");


    // Scroll effect for right graphic
    gsap.to(imgRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 50,
      scale: 1.15,
      rotation: 360,
      ease: "power2.out",
    });

    // Infinite Rotation of logos
    gsap.to(".stack-logo", {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* LEFT */}
      <div ref={textRef} className="md:w-1/2 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 bg-clip-text text-transparent">
          Hi, I’m Zawwar Khatri
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-lg leading-relaxed">
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
        {/* CTA */}
        <div ref={ctaRef} className="mt-6 flex items-center gap-3 text-white">
  {/* Portfolio */}
  <a
    href="https://linktr.ee/zawwarkhatri"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-400 hover:opacity-90 active:scale-95 transition"
  >
    Portfolio
  </a>

  {/* GitHub */}
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

  {/* LinkedIn */}
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

      {/* RIGHT */}
      <div ref={imgRef} className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <div className="relative w-80 h-80 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-400/20 via-sky-400/20 to-teal-300/20 backdrop-blur">
          <h2 className="absolute text-xl font-semibold text-cyan-200">
            Tech Stack ⚡
          </h2>
          <div className="absolute inset-0 animate-spin-slow flex items-center justify-center">
            <img src="/1.png" alt="React" className="stack-logo w-12 h-12 absolute top-0" />
            <img src="/2.png" alt="Node.js" className="stack-logo w-12 h-12 absolute right-0" />
            <img src="/3.png" alt="MongoDB" className="stack-logo w-12 h-12 absolute bottom-0" />
            <img src="/4.png" alt="Express" className="stack-logo w-12 h-12 absolute left-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
