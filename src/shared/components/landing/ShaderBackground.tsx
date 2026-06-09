"use client";

import React, { useEffect, useRef } from "react";

export const ShaderBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
      <div
        ref={bgRef}
        className="absolute inset-0 transition-[background-position] duration-300 ease-out"
        style={{
          background: `
            radial-gradient(600px circle at 30% 40%, rgba(0, 110, 47, 0.15) 0%, transparent 70%),
            radial-gradient(500px circle at 70% 60%, rgba(0, 110, 47, 0.1) 0%, transparent 70%),
            radial-gradient(400px circle at 50% 80%, rgba(0, 200, 83, 0.08) 0%, transparent 70%)
          `,
        }}
      />
      <div className="absolute inset-0 animate-[drift_20s_ease_infinite] opacity-30"
        style={{
          background: `
            radial-gradient(800px circle at 20% 30%, rgba(0, 110, 47, 0.12) 0%, transparent 60%),
            radial-gradient(700px circle at 80% 20%, rgba(0, 200, 83, 0.08) 0%, transparent 60%),
            radial-gradient(600px circle at 40% 70%, rgba(0, 110, 47, 0.1) 0%, transparent 60%)
          `,
        }}
      />
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(2%, -1%) scale(1.05); }
          66% { transform: translate(-1%, 2%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
};
