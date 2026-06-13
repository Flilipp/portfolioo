const steps = [
  {
    id: '01',
    title: 'Brief',
    cmd: 'init --project',
    desc: 'Rozmawiamy o celach, odbiorcach i ograniczeniach. Spisujemy zakres i priorytety, żeby uniknąć niedomówień.',
  },
  {
    id: '02',
    title: 'Design',
    cmd: 'design --layout --ux',
    desc: 'Projektujemy układ i przepływ użytkownika, dopasowując estetykę do marki. Konsultujemy makiety przed kodowaniem.',
  },
  {
    id: '03',
    title: 'Build',
    cmd: 'build --frontend --backend',
    desc: 'Piszemy kod: frontend, backend, integracje i automatyzacje. Regularne podglądy postępu na żywo.',
  },
  {
    id: '04',
    title: 'Deploy',
    cmd: 'deploy --production',
    desc: 'Wdrażamy na serwer, konfigurujemy środowisko i monitoring. Wsparcie po starcie projektu.',
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 bg-transparent border-b border-[#C8A96E]/10 relative z-10">
      <div className="max-w-6xl w-full mx-auto">
        <span className="text-[#C8A96E] text-xs tracking-widest block uppercase mb-2 font-mono">// JAK PRACUJEMY</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-10 font-mono">
          Proces <span className="text-[#C8A96E]">krok po kroku</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="relative border border-white/10 rounded-xl bg-white/[0.02] p-5 font-mono flex flex-col gap-3 hover:border-[#C8A96E]/30 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#C8A96E]/30">{step.id}</span>
                {i < steps.length - 1 && (
                  <span className="hidden lg:inline text-gray-600 text-xl">→</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">{step.title}</h3>
              <p className="text-[11px] text-gray-500">
                <span className="text-[#C8A96E]">$</span> {step.cmd}
              </p>
              <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
