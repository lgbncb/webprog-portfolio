import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURE YOUR PRODUCTION URL HERE ---
const API_URL = 'https://webprog-portfolio.onrender.com/api/guestbook';

/* ─────────────────────────────────────────────
   CALIBRATED DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    emoji: "⌚",
    title: "Project L.I.F.E.",
    genre: "IoT · Hardware",
    year: "2026",
    rating: "HD",
    maturity: "TOP 1",
    desc: "Wearable IoT device for elderly fall detection using Arduino, sensors, and MariaDB alerts.",
    stack: ["Arduino", "MariaDB", "IoT Cloud"],
    accent: "#e50914",
  },
  {
    id: 2,
    emoji: "🏋️",
    title: "FitLife Gym Portal",
    genre: "Full-Stack · Web",
    year: "2026",
    rating: "HD",
    maturity: "NEW",
    desc: "Management system for FitLife Gym with coach tracking and scheduling by Love, Joy, Hope Corp.",
    stack: ["React", "NestJS", "Supabase"],
    accent: "#e50914",
  },
  {
    id: 3,
    emoji: "🎥",
    title: "Sonder",
    genre: "Creative · Media",
    year: "2025",
    rating: "4K",
    maturity: "FEATURED",
    desc: "A cinematic video project exploring the 'Art of Noticing' and the complexity of strangers.",
    stack: ["Video Editing", "Storytelling"],
    accent: "#e50914",
  }
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function App() {
  const [messages, setMessages] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fetch logic
  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchMessages();
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, message: newMessage }),
      });
      setNewName(''); setNewMessage(''); fetchMessages();
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-[#141414] text-white min-h-screen font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>

      {/* Netflix Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-[4%] h-[68px] flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <span className="font-['Bebas_Neue'] text-3xl text-[#e50914] tracking-wider cursor-pointer">LANZ</span>
          <div className="hidden md:flex gap-5 text-sm text-[#e5e5e5]">
            <a href="#hero" className="hover:text-white transition">Home</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#guestbook" className="hover:text-white transition">Guestbook</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-[100vh] flex items-end pb-24 px-[4%] overflow-hidden bg-[#141414]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="text-[#e50914] font-bold text-sm tracking-widest mb-2 uppercase">APC CS Student · Cybersecurity</div>
          <h1 className="font-['Bebas_Neue'] text-7xl md:text-9xl leading-[0.9] mb-4">LANZ<br/><span className="text-[#e50914]">BUNCAB</span></h1>
          <p className="text-lg text-gray-300 mb-8">Second-year student at Asia Pacific College. J-ISSA Relations Associate & JPCS External Relations Assistant Director.</p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-2 font-bold flex items-center gap-2 hover:bg-white/80 transition">▶ Play Projects</button>
            <button className="bg-gray-500/70 text-white px-8 py-2 font-bold backdrop-blur-md hover:bg-gray-500/50 transition">ⓘ More Info</button>
          </div>
        </div>
      </section>

      {/* Skills Row */}
      <section id="skills" className="py-12 px-[4%]">
        <h2 className="text-[#e5e5e5] text-xl font-bold mb-4">My Skills Stack</h2>
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {["Python", "Java", "C", "JavaScript", "NestJS", "React", "Supabase", "MariaDB"].map(skill => (
            <div key={skill} className="flex-shrink-0 px-6 py-3 bg-[#2a2a2a] border border-gray-700 rounded text-sm hover:bg-[#e50914] transition-colors">{skill}</div>
          ))}
        </div>
      </section>

      {/* Project Rows */}
      <section id="projects" className="py-12 px-[4%]">
        <h2 className="text-[#e5e5e5] text-xl font-bold mb-4">Featured Productions</h2>
        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
          {PROJECTS.map(p => (
            <div key={p.id} className="group relative flex-shrink-0 w-64 h-36 bg-gradient-to-br from-red-900 to-black rounded-md overflow-hidden cursor-pointer transition-transform hover:scale-110 z-10">
              <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40 group-hover:opacity-100 transition-opacity">{p.emoji}</div>
              <div className="absolute bottom-0 p-3 bg-gradient-to-t from-black w-full text-xs font-bold">{p.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Guestbook */}
      <section id="guestbook" className="py-20 px-[4%] bg-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-['Bebas_Neue'] text-5xl mb-8 tracking-wide">Guestbook Reviews</h2>
          <form onSubmit={handleSubmit} className="mb-12 bg-[#141414] p-6 border border-gray-800 rounded">
            <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-[#2a2a2a] p-3 mb-4 rounded border border-gray-700 outline-none focus:border-[#e50914]" placeholder="Your Name" required />
            <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} className="w-full bg-[#2a2a2a] p-3 mb-4 rounded border border-gray-700 outline-none focus:border-[#e50914] h-24" placeholder="Your message..." required />
            <button type="submit" className="w-full bg-[#e50914] py-3 font-bold uppercase tracking-widest">{isSubmitting ? 'Sending...' : 'Post Review'}</button>
          </form>
          <div className="space-y-4">
            {messages.map(m => (
              <div key={m.id} className="border-l-4 border-[#e50914] bg-[#141414] p-4">
                <div className="font-bold text-[#e50914]">{m.name}</div>
                <div className="text-gray-400 text-sm">{m.message}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-600 text-xs border-t border-gray-900">
        © 2026 Lanz Buncab · Asia Pacific College
      </footer>
    </div>
  );
}