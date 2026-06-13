const stack = [
  'React', 'Node.js', 'Python', 'Tailwind CSS', 'Docker', 'REST API', 'Linux', 'Arduino',
];

export default function Hero() {
  return (
    <section className="w-full min-h-[85vh] md:min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 bg-transparent relative z-10 border-b border-[#C8A96E]/10">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center max-w-7xl w-full mx-auto">
        <div className="lg:col-span-6 font-mono">
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

          {/* Pasek terminala — wypełnia przestrzeń i wzmacnia motyw dev */}
          <div className="mt-8 md:mt-10 border border-white/5 rounded-xl bg-white/[0.02] p-4 font-mono text-[11px] sm:text-xs max-w-xl">
            <p className="text-gray-500">
              <span className="text-[#C8A96E]">$</span> whoami
            </p>
            <p className="text-gray-400 mt-1">→ Duo: full-stack dev + administracja sieci</p>
            <p className="text-gray-500 mt-3">
              <span className="text-[#C8A96E]">$</span> cat status.log
            </p>
            <p className="text-gray-400 mt-1">→ 3 zrealizowane projekty · przyjmujemy nowe zlecenia</p>
          </div>
        </div>

        {/* Panel statusu — wypełnia pustą przestrzeń na desktopie */}
        <div className="hidden lg:block lg:col-span-6">
          <div className="border border-white/10 rounded-xl bg-white/[0.02] p-8 font-mono">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-gray-500 tracking-widest uppercase">// system_status</span>
              <span className="flex items-center gap-2 text-xs text-[#C8A96E] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
                online
              </span>
            </div>

            <div className="space-y-3 text-base">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500">Zespół</span>
                <span className="text-gray-300">Filip & Wiktor</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500">Specjalizacja</span>
                <span className="text-gray-300">Web & Sieci</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500">Dostępność</span>
                <span className="text-gray-300">Nowe projekty</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">Lokalizacja</span>
                <span className="text-gray-300">Polska / Zdalnie</span>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-[10px] text-gray-500 tracking-widest uppercase block mb-2">// stack</span>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((t) => (
                  <span key={t} className="bg-white/[0.03] border border-white/10 text-[11px] text-gray-300 px-2.5 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-6">
              <div className="text-center">
                <p className="text-2xl font-black text-[#C8A96E]">3+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Projekty</p>
              </div>
              <div className="text-center border-x border-white/5">
                <p className="text-2xl font-black text-[#C8A96E]">24h</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Odpowiedź</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-[#C8A96E]">100%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Zaangażowanie</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
