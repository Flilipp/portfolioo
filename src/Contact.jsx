import React from 'react';

export default function Contact() {
  return (
    // FIX: Dodane id="contact" dla poprawnego działania kotwicy HTML
    <section id="contact" className="w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 bg-transparent border-t border-[#C8A96E]/10 relative z-10">
      
      <div className="max-w-xl w-full font-mono mx-auto lg:mx-0">
        <span className="text-[#C8A96E] text-xs tracking-widest block uppercase mb-2">// INICJACJA POŁĄCZENIA</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-8">
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

        <div className="mt-12 pt-6 border-t border-white/5 text-[10px] text-gray-600 flex justify-between">
          <span>HOST: VAULT_MAIN</span>
          <span>© 2026 FILIP & WIKTOR</span>
        </div>
      </div>

    </section>
  );
}