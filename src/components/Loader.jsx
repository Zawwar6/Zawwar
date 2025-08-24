import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Loader = ({ setLoading }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Percentage increment
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setPercent(current);
      if (current === 100) {
        clearInterval(interval);

        // Loader hide animation
        gsap.to(loaderRef.current, {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => setLoading(false),
        });
      }
    }, 25); // speed (100 * 25ms = 2.5s)

    // Progress bar animation
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut",
      }
    );

    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
    >
      {/* Top progress line */}
      <div
        ref={progressRef}
        className="absolute top-0 left-0 h-[4px] bg-gradient-to-r from-cyan-400 to-purple-500"
      ></div>

      {/* Percentage Counter */}
      <h1 className="text-6xl font-bold text-cyan-400">{percent}%</h1>
    </div>
  );
};

export default Loader;
