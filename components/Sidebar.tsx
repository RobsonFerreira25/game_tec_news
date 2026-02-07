import React from 'react';
import { Link } from 'react-router-dom';
import dealsData from '../data/deals.json';
import ImageWithCredit from './ImageWithCredit';

const Sidebar: React.FC = () => {
    const hotDeals = dealsData.slice(0, 2);

    return (
        <aside className="lg:col-span-4 space-y-8">
            {/* Hot Deals */}
            <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-xl uppercase tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent-orange fill-current">local_fire_department</span> Ofertas Quentes
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] font-black text-accent-orange bg-accent-orange/10 px-2 py-1 rounded border border-accent-orange/20 animate-pulse uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[12px] font-bold">timer</span> 02:45:12
                    </div>
                </div>

                <div className="space-y-6">
                    {hotDeals.map((item, i) => (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" key={i} className="flex gap-4 group cursor-pointer">
                            <div className="w-20 h-20 flex-shrink-0 bg-slate-50 dark:bg-white/5 rounded-lg overflow-hidden border border-slate-100 dark:border-white/5 p-1 relative">
                                <ImageWithCredit
                                    src={item.image}
                                    alt={item.title}
                                    credit={item.imgCredit}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=100&q=80";
                                    }}
                                />
                            </div>
                            <div className="flex-grow">
                                <span className="text-[9px] font-black bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-sm border border-green-500/20 uppercase tracking-widest">{item.discount}</span>
                                <h4 className="text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors mt-1">{item.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg font-black text-primary">R$ {item.price}</span>
                                    <span className="text-[10px] text-slate-500 line-through font-bold">R$ {item.originalPrice}</span>
                                </div>
                                <button className="mt-2 w-full text-[10px] font-black uppercase py-2 border border-primary text-primary hover:bg-primary hover:text-background-dark transition-all rounded tracking-[0.1em]">
                                    Ver na {item.store}
                                </button>
                            </div>
                        </a>
                    ))}
                </div>
                <Link to="/ofertas" className="mt-6 block text-center text-[10px] font-black uppercase text-primary hover:underline tracking-widest">
                    Ver Todas as Ofertas →
                </Link>
            </section>

            {/* Recommended For You */}
            <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary fill-current">auto_awesome</span> Para Você
                </h3>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5">
                    <ImageWithCredit
                        src="https://picsum.photos/id/30/400/250"
                        alt="Monitor Review"
                        credit="Divulgação"
                        className="w-full rounded-lg mb-4 shadow-lg group-hover:scale-105 transition-all"
                    />
                    <h4 className="font-bold text-base mb-2">Alienware AW3423DW QD-OLED</h4>
                    <div className="flex items-center gap-1 text-yellow-500 mb-4">
                        {[1, 2, 3, 4].map(s => <span key={s} className="material-symbols-outlined text-sm font-bold fill-current">star</span>)}
                        <span className="material-symbols-outlined text-sm font-bold">star_half</span>
                        <span className="text-[10px] text-slate-400 font-bold ml-1 tracking-widest">(4.8/5)</span>
                    </div>
                    <Link to="/review/alienware" className="w-full bg-secondary text-white font-black py-2.5 rounded uppercase text-[10px] tracking-widest hover:brightness-110 active:scale-95 transition-all block text-center shadow-lg">
                        Ler Review Completo
                    </Link>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-primary p-8 rounded-2xl text-background-dark text-center shadow-2xl relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-background-dark/5 rounded-full blur-2xl"></div>
                <span className="material-symbols-outlined text-5xl mb-4 font-bold">mail</span>
                <h3 className="font-display font-bold text-3xl uppercase tracking-tighter mb-2 leading-none">Participe do Daily Loot</h3>
                <p className="text-xs font-bold mb-6 opacity-80 uppercase tracking-widest leading-relaxed">As melhores ofertas de tecnologia no seu e-mail todas as manhãs às 9h.</p>
                <form className="space-y-3">
                    <input
                        type="email"
                        placeholder="Seu melhor e-mail..."
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border-transparent placeholder:text-background-dark/50 text-sm font-bold focus:ring-2 focus:ring-background-dark focus:bg-white transition-all outline-none"
                    />
                    <button className="w-full bg-background-dark text-primary font-black py-3.5 rounded-lg uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                        Garantir Ofertas
                    </button>
                </form>
                <p className="text-[9px] mt-6 font-black opacity-50 uppercase tracking-widest">Sem spam. Apenas hardware com alto FPS. Cancele quando quiser.</p>
            </section>

            {/* Ranking */}
            <section>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary fill-current">leaderboard</span> Melhores GPUs
                </h3>
                <div className="space-y-1">
                    {[
                        { rank: '01', name: 'NVIDIA RTX 4090', score: '9.8' },
                        { rank: '02', name: 'AMD Radeon RX 7900 XTX', score: '9.5' },
                        { rank: '03', name: 'NVIDIA RTX 4080 Super', score: '9.3' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-white dark:hover:bg-white/5 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-white/10 cursor-pointer">
                            <span className="text-xs font-black text-slate-400 group-hover:text-primary transition-colors">{item.rank}</span>
                            <span className="text-sm flex-grow ml-4 font-bold uppercase tracking-tight">{item.name}</span>
                            <span className="text-primary font-black text-sm">{item.score}</span>
                        </div>
                    ))}
                </div>
            </section>
        </aside>
    );
};

export default Sidebar;
