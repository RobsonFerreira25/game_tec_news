
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Notícias', path: '/' },
    { name: 'Ofertas', path: '/ofertas' },
    { name: 'Reviews', path: '/review/logitech-g502' },
    { name: 'Guias', path: '/' },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden material-symbols-outlined text-slate-500 hover:text-primary transition-colors p-1"
          >
            {isMobileMenuOpen ? 'close' : 'menu'}
          </button>

          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-2 group shrink-0">
            <span className="text-primary group-hover:drop-shadow-[0_0_8px_#00f2ff] transition-all">GAME</span>
            <span className="text-secondary group-hover:drop-shadow-[0_0_8px_#7000ff] transition-all">TECH</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Pesquisar hardware..."
              className="w-64 bg-slate-100 dark:bg-white/5 border-none rounded-full py-2 px-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          </div>

          <button className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors p-1">person</button>
          <button className="hidden sm:block bg-primary text-background-dark font-extrabold px-3 md:px-4 py-2 rounded text-[9px] md:text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
            Inscrever-se
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-background-dark/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <nav className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-card-dark shadow-2xl transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="font-display text-2xl font-bold tracking-tighter">
              <span className="text-primary">GAME</span><span className="text-secondary">TECH</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="material-symbols-outlined text-slate-500">close</button>
          </div>

          <div className="p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-black uppercase tracking-widest hover:text-primary transition-all py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto p-6 border-t border-slate-200 dark:border-white/10 space-y-4">
            <button className="w-full bg-primary text-background-dark font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg">
              Inscrever-se
            </button>
            <div className="flex justify-center gap-6 text-slate-400">
              <span className="material-symbols-outlined">rss_feed</span>
              <span className="material-symbols-outlined">alternate_email</span>
              <span className="material-symbols-outlined">smart_display</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
