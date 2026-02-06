
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-card-dark border-t border-slate-200 dark:border-white/10 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2 mb-6">
              <span className="text-primary">GAME</span><span className="text-secondary">TECH</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              O destino definitivo para gamers e entusiastas de tecnologia. Fornecemos análises profundas de hardware, as últimas notícias da indústria e ofertas diárias imbatíveis.
            </p>
            <div className="flex gap-4">
              {['rss_feed', 'alternate_email', 'smart_display'].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:text-primary hover:bg-primary/10 transition-all">
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider mb-6 text-slate-900 dark:text-white">Categorias</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Notícias</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Promoções</Link></li>
              <li><Link to="/review/logitech-g502" className="hover:text-primary transition-colors">Reviews</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Guias</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider mb-6 text-slate-900 dark:text-white">Suporte</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Divulgação de Afiliados</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política Editorial</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider mb-6 text-slate-900 dark:text-white">Tags Populares</h4>
            <div className="flex flex-wrap gap-2">
              {['#RTX5090', '#PS5Pro', '#SteamDeck', '#Zen5', '#OLED'].map(tag => (
                <a key={tag} href="#" className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded text-[10px] font-bold uppercase hover:bg-primary/20 hover:text-primary transition-all border border-transparent hover:border-primary/30">
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/10 text-center text-slate-500 text-[10px] uppercase tracking-widest font-semibold">
          © {new Date().getFullYear()} GAMETECH MEDIA GROUP. TODOS OS DIREITOS RESERVADOS. COMO ASSOCIADO, GANHAMOS COM COMPRAS QUALIFICADAS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
