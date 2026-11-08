import React, { useEffect, useState } from "react";

const Background = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0 ambient-base" />

      {/* Purple glow */}
      <div
        className="absolute w-[700px] h-[700px] ambient-purple blur-[160px]"
        style={{
          top: -200 + scrollY * 0.2,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Blue glow */}
      <div
        className="absolute w-[600px] h-[600px] ambient-blue blur-[140px]"
        style={{
          bottom: -150 - scrollY * 0.15,
          left: -150 + scrollY * 0.1,
        }}
      />

      {/* Cyan glow */}
      <div
        className="absolute w-[500px] h-[500px] ambient-cyan blur-[120px]"
        style={{
          top: `calc(20% + ${scrollY * 0.1}px)`,
          right: -100 - scrollY * 0.1,
        }}
      />

      {/* Green glow */}
      <div
        className="absolute w-[560px] h-[560px] ambient-green blur-[150px]"
        style={{
          bottom: -180 - scrollY * 0.08,
          right: -180 + scrollY * 0.08,
        }}
      />
    </div>
  );
};

export default Background;