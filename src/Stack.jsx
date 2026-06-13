const categories = [
  {
    label: 'Frontend',
    cmd: 'ls ./frontend',
    items: ['React', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Vite', 'JavaScript / TypeScript'],
  },
  {
    label: 'Backend',
    cmd: 'ls ./backend',
    items: ['Node.js', 'Python', 'REST API', 'Express', 'SQL / NoSQL', 'Bash'],
  },
  {
    label: 'Sieci & DevOps',
    cmd: 'ls ./devops',
    items: ['Linux', 'Docker', 'Git', 'Konfiguracja sieci', 'Nginx', 'CI/CD'],
  },
  {
    label: 'Hardware & inne',
    cmd: 'ls ./extra',
    items: ['Arduino', 'Raspberry Pi', 'Automatyzacja', 'IoT', 'Mapy / Geolokalizacja'],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="w-full px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 bg-transparent border-b border-[#C8A96E]/10 relative z-10">
      <div className="max-w-6xl w-full mx-auto">
        <span className="text-[#C8A96E] text-xs tracking-widest block uppercase mb-2 font-mono">// STACK & UMIEJĘTNOŚCI</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-10 font-mono">
          Narzędzia, <span className="text-[#C8A96E]">którymi pracujemy</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="border border-white/10 rounded-xl bg-white/[0.02] p-5 font-mono hover:border-[#C8A96E]/30 transition-colors duration-300"
            >
              <p className="text-[11px] text-gray-500 mb-1">
                <span className="text-[#C8A96E]">$</span> {cat.cmd}
              </p>
              <h3 className="text-base font-bold text-white uppercase tracking-tight mb-4">{cat.label}</h3>
              <div className="flex flex-col gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-gray-400 font-sans font-light">
                    <span className="text-[#C8A96E] text-xs">▸</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
