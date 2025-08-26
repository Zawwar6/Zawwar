import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const cursorRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeBtnRef = useRef(null);

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
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.3,
          ease: "power4.out",
        }
      );

      // Animate hamburger to hide
      gsap.to(hamburgerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate close button to appear
      gsap.fromTo(
        closeBtnRef.current,
        { opacity: 0, scale: 0.8, rotate: -45 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power4.in",
      });

      // Show hamburger
      gsap.to(hamburgerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Hide close button
      gsap.to(closeBtnRef.current, {
        opacity: 0,
        scale: 0.8,
        rotate: 45,
        duration: 0.4,
        ease: "power2.in",
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
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    };

    const handleUnhover = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    const interactiveElements = document.querySelectorAll("a, button, .cursor-hover");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400 pointer-events-none mix-blend-difference z-[9999] flex items-center justify-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-3 h-3 rounded-full bg-white opacity-30"></div>
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-10 py-4 bg-black/30 backdrop-blur-lg z-50">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.2),transparent_70%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,0,255,0.15),transparent_60%)] opacity-50"></div>

        {/* Left side name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent tracking-tight cursor-hover drop-shadow-[0_0_8px_rgba(0,200,255,0.5)]">
          Zawwar Khatri
        </h1>

        {/* Hamburger button */}
        <div
          ref={hamburgerRef}
          className="w-8 h-8 cursor-pointer flex flex-col justify-center gap-2 cursor-hover relative z-10"
          onClick={() => setIsOpen(true)}
        >
          <div className="h-[3px] w-8 rounded bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-300"></div>
          <div className="h-[3px] w-6 rounded bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-300"></div>
        </div>

        {/* Fullscreen Overlay */}
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-4xl sm:text-5xl font-extrabold opacity-0 -translate-y-full z-[9000]"
        >
          {/* Background Effects for Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.25),transparent_70%)] opacity-70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(75,0,255,0.2),transparent_60%)] opacity-60"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

          {/* Close button */}
          <button
            ref={closeBtnRef}
            className="absolute top-8 right-8 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-hover"
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
              className="relative cursor-hover group"
            >
              <span className="text-white group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:via-cyan-500 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {text}
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-sky-400 to-teal-400 group-hover:w-full transition-all duration-500"></div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;