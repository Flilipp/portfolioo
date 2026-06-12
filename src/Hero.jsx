import React from 'react';

export default function Hero() {
  return (
    <section className="w-full min-h-[85vh] md:min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 bg-transparent relative z-10 border-b border-[#C8A96E]/10">
      
      <div className="max-w-4xl font-mono">
        {/* Mały token techniczny w kolorze złota */}
        <div className="text-[#C8A96E] text-xs tracking-widest mb-4 uppercase animate-pulse">
          // DEV_CORE_INSTANCE_LOADED
        </div>

        {/* Główne nagłówki */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">
          FILIP & <span className="text-[#C8A96E]">WIKTOR</span>
        </h1>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-400 mt-4 tracking-tight">
          FULL-STACK DEVELOPERS & NETWORK ADMINISTRATORS
        </h2>

        <p className="font-sans font-light text-gray-500 text-base md:text-lg max-w-2xl mt-4 md:mt-5 leading-relaxed">
          Zamiast generycznych szablonów, budujemy surowe, wydajne i skrojone pod wymiar aplikacje webowe. 
          Łączymy zaawansowaną logikę backendową z precyzyjnym frontendem i pełną automatyzacją środowisk sieciowych.
        </p>

        {/* Surowy, minimalistyczny przycisk z obramowaniem w kolorze Gold */}
        <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
          <a 
            href="#projects" 
            className="border border-[#C8A96E] text-[#C8A96E] bg-[#C8A96E]/5 hover:bg-[#C8A96E]/20 text-xs tracking-widest uppercase px-6 py-3 rounded-md transition-all duration-300 font-bold"
          >
            Eksploruj Projekty
          </a>
          <a 
            href="#contact" 
            className="border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-xs tracking-widest uppercase px-6 py-3 rounded-md transition-all duration-300"
          >
            Inicjuj Kontakt
          </a>
        </div>
      </div>

    </section>
  );
}