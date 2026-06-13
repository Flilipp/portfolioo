export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C8A96E]/10 bg-[#111111]/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 h-16 flex items-center justify-between font-mono">
        <a href="#" className="text-sm font-black uppercase tracking-widest text-white">
          FILIP<span className="text-[#C8A96E]">&</span>WIKTOR
        </a>

        <div className="hidden sm:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-400">
          <a href="#projects" className="hover:text-[#C8A96E] transition-colors duration-300">
            Projekty
          </a>
          <a href="#contact" className="hover:text-[#C8A96E] transition-colors duration-300">
            Kontakt
          </a>
        </div>

        <a
          href="#contact"
          className="flex items-center gap-2 border border-[#C8A96E]/30 text-[#C8A96E] text-[10px] uppercase tracking-widest px-4 py-2 rounded hover:bg-[#C8A96E]/10 transition-colors duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
          Online
        </a>
      </nav>
    </header>
  );
}
