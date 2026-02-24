import { useState, useRef, useEffect } from "react";
import TiltedCard from "./TiltedCard";
import LetterGlitch from "./LetterGlitch";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import ClickSpark from "./ClickSpark";

// --- REPLACE WITH YOUR ACTUAL RENDER URL ---
const API_URL = "https://webprog-portfolio.onrender.com/api/guestbook";

/* ─────────────────────────────────────────────
    CALIBRATED PERSONAL DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    title: "Project L.I.F.E.",
    genre: "IoT · Cybersecurity",
    year: "2026",
    rating: "4K",
    maturity: "FEATURED",
    desc: "A wearable IoT device designed to detect falls in elderly individuals and send real-time alerts via MariaDB and Arduino Cloud.",
    stack: ["Arduino", "Python", "MariaDB", "IoT"],
    accent: "#e50914",
    githubUrl: "",
    liveUrl: " ",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600",
    title: "FitLife Gym Portal",
    genre: "Full-Stack · Web",
    year: "2026",
    rating: "HD",
    maturity: "NEW",
    desc: "Management system for FitLife Gym with coach tracking and scheduling. Built by team 'Love, Joy, Hope Corp'.",
    stack: ["React", "NestJS", "Supabase", "Tailwind"],
    accent: "#e50914",
    githubUrl: "https://github.com/lgbncb/fitlife-gym-website",
    liveUrl: " ",
  },
];

const SKILL_ROWS = [
  {
    label: "Programming",
    items: [
      { id: "prog-python", title: "Python", img: "/images/programming/python.jpg" },
      { id: "prog-java", title: "Javascript", img: "/images/programming/javascript.jpg" },
      { id: "prog-c", title: "CSS", img: "/images/programming/css.jpg" },
      { id: "prog-js", title: "HTML", img: "/images/programming/html.jpg" },
      { id: "prog-sql", title: "SQL", img: "/images/programming/sql.jpg" },
      { id: "prog-mongo", title: "MongoDB", img: "/images/programming/mongodb.jpg" },
    ],
  },
  {
    label: "Gallery",
    items: [
      { id: "gallery-japan", title: "Japan", img: "/images/gallery/japan.jpg" },
      { id: "gallery-taiwan", title: "Universal Studios", img: "/images/gallery/universal.jpg" },
      { id: "gallery-vietnam", title: "Vietnam", img: "/images/gallery/vietnam.jpg" },
      { id: "gallery-philippines", title: "Philippines", img: "/images/gallery/philippines.jpg" },
    ],
  },
  {
    label: "Hobbies",
    items: [
      { id: "hobby-drums", title: "Drums", img: "/images/hobbies/drums.jpg" },
      { id: "hobby-cycling", title: "Cycling", img: "/images/hobbies/cycling.jpg" },
      { id: "hobby-cooking", title: "Cooking", img: "/images/hobbies/cooking.jpg" },
      { id: "hobby-aviation", title: "Aviation", img: "/images/hobbies/aviation.jpg" },
    ],
  },
];

const CONTACT_CARDS = [
  {
    id: "contact-github",
    title: "GitHub",
    description: "Open my GitHub profile and repositories.",
    url: "https://github.com/lgbncb",
  },
  {
    id: "contact-linkedin",
    title: "LinkedIn",
    description: "Connect with me professionally on LinkedIn.",
    url: "https://www.linkedin.com/in/lance-buncab/",
  },
  {
    id: "contact-ig",
    title: "IG",
    description: "View my Instagram profile.",
    url: "https://www.instagram.com/lg.bncb/",
  },
];

/* ─────────────────────────────────────────────
    HELPERS
───────────────────────────────────────────── */
function useScroll(ref) {
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  return scroll;
}

/* ─────────────────────────────────────────────
    COMPONENTS
───────────────────────────────────────────── */
function CarouselRow({ title, items, onProjectClick, onMediaView }) {
  const ref = useRef(null);
  const scroll = useScroll(ref);
  const isFeatured = title === "Featured Works";
  const isImageRow = title === "Programming" || title === "Gallery" || title === "Hobbies";
  const isViewRow = title === "Gallery" || title === "Hobbies";

  return (
    <div className="mb-10 px-[4%]">
      <h2 className="text-[#e5e5e5] text-xl font-bold mb-4 font-bebas tracking-wider">{title}</h2>
      <div className="relative group">
        <button onClick={() => scroll(-1)} className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 px-2 opacity-0 group-hover:opacity-100 transition">‹</button>
        <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {items.map((item, index) => {
            const itemData = typeof item === "string" ? { title: item } : item;
            const key = itemData.id || `${title}-${index}`;

            return (
            <div key={key} className="flex-shrink-0 w-64 z-0 hover:z-20">
              {(isFeatured || isImageRow) && itemData.img ? (
                <div className="rounded-md overflow-hidden border border-gray-800 bg-[#1b1b1b]">
                <TiltedCard
                  imageSrc={itemData.img}
                  altText={itemData.title}
                  captionText={itemData.title}
                  containerHeight="144px"
                  containerWidth="256px"
                  imageHeight="144px"
                  imageWidth="256px"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={isFeatured}
                  displayOverlayContent
                  onClick={isFeatured ? () => onProjectClick?.(itemData) : undefined}
                  overlayContent={<p className="text-xs font-bold">{itemData.title}</p>}
                />
                {!isFeatured && (
                  <div className="px-3 py-3 border-t border-gray-800">
                    <div className="font-bold text-white text-base leading-tight">{itemData.title}</div>
                    <div className="text-emerald-400 text-[11px] mt-1">{title} · Portfolio · 2026</div>
                    <div className="flex gap-1 mt-2">
                      <span className="text-[10px] bg-[#2a2a2a] px-2 py-0.5 text-gray-300">{title}</span>
                      <span className="text-[10px] bg-[#2a2a2a] px-2 py-0.5 text-gray-300">Creative</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => isViewRow && onMediaView?.({ ...itemData, category: title })}
                        className="bg-white text-black text-xs font-bold px-3 py-1 rounded w-[112px]"
                      >
                        ▶ {isViewRow ? "View" : "Demo"}
                      </button>
                      <button type="button" className="w-7 h-7 rounded-full border border-gray-500 text-xs text-gray-300">↻</button>
                      <button type="button" className="w-7 h-7 rounded-full border border-gray-500 text-xs text-gray-300">◍</button>
                    </div>
                  </div>
                )}
                </div>
              ) : (
                <div className="h-36 bg-gray-800 rounded-md overflow-hidden relative">
                  {itemData.img ? <img src={itemData.img} className="w-full h-full object-cover opacity-80" /> : <div className="w-full h-full flex items-center justify-center bg-[#2a2a2a] text-gray-500">{itemData.title}</div>}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black text-xs font-bold">{itemData.title}</div>
                </div>
              )}
            </div>
            );
          })}
        </div>
        <button onClick={() => scroll(1)} className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 px-2 opacity-0 group-hover:opacity-100 transition">›</button>
      </div>
    </div>
  );
}

function FadeInSection({ children, className = "", delayMs = 0 }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) { 
      console.error("Fetch error:", e); 
      setMessages([]); // Fallback to empty list
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, message: newMessage }),
      });

      if (response.ok) {
        setNewName(""); 
        setNewMessage(""); 
        // Refresh the list immediately after a successful post
        await fetchMessages();
      } else {
        const errData = await response.json();
        console.error("Post error:", errData.message);
      }
    } catch (e) { 
      console.error("Network error:", e); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  if (currentPage === "contact") {
    return (
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
      <div className="bg-[#141414] text-white min-h-screen font-sans selection:bg-[#e50914]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          .font-bebas { font-family: 'Bebas Neue', cursive; }
        `}</style>

        <nav className="fixed top-0 w-full z-50 px-[4%] h-[68px] flex items-center justify-between bg-black/80 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            ← Back to Home
          </button>
          <span className="font-bebas text-3xl text-[#e50914] tracking-widest">CONTACT ME</span>
        </nav>

        <section className="px-[4%] pt-28 pb-20">
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="font-bebas text-6xl md:text-7xl tracking-wider mb-3">Contact Me</h1>
            <p className="text-gray-400">Click a card to open my profile.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ScrollStack>
              {CONTACT_CARDS.map((card) => (
                <ScrollStackItem
                  key={card.id}
                  onClick={() => window.open(card.url, "_blank", "noopener,noreferrer")}
                >
                  <h2 className="font-bebas text-4xl tracking-wider text-[#e50914]">{card.title}</h2>
                  <p className="text-gray-300 mt-2">{card.description}</p>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </section>
      </div>
      </ClickSpark>
    );
  }

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
    <div className="bg-[#141414] text-white min-h-screen font-sans selection:bg-[#e50914]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .font-bebas { font-family: 'Bebas Neue', cursive; }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-[4%] h-[68px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <span className="font-bebas text-3xl text-[#e50914] tracking-widest cursor-pointer">LGMB'S PORTFOLIO</span>
        <div className="hidden md:flex gap-6 text-sm font-medium text-[#e5e5e5]">
          <a href="#hero" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#guestbook" className="hover:text-white transition">Guestbook</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative h-[100vh] flex items-end pb-24 px-[4%] bg-[#141414]">
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        <div className="relative z-20 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#e50914] text-white text-[10px] font-bold px-1 py-0.5 rounded-sm">O</span>
            <span className="text-gray-400 text-xs font-bold tracking-[0.3em] uppercase">Cybersecurity & Forensics</span>
          </div>
          <h1 className="font-bebas text-7xl md:text-9xl leading-[0.85] mb-4 uppercase">LANCE<br/><span className="text-[#e50914]">BUNCAB</span></h1>
          <p className="text-lg text-gray-300 mb-8 max-w-lg">Second-year CS student at Asia Pacific College. </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage("contact")}
              className="bg-white text-black px-8 py-2.5 font-bold flex items-center gap-2 hover:bg-white/80 transition shadow-lg"
            >
              Contact Me
            </button>
            <button className="bg-gray-500/50 text-white px-8 py-2.5 font-bold backdrop-blur-md hover:bg-gray-500/30 transition">ⓘ More Info</button>
          </div>
        </div>
      </section>

      <FadeInSection>
        {/* About Section */}
        <section id="about" className="py-20 px-[4%] bg-[#141414]">
          <div className="max-w-4xl border-l-4 border-[#e50914] pl-8">
            <h2 className="font-bebas text-5xl mb-6">About the <span className="text-[#e50914]">Developer</span></h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              A tech and aviation geek based in Taguig. Pursuing a BS in Computer Science with a specialization in Cybersecurity and Forensics. 
              When not coding, you'll find me at the drum kit or riding through the city in my bike. I love exploring new things and am always up for a challenge. This portfolio is a glimpse into my world of projects, skills, and passions. Thanks for stopping by!
              I love watching Kdrama and Historical documentaries which inspire me to create and learn more about the world. I'm passionate about cybersecurity and hope to make a positive impact in the field. Feel free to reach out or check out my projects below!
              My motto in life is "Stay curious, stay humble, and keep pushing forward." I believe that with hard work and determination, anything is possible. I'm excited to share my journey and projects with you through this portfolio. Let's connect and create something amazing together!
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delayMs={100}>
        {/* Content Rows */}
        <div className="relative z-30 pt-8 md:pt-10">
          <CarouselRow title="Featured Works" items={PROJECTS} onProjectClick={setSelectedProject} />
          {SKILL_ROWS.map(row => <CarouselRow key={row.label} title={row.label} items={row.items} onMediaView={setSelectedMedia} />)}
        </div>
      </FadeInSection>

      {selectedMedia && (
        <div className="fixed inset-0 z-[110] bg-black/85 flex items-center justify-center px-4" onClick={() => setSelectedMedia(null)}>
          <div className="w-full max-w-3xl bg-[#181818] border border-gray-700 rounded-lg p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bebas text-4xl tracking-wide text-white leading-none">{selectedMedia.title}</h3>
                <p className="text-emerald-400 text-xs mt-1">{selectedMedia.category} · Hover image to zoom</p>
              </div>
              <button type="button" className="text-gray-300 hover:text-white" onClick={() => setSelectedMedia(null)}>Close</button>
            </div>
            <div className="rounded-md overflow-hidden border border-gray-700 bg-black">
              <img
                src={selectedMedia.img}
                alt={selectedMedia.title}
                className="w-full h-[52vh] object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center px-4" onClick={() => setSelectedProject(null)}>
          <div className="w-full max-w-lg bg-[#181818] border border-gray-700 rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bebas text-4xl mb-2 text-white tracking-wide">{selectedProject.title}</h3>
            <p className="text-gray-300 mb-5">{selectedProject.desc}</p>
            <div className="flex gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-black px-4 py-2 font-bold rounded hover:bg-gray-200 transition"
              >
                GitHub Repo
              </a>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#e50914] text-white px-4 py-2 font-bold rounded hover:bg-[#b90812] transition"
              >
                Visit
              </a>
              <button
                type="button"
                className="ml-auto text-gray-300 hover:text-white"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <FadeInSection delayMs={150}>
        {/* Guestbook Section */}
        <section id="guestbook" className="py-20 px-[4%] bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bebas text-5xl mb-10 text-center uppercase tracking-widest">Guestbook <span className="text-[#e50914]">Reviews</span></h2>
            <form onSubmit={handleSubmit} className="mb-12 bg-[#181818] p-8 rounded-lg border border-gray-800 shadow-2xl">
              <input 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                className="w-full bg-[#2a2a2a] p-4 mb-4 rounded border border-gray-700 outline-none focus:border-[#e50914] text-white" 
                placeholder="Full Name" 
                required 
              />
              <textarea 
                value={newMessage} 
                onChange={e => setNewMessage(e.target.value)} 
                className="w-full bg-[#2a2a2a] p-4 mb-6 rounded border border-gray-700 outline-none focus:border-[#e50914] text-white h-32 resize-none" 
                placeholder="Leave a review..." 
                required 
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#e50914] py-4 font-bold uppercase tracking-[0.2em] hover:bg-[#b90812] transition disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post Review'}
              </button>
            </form>
            
            {/* Guestbook Review List */}
            <div className="grid gap-4 md:grid-cols-2 max-h-[600px] overflow-y-auto no-scrollbar px-1">
              {messages.length === 0 ? (
                <p className="text-gray-500 italic col-span-2 text-center">No reviews yet. Be the first to post!</p>
              ) : (
                messages.map(m => (
                  <div key={m.id} className="bg-[#181818] p-6 rounded border-l-2 border-[#e50914] hover:bg-[#222] transition shadow-md">
                    <div className="font-bold text-[#e50914] mb-2">{m.name}</div>
                    <div className="text-gray-400 text-sm italic leading-relaxed">"{m.message}"</div>
                    <div className="text-[10px] text-gray-600 mt-4 uppercase">
                      {m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delayMs={200}>
        <footer className="py-12 text-center text-gray-700 text-xs uppercase tracking-[0.3em] border-t border-gray-900">
          LanCe Gabriel M. Buncab · WEBPROG FINALS · 2026
        </footer>
      </FadeInSection>
    </div>
    </ClickSpark>
  );
}