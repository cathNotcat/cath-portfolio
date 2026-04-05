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
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0b0f1a]" />

      {/* Purple glow */}
      <div
        className="absolute w-[700px] h-[700px] bg-purple-700/30 blur-[160px]"
        style={{
          top: -200 + scrollY * 0.2,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Blue glow */}
      <div
        className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[140px]"
        style={{
          bottom: -150 - scrollY * 0.15,
          left: -150 + scrollY * 0.1,
        }}
      />

      {/* Cyan glow */}
      <div
        className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[120px]"
        style={{
          top: `calc(20% + ${scrollY * 0.1}px)`,
          right: -100 - scrollY * 0.1,
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
        <img src="/noise.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Background;



// import React from 'react'

// const Background = () => {
//   return (
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         {/* Base dark */}
//         <div className="absolute inset-0 bg-[#0b0f1a]" />

//         {/* Purple glow (top center) */}
//         <div className="absolute w-[700px] h-[700px] bg-purple-700/30 blur-[160px] top-[-200px] left-1/2 -translate-x-1/2" />

//         {/* Blue glow (bottom left) */}
//         <div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[140px] bottom-[-150px] left-[-150px]" />

//         {/* Soft light right */}
//         <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[120px] top-[20%] right-[-100px]" />
//         <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
//           <img src="/noise.png" className="w-full h-full object-cover" />
//         </div>
//       </div>
//   )
// }

// export default Background