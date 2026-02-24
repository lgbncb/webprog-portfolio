import React, { useState, useEffect } from 'react';

// --- CONFIGURE YOUR URL HERE ---
const API_URL = 'https://webprog-portfolio.onrender.com/api/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName || !newMessage) return;
    setIsSubmitting(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, message: newMessage }),
      });
      setNewName('');
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error posting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a120b] text-white font-sans selection:bg-orange-500 scroll-smooth">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 md:p-10 absolute w-full z-20">
        <div className="text-orange-400 font-extrabold text-4xl tracking-tighter">LB</div>
        <div className="hidden md:flex space-x-10 text-sm font-semibold tracking-wide">
          <a href="#about" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">01.</span> About</a>
          <a href="#skills" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">02.</span> Skills</a>
          <a href="#projects" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">03.</span> Projects</a>
          <a href="#guestbook" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">04.</span> Guestbook</a>
        </div>
        <button className="border border-orange-500 text-orange-400 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-[#1a120b] transition font-medium">Resumé</button>
      </nav>

      {/* Hero */}
      <section id="about" className="relative h-screen flex flex-col justify-center px-8 md:px-24 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(26,18,11,0.7), rgba(26,18,11,0.95)), url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80')" }}>
        <div className="max-w-4xl z-10 mt-16 text-left">
          <p className="text-orange-400 font-mono text-lg mb-5">Hello, I am Lance Gabriel M. Buncab</p>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-2 text-[#f4e4c1] tracking-tight">Lanz Buncab.</h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-8 tracking-tight">I design and code amazing things.</h2>
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
            I'm a second-year Computer Science student specializing in Cybersecurity and Forensics. 
            Currently developing Project L.I.F.E. and contributing to FitLife Gym.
          </p>
          <a href="#projects" className="inline-block border border-orange-500 text-orange-400 px-8 py-4 rounded-md hover:bg-orange-500 hover:text-[#1a120b] font-bold transition text-lg tracking-wide">View Projects →</a>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-8 md:px-24 bg-[#120d08]">
        <div className="max-w-6xl mx-auto text-left">
          <h3 className="text-orange-500 font-mono text-xl mb-8">02. <span className="text-[#f4e4c1] font-bold text-3xl font-sans tracking-wide">Tech Stack</span></h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-gray-400 text-sm font-bold tracking-widest mb-3 uppercase">Languages</h4>
              <div className="flex flex-wrap gap-3 font-bold text-sm">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded">JS JAVASCRIPT</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded">PYTHON</span>
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm font-bold tracking-widest mb-3 uppercase">Backend</h4>
              <div className="flex flex-wrap gap-3 font-bold text-sm">
                <span className="bg-red-600 text-white px-4 py-2 rounded">NESTJS</span>
                <span className="bg-emerald-600 text-white px-4 py-2 rounded">SUPABASE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" className="py-20 px-8 md:px-24 bg-[#1a120b]">
        <div className="max-w-4xl mx-auto text-left">
          <h3 className="text-orange-500 font-mono text-xl mb-8">04. <span className="text-[#f4e4c1] font-bold text-4xl font-sans tracking-wide">Sign My Guestbook</span></h3>
          <div className="bg-[#120d08] p-8 rounded-lg border border-gray-800 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-[#1a120b] border border-gray-700 rounded py-3 px-4 text-white" placeholder="Your Name" required />
              <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full bg-[#1a120b] border border-gray-700 rounded py-3 px-4 text-white h-32" placeholder="Message" required />
              <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-[#1a120b] font-bold py-3 rounded">
                {isSubmitting ? 'Submitting...' : 'Sign Guestbook'}
              </button>
            </form>
          </div>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-[#120d08] border border-gray-800 p-6 rounded-lg">
                <h5 className="text-orange-400 font-bold">{msg.name}</h5>
                <p className="text-gray-300">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#120d08] py-10 text-center border-t border-gray-800">
        <p className="text-gray-600 font-mono text-sm">Designed & Built by Lanz Buncab</p>
      </footer>
    </div>
  );
}

export default App;