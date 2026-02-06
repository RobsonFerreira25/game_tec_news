
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import newsData from '../data/news.json';

const HomeView: React.FC = () => {
  const { featured, latest, mini } = newsData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Featured News */}
      <section className="mb-8 md:mb-12 relative group overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-video lg:aspect-[21/9] bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <img
            alt={featured.title}
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            src={featured.image}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://fwmedia.fandomwire.com/wp-content/uploads/2023/09/20044115/20230920_094021_0000.png?width=1600&height=900&fit=crop&format=auto&quality=70";
              (e.target as HTMLImageElement).onerror = null;
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4">
          <span className="bg-primary text-background-dark px-3 py-1 rounded-sm text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">{featured.label}</span>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold leading-tight mb-4 uppercase tracking-tighter">
            {featured.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-lg mb-6 line-clamp-2 max-w-2xl font-medium">
            {featured.description}
          </p>
          <div className="flex items-center gap-4">
            <Link to={`/noticia/${featured.slug}`} className="bg-primary text-background-dark font-black px-6 md:px-8 py-2.5 md:py-3 rounded uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg">
              Ler Matéria <span className="material-symbols-outlined text-xs md:text-sm font-bold">trending_flat</span>
            </Link>
            <span className="text-slate-400 text-[10px] md:text-xs font-bold flex items-center gap-1 uppercase tracking-widest whitespace-nowrap">
              <span className="material-symbols-outlined text-xs md:text-sm">schedule</span> {featured.time}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          {/* Main News Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span> Últimas Notícias
              </h2>
              <Link to="/" className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                Ver Tudo <span className="material-symbols-outlined text-[16px]">add</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latest.map((news: any, i: number) => (
                <Link to={`/noticia/${news.slug || news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={i} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden group hover:border-primary/30 transition-all shadow-sm">
                  <div className="relative aspect-video overflow-hidden bg-slate-800">
                    <img
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={news.img}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ovicio.com.br/wp-content/uploads/2026/02/20260203-nioh-3-screenshot-kunimatsu-2-1536x864.jpg`;
                        (e.target as HTMLImageElement).onerror = null;
                      }}
                    />
                    <span className={`absolute top-4 left-4 ${news.color || 'bg-primary'} text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-widest`}>
                      {news.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{news.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {news.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                      <span>Por {news.author}</span>
                      <span>{news.comments} Comentários</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {mini.map((item: any, i: number) => (
                <Link to={`/noticia/${item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10 group cursor-pointer">
                  <div className="flex-shrink-0 w-32 h-20 bg-slate-800 rounded overflow-hidden shadow-md">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      src={item.img}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80";
                        (e.target as HTMLImageElement).onerror = null;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors leading-snug">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Ad Space */}
          <div className="w-full h-32 bg-slate-100 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 rounded-xl flex flex-col items-center justify-center text-slate-400 shadow-inner">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] mb-1 opacity-50">Publicidade Patrocinada</span>
            <div className="font-display text-xl font-bold opacity-30">ESPAÇO PARA ANÚNCIO 728x90</div>
          </div>

          {/* PC Gamer Section */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-2xl border border-primary/20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary text-6xl md:text-7xl opacity-10">hardware</span>
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-tight">PC Gamer do Mês</h2>
              <p className="text-slate-400 text-sm md:text-base mb-8 max-w-lg font-medium">Nosso setup \"Mestre do Custo-Benefício\" otimizado para 1440p em altas taxas de quadros. Custo total: <span className="text-primary font-bold">R$ 6.250</span></p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: 'computer', name: 'AMD Ryzen 7 7800X3D' },
                  { icon: 'videogame_asset', name: 'RTX 4070 Super 12GB' },
                  { icon: 'memory', name: '32GB DDR5 6000MHz' },
                  { icon: 'storage', name: '2TB Gen4 NVMe SSD' }
                ].map((comp, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary transition-colors">{comp.icon}</span>
                      <span className="text-xs font-medium text-slate-200">{comp.name}</span>
                    </div>
                    <a href="#" className="text-[9px] font-black text-primary hover:underline uppercase tracking-widest">Ver Preço</a>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full bg-primary text-background-dark font-black py-4 rounded uppercase tracking-[0.2em] text-[10px] md:text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg">
                Ver Lista Completa de Componentes
              </button>
            </div>
          </section>
        </div>

        <Sidebar />
      </div>
    </div>
  );
};

export default HomeView;
