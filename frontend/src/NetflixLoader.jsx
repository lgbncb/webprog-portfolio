import { useState, useEffect } from "react";

export default function NetflixLoader({ onComplete }) {
  const [phase, setPhase] = useState("intro");   
  const [progress, setProgress] = useState(0);
  const [showN, setShowN] = useState(false);
  const [nScale, setNScale] = useState(8);
  const [nOpacity, setNOpacity] = useState(0);
  const [barsDone, setBarsDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        dur: 3 + Math.random() * 4,
        size: 2 + Math.random() * 4,
        opacity: 0.1 + Math.random() * 0.25,
      }))
    );
  }, []);

  useEffect(() => {
    setTimeout(() => { setShowN(true); setNOpacity(1); setNScale(1); }, 100);
    setTimeout(() => setPhase("bars"), 500);
    setTimeout(() => { setBarsDone(true); setPhase("reveal"); }, 2500);
    setTimeout(() => setFadeOut(true), 2800);
    setTimeout(() => { setPhase("done"); onComplete?.(); }, 3000);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "bars") return;
    const start = Date.now();
    const duration = 2000;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');
        @keyframes nFlicker { 0%,100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.6; } 94% { opacity: 1; } 96% { opacity: 0.8; } 97% { opacity: 1; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes pulseRing { 0% { transform: scale(0.85); opacity: 0.6; } 70% { transform: scale(1.15); opacity: 0; } 100% { transform: scale(1.15); opacity: 0; } }
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes redGlow { 0%,100% { box-shadow: 0 0 20px #e5091455, 0 0 60px #e5091422; } 50% { box-shadow: 0 0 40px #e5091488, 0 0 100px #e5091444; } }
        .loader-wrap { position: fixed; inset: 0; z-index: 9999; background: #000; display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: 'DM Sans', sans-serif; overflow: hidden; transition: opacity 0.5s ease; }
        .scanline { position: absolute; left: 0; right: 0; height: 3px; background: linear-gradient(transparent, rgba(229,9,20,0.08), transparent); animation: scanline 3s linear infinite; pointer-events: none; }
        .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%); pointer-events: none; }
        .grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(229,9,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(229,9,20,0.04) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
        .n-logo { font-family: 'Bebas Neue', sans-serif; font-size: clamp(7rem, 20vw, 11rem); color: #e50914; line-height: 1; user-select: none; animation: nFlicker 4s ease-in-out infinite, redGlow 2s ease-in-out infinite; letter-spacing: -0.02em; }
        .tagline { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.35em; text-transform: uppercase; color: #e5e5e5; font-size: clamp(0.6rem, 1.5vw, 0.85rem); margin-top: 0.5rem; opacity: 0.7; }
        .bar-track { width: clamp(220px, 40vw, 360px); height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; margin-top: 2.5rem; position: relative; }
        .bar-fill { height: 100%; background: linear-gradient(90deg, #b81c23, #e50914, #ff3a3a); border-radius: 2px; position: relative; transition: width 0.05s linear; }
        .bar-fill::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 40px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 1s linear infinite; }
        .pct-label { font-size: 0.7rem; color: #555; letter-spacing: 0.15em; margin-top: 0.6rem; font-variant-numeric: tabular-nums; }
        .pct-label span { color: #e50914; font-weight: 600; }
        .status-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem; font-size: 0.65rem; color: #444; letter-spacing: 0.1em; text-transform: uppercase; }
        .dot-blink { width: 5px; height: 5px; border-radius: 50%; background: #e50914; animation: blink 1s step-start infinite; }
        .pulse-ring { position: absolute; width: 200px; height: 200px; border: 1px solid rgba(229,9,20,0.3); border-radius: 50%; animation: pulseRing 2s ease-out infinite; pointer-events: none; }
        .floating-particle { position: absolute; background: #e50914; border-radius: 50%; pointer-events: none; }
        .segment-bar { display: flex; gap: 3px; width: clamp(220px, 40vw, 360px); margin-top: 2.5rem; }
        .segment { flex: 1; height: 3px; background: #1a1a1a; border-radius: 1px; overflow: hidden; position: relative; }
        .segment-fill { height: 100%; background: #e50914; border-radius: 1px; transition: width 0.3s ease; }
      `}</style>

      <div className="loader-wrap" style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? "none" : "all" }}>
        <div className="grid-bg" />
        <div className="scanline" />
        <div className="vignette" />
        {particles.map(p => (
          <div key={p.id} className="floating-particle" style={{ left: `${p.x}%`, bottom: "-10px", width: p.size, height: p.size, opacity: p.opacity, animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite` }} />
        ))}
        <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="pulse-ring" /><div className="pulse-ring" /><div className="pulse-ring" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, transform: showN ? "translateY(0)" : "translateY(20px)", opacity: showN ? 1 : 0, transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease" }}>
          <div style={{ transform: `scale(${nScale})`, transition: "transform 1s cubic-bezier(0.22,1,0.36,1)" }}><div className="n-logo">N</div></div>
          <div className="tagline">Portfolio · 2026</div>
          {phase !== "intro" && (
            <div>
              <div className="segment-bar">
                {[...Array(10)].map((_, i) => {
                  const segPct = Math.max(0, Math.min(100, (progress - i * 10) * 10));
                  return <div key={i} className="segment"><div className="segment-fill" style={{ width: `${segPct}%` }} /></div>;
                })}
              </div>
              <div className="bar-track" style={{ marginTop: "6px" }}><div className="bar-fill" style={{ width: `${progress}%` }} /></div>
              <div className="pct-label">Loading <span>{Math.round(progress)}%</span></div>
              <div className="status-row"><div className="dot-blink" />{barsDone ? "Ready to stream" : "Initializing Assets..."}</div>
            </div>
          )}
        </div>
        <div style={{ position: "absolute", bottom: "1.5rem", left: 0, right: 0, display: "flex", justifyContent: "center", color: "#333", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          React · Python · Supabase · Render
        </div>
      </div>
    </>
  );
}