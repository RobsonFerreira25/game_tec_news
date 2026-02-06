import React, { useEffect, useState } from 'react';
import dealsData from '../data/deals.json';
import ImageWithCredit from '../components/ImageWithCredit';

const DealsView: React.FC = () => {
    const [deals, setDeals] = useState<any[]>([]);
    const [filter, setFilter] = useState('Todos');

    useEffect(() => {
        setDeals(dealsData);
        window.scrollTo(0, 0);
    }, []);

    const categories = ['Todos', ...new Set(deals.map(d => d.category))];
    const filteredDeals = filter === 'Todos' ? deals : deals.filter(d => d.category === filter);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <header className="mb-8 md:mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 md:w-2 h-8 md:h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]"></span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight uppercase">
                        Ofertas e Descontos
                    </h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base md:text-lg">
                    Acompanhe as melhores promoções de hardware, games e periféricos selecionadas pela nossa redação.
                </p>
            </header>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-8 md:mb-12 overflow-x-auto pb-4 md:pb-0 whitespace-nowrap scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                            ? 'bg-primary text-background-dark shadow-lg scale-105'
                            : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDeals.map((deal) => (
                    <div key={deal.id} className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl group hover:border-primary/30 transition-all flex flex-col">
                        <div className="relative aspect-video overflow-hidden bg-slate-900 flex items-center justify-center">
                            <ImageWithCredit
                                src={deal.image}
                                alt={deal.title}
                                credit={deal.imgCredit}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80";
                                }}
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="bg-primary text-background-dark text-[10px] font-black px-3 py-1 rounded shadow-lg uppercase tracking-widest">
                                    {deal.badge}
                                </span>
                                <span className="bg-secondary text-white text-[10px] font-black px-3 py-1 rounded shadow-lg uppercase tracking-widest">
                                    {deal.discount}
                                </span>
                            </div>
                            <div className={`absolute bottom-4 right-4 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest border border-white/10 ${deal.store === 'Amazon' ? 'bg-[#ff9900]/80' :
                                deal.store === 'Shopee' ? 'bg-[#ee4d2d]/80' :
                                    'bg-[#fff159]/80 text-[#333]'
                                }`}>
                                {deal.store}
                            </div>
                        </div>

                        <div className="p-6 flex-grow flex flex-col border-t border-slate-100 dark:border-white/5">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">{deal.category}</span>
                            <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {deal.title}
                            </h3>

                            <div className="mt-auto">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-slate-400 line-through text-sm">R$ {deal.originalPrice}</span>
                                    <span className="text-3xl font-display font-bold text-slate-900 dark:text-white">R$ {deal.price}</span>
                                </div>

                                <a
                                    href={deal.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-primary text-background-dark font-black py-4 rounded-xl uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
                                >
                                    Ir para a Loja
                                    <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">shopping_cart</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DealsView;
