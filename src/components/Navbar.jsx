import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const cursorRef = useRef(null);

  // Menu Animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.2,
          ease: "power4.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power4.in",
      });
    }
  }, [isOpen]);

  // Cursor Animation
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4, // Smooth delay
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full 
        bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400 
        pointer-events-none mix-blend-difference z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5  backdrop-blur z-50">
        {/* Left side name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent tracking-wide">
          Zawwar Khatri
        </h1>

        {/* Hamburger button */}
        <div
          className="w-8 h-8 cursor-pointer flex flex-col justify-between"
          onClick={() => setIsOpen(true)}
        >
          <div className="h-[3px] w-8 rounded bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400"></div>
          <div className="h-[3px] w-8 rounded bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400"></div>
          <div className="h-[3px] w-8 rounded bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400"></div>
        </div>

        {/* Fullscreen Overlay */}
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-10 text-5xl font-bold opacity-0 -translate-y-full"
        >
          {/* Cross button */}
          <button
            className="absolute cursor-pointer top-8 right-8 text-5xl font-bold bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent hover:scale-110 transition-transform"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          {["Home", "Skills", "Projects", "Contact"].map((text, i) => (
            <a
              key={i}
              href={`#${text.toLowerCase()}`}
              ref={(el) => (linksRef.current[i] = el)}
              onClick={() => setIsOpen(false)}
              className="hover:text-transparent hover:bg-gradient-to-r hover:from-sky-400 hover:via-cyan-500 hover:to-teal-400 hover:bg-clip-text text-white transition-all"
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
