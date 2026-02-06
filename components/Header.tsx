
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2 group">
            <span className="text-primary group-hover:drop-shadow-[0_0_8px_#00f2ff] transition-all">GAME</span>
            <span className="text-secondary group-hover:drop-shadow-[0_0_8px_#7000ff] transition-all">TECH</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest">Notícias</Link>
            <Link to="/ofertas" className="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest">Ofertas</Link>
            <Link to="/review/logitech-g502" className="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest">Reviews</Link>
            <Link to="/" className="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest">Guias</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Pesquisar hardware..."
              className="w-64 bg-slate-100 dark:bg-white/5 border-none rounded-full py-2 px-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          </div>

          <button className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors">person</button>
          <button className="bg-primary text-background-dark font-extrabold px-4 py-2 rounded text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
            Inscrever-se
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
