import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-[#1a120b] text-white font-sans selection:bg-orange-500">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 md:p-10 absolute w-full z-20">
        {/* Logo Placeholder */}
        <div className="text-orange-400 font-extrabold text-4xl tracking-tighter">LB</div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10 text-sm font-semibold tracking-wide">
          <a href="#about" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">01.</span> About</a>
          <a href="#skills" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">02.</span> Skills</a>
          <a href="#projects" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">03.</span> Projects</a>
          <a href="#guestbook" className="hover:text-orange-400 transition"><span className="text-orange-500 mr-1">04.</span> Guestbook</a>
        </div>
        
        {/* Resume Button */}
        <button className="border border-orange-500 text-orange-400 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-[#1a120b] transition font-medium">
          Resumé
        </button>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex flex-col justify-center px-8 md:px-24 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(26,18,11,0.7), rgba(26,18,11,0.95)), url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80')" 
        }}
      >
        <div className="max-w-4xl z-10 mt-16">
          <p className="text-orange-400 font-mono text-lg mb-5">Hello, I am</p>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-2 text-[#f4e4c1] tracking-tight">
            Lanz Buncab.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-8 tracking-tight">
            I design and code amazing things.
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
            I'm a second-year Computer Science student specializing in Cybersecurity and Forensics. 
            I have a passion for the creative process, exploring the possibilities of web development, 
            and building secure, innovative solutions from the ground up.
          </p>
          <a href="#projects" className="inline-block border border-orange-500 text-orange-400 px-8 py-4 rounded-md hover:bg-orange-500 hover:text-[#1a120b] font-bold transition text-lg tracking-wide">
            View Projects →
          </a>
        </div>
      </section>
      
      {/* We will add the Skills, Projects, and Guestbook sections here next */}
      
    </div>
  );
}

export default App;