
import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithCredit from '../components/ImageWithCredit';
import CommentsSection from '../components/CommentsSection';

const ReviewView: React.FC = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 md:mb-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
                <Link to="/" className="hover:text-primary transition-colors">Reviews</Link>
                <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
                <span className="text-slate-900 dark:text-white">Mouses Gamer</span>
            </nav>

            <div className="mb-8 md:mb-10">
                <h1 className="text-2xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-tight uppercase">
                    Logitech G502 Hero: O Rei da Produtividade ainda vale a pena em 2024?
                </h1>
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base md:text-[18px]">calendar_today</span> 15 de Maio, 2024</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base md:text-[18px]">person</span> Por João Tech</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base md:text-[18px]">timer</span> 8 min de leitura</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-10 md:space-y-12">
                    {/* Verdict Card */}
                    <div className="bg-white dark:bg-[#1a2b34] rounded-2xl border border-slate-200 dark:border-white/5 p-6 md:p-8 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-primary/20 text-primary px-4 md:px-6 py-1 md:py-1.5 rounded-bl-2xl text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">Editor's Choice</div>
                        <div className="flex flex-col gap-6 md:gap-8 items-center md:items-center md:flex-row">
                            <div className="relative flex-shrink-0">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border-4 border-primary shadow-[0_0_15px_rgba(0,242,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] transition-all">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-primary">9.5</span>
                                </div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-background-dark px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">Veredito</div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-display font-bold mb-3 flex items-center justify-center md:justify-start gap-2 uppercase tracking-tight">
                                    <span className="material-symbols-outlined text-primary font-bold">verified</span>
                                    Selo Gametech: Recomendado
                                </h3>
                                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                    O G502 Hero continua sendo a referência absoluta em ergonomia e versatilidade. Com o sensor HERO 25K, ele entrega precisão cirúrgica tanto para shooters quanto para workflows pesados de edição.
                                </p>
                            </div>
                            <div className="w-full md:w-auto">
                                <button className="w-full md:w-auto bg-[#ff9900] hover:bg-[#e68a00] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95">
                                    <span className="material-symbols-outlined text-[18px] md:text-[20px]">shopping_cart</span>
                                    Ver na Amazon
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Price Comparison */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-display font-bold mb-6 flex items-center gap-3 uppercase tracking-tight">
                            <span className="material-symbols-outlined text-primary font-bold">local_offer</span>
                            Melhor Preço
                        </h2>
                        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <table className="w-full text-left bg-white dark:bg-[#1a2b34] min-w-[600px]">
                                <thead className="bg-slate-50 dark:bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-400">
                                    <tr>
                                        <th className="px-6 py-5">Loja</th>
                                        <th className="px-6 py-5">Preço</th>
                                        <th className="px-6 py-5">Disponibilidade</th>
                                        <th className="px-6 py-5 text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                                        <td className="px-6 py-5 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-black border border-slate-200">AMZ</div>
                                            <span className="font-bold text-sm">Amazon Brasil</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xl font-black text-primary italic">R$ 289,90</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                                <span className="material-symbols-outlined text-sm">check_circle</span> Em Estoque
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="bg-primary text-background-dark text-[10px] font-black px-6 py-2.5 rounded-lg uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md">Ir para Loja</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Pros & Cons */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-2xl bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 shadow-sm">
                            <h3 className="text-green-600 dark:text-green-400 font-display font-bold text-lg mb-6 flex items-center gap-3 uppercase tracking-wider">
                                <span className="material-symbols-outlined font-bold">thumb_up</span> Prós
                            </h3>
                            <ul className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-green-500 text-[18px] font-bold">check</span> Sensor HERO 25K de alta precisão</li>
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-green-500 text-[18px] font-bold">check</span> 11 botões totalmente programáveis</li>
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-green-500 text-[18px] font-bold">check</span> Scroll infinito (Dual-mode)</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-2xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 shadow-sm">
                            <h3 className="text-red-600 dark:text-red-400 font-display font-bold text-lg mb-6 flex items-center gap-3 uppercase tracking-wider">
                                <span className="material-symbols-outlined font-bold">thumb_down</span> Contras
                            </h3>
                            <ul className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-red-500 text-[18px] font-bold">close</span> Cabo de borracha um pouco rígido</li>
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-red-500 text-[18px] font-bold">close</span> Peso base elevado (121g)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Technical Article */}
                    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                        <h2 className="text-3xl font-display font-bold border-l-4 border-primary pl-6 uppercase tracking-tight">Desempenho e Tecnologia</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                            O coração do G502 Hero é o seu sensor proprietário HERO 25K. Em nossos testes em jogos competitivos como CS2 e Valorant, a resposta foi impecável. Não há aceleração de hardware ou smoothing perceptível em qualquer DPI abaixo de 10.000.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                            <div className="rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer">
                                <ImageWithCredit
                                    src="https://picsum.photos/id/101/600/400"
                                    alt="Mouse test"
                                    credit="Logitech / Divulgação"
                                    className="w-full aspect-video object-cover group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <span className="text-white text-xs font-black uppercase tracking-widest">Flick Shot Test - 800 DPI</span>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer">
                                <ImageWithCredit
                                    src="https://picsum.photos/id/102/600/400"
                                    alt="Scroll test"
                                    credit="Logitech / Divulgação"
                                    className="w-full aspect-video object-cover group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <span className="text-white text-xs font-black uppercase tracking-widest">Infinite Scroll Detail</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Products */}
                    <section>
                        <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight">Mouses Relacionados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { name: 'Logitech G Pro Wireless', price: 'R$ 549', img: 'https://picsum.photos/id/103/300/300' },
                                { name: 'Razer Basilisk V3', price: 'R$ 389', img: 'https://picsum.photos/id/104/300/300' },
                                { name: 'SteelSeries Rival 3', price: 'R$ 199', img: 'https://picsum.photos/id/105/300/300' }
                            ].map((p, i) => (
                                <div key={i} className="bg-white dark:bg-[#1a2b34] rounded-2xl border border-slate-200 dark:border-white/5 p-6 hover:border-primary/50 transition-all group cursor-pointer shadow-sm">
                                    <div className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-900 mb-6 overflow-hidden flex items-center justify-center p-4">
                                        <ImageWithCredit
                                            src={p.img}
                                            alt={p.name}
                                            credit="Divulgação"
                                            className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
                                        />
                                    </div>
                                    <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{p.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-black text-slate-900 dark:text-white">{p.price}</span>
                                        <span className="material-symbols-outlined text-primary font-bold">arrow_forward</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Comments Section */}
                    <CommentsSection articleSlug="review-logitech-g502-hero" />
                </div>

                {/* Sidebar Review Page */}
                <aside className="lg:col-span-4">
                    <div className="sticky top-24 space-y-8">
                        {/* Tech Specs */}
                        <div className="bg-white dark:bg-[#1a2b34] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                            <div className="bg-slate-50 dark:bg-white/5 p-5 font-display font-bold border-b border-slate-200 dark:border-white/5 flex items-center gap-3 uppercase tracking-wider">
                                <span className="material-symbols-outlined text-primary font-bold">settings_input_component</span>
                                Especificações Técnicas
                            </div>
                            <div className="p-6 space-y-5">
                                {[
                                    { label: 'Sensor', val: 'HERO 25K' },
                                    { label: 'DPI', val: '100 - 25.600' },
                                    { label: 'Botões', val: '11 Programáveis' },
                                    { label: 'Peso', val: '121g (+18g opt)' },
                                    { label: 'Polling Rate', val: '1000Hz (1ms)' }
                                ].map((spec, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                                        <span className="text-slate-500">{spec.label}</span>
                                        <span className="text-slate-900 dark:text-white">{spec.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-primary rounded-2xl p-8 text-background-dark shadow-2xl relative overflow-hidden group">
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-2xl font-display font-bold mb-3 uppercase tracking-tight leading-none">Fique por dentro!</h3>
                            <p className="text-xs font-black mb-6 opacity-70 uppercase tracking-widest leading-relaxed">As melhores promoções de periféricos direto no seu e-mail.</p>
                            <input className="w-full bg-white/20 border-transparent rounded-xl py-3.5 px-5 text-sm font-bold placeholder:text-background-dark/50 mb-4 focus:ring-0 outline-none" placeholder="Seu melhor e-mail" />
                            <button className="w-full bg-background-dark text-white font-black py-4 rounded-xl text-[10px] hover:brightness-125 active:scale-95 transition-all uppercase tracking-[0.2em] shadow-xl">Quero participar</button>
                        </div>

                        {/* Special Promo */}
                        <div className="rounded-2xl overflow-hidden relative aspect-[3/4] group cursor-pointer shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10 p-8 flex flex-col justify-end">
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 drop-shadow-lg">Oferta Relâmpago</span>
                                <h4 className="text-white text-2xl font-display font-bold mb-6 uppercase tracking-tight drop-shadow-lg">Mouse Gamer G502 com 40% OFF</h4>
                                <button className="bg-primary text-background-dark font-black py-4 rounded-xl text-[10px] w-full uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl">Aproveitar agora</button>
                            </div>
                            <ImageWithCredit
                                src="https://picsum.photos/id/107/400/600"
                                alt="Promo"
                                credit="Promo / Divulgação"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ReviewView;
