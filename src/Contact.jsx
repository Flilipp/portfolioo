export default function Contact() {
  return (
    <section id="contact" className="w-full min-h-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 bg-transparent border-t border-[#C8A96E]/10 relative z-10">

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 font-mono">
          <span className="text-[#C8A96E] text-xs tracking-widest block uppercase mb-2">// INICJACJA POŁĄCZENIA</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Wytnijmy nudę. <span className="text-[#C8A96E]">Zbudujmy coś.</span>
          </h2>

          <form className="space-y-6 font-mono" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">ID / Nazwa</label>
              <input
                type="text"
                className="w-full bg-[#161616] border border-white/5 rounded p-3 text-sm text-white outline-none focus:border-[#C8A96E]/60 transition-colors duration-300"
                placeholder="np. Anonimowy Klient"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Kanał Zwrotny (Email)</label>
              <input
                type="email"
                className="w-full bg-[#161616] border border-white/5 rounded p-3 text-sm text-white outline-none focus:border-[#C8A96E]/60 transition-colors duration-300"
                placeholder="user@domain.com"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Specyfikacja Zadania (Wiadomość)</label>
              <textarea
                rows="4"
                className="w-full bg-[#161616] border border-white/5 rounded p-3 text-sm text-white outline-none focus:border-[#C8A96E]/60 transition-colors duration-300 resize-none"
                placeholder="Opisz czego potrzebujesz..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8A96E] text-[#111111] hover:bg-[#bfa165] font-bold text-xs uppercase tracking-widest py-4 rounded transition-all duration-300 shadow-[0_4px_20px_rgba(200,169,110,0.15)]"
            >
              Wyślij Żądanie
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 font-mono flex flex-col gap-6">
          <div className="border border-white/10 rounded-xl bg-white/[0.02] p-6">
            <span className="text-[10px] text-gray-500 tracking-widest uppercase block mb-4">// kanały bezpośrednie</span>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-300">makeforge@gmail.com</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-gray-500">Lokalizacja</span>
                <span className="text-gray-300">Polska / Zdalnie</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Czas odpowiedzi</span>
                <span className="text-gray-300">do 24h</span>
              </div>
            </div>
          </div>

          <div className="border border-[#C8A96E]/20 rounded-xl bg-[#C8A96E]/[0.03] p-6">
            <span className="flex items-center gap-2 text-[10px] text-[#C8A96E] tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
              status
            </span>
            <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
              Obecnie przyjmujemy nowe projekty. Odpiszemy z konkretnym planem działania i wstępnym wyceną w ciągu jednego dnia roboczego.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto mt-10 pt-5 border-t border-white/5 text-[10px] text-gray-600 flex justify-between font-mono">
        <span>HOST: VAULT_MAIN</span>
        <span>© 2026 FILIP & WIKTOR</span>
      </div>

    </section>
  );
}
