import React, { useState } from 'react';

interface ComponentItem {
    icon: string;
    name: string;
    searchQuery: string;
    category?: string;
}

const PCBuildShowcase: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buildComponents: ComponentItem[] = [
        { icon: 'computer', name: 'AMD Ryzen 7 7800X3D', searchQuery: 'AMD Ryzen 7 7800X3D', category: 'Processador' },
        { icon: 'videogame_asset', name: 'RTX 4070 Super 12GB', searchQuery: 'RTX 4070 Super 12GB', category: 'Placa de Vídeo' },
        { icon: 'memory', name: '32GB DDR5 6000MHz', searchQuery: '32GB DDR5 6000MHz', category: 'Memória RAM' },
        { icon: 'storage', name: '2TB Gen4 NVMe SSD', searchQuery: '2TB Gen4 NVMe SSD', category: 'Armazenamento' }
    ];

    const fullBuildList: ComponentItem[] = [
        ...buildComponents,
        { icon: 'developer_board', name: 'B650M Wi-Fi DDR5', searchQuery: 'Placa Mãe B650M DDR5', category: 'Placa Mãe' },
        { icon: 'mode_fan', name: 'Water Cooler 360mm ARGB', searchQuery: 'Water Cooler 360mm', category: 'Refrigeração' },
        { icon: 'power', name: 'Fonte 850W 80 Plus Gold', searchQuery: 'Fonte 850W Gold', category: 'Fonte' },
        { icon: 'cases', name: 'Gabinete Mid Tower Mesh', searchQuery: 'Gabinete Mid Tower Mesh', category: 'Gabinete' }
    ];

    const handleSearch = (query: string) => {
        window.open(`https://www.amazon.com.br/s?k=${encodeURIComponent(query)}`, '_blank');
    };

    return (
        <>
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-2xl border border-primary/20 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4">
                    <span className="material-symbols-outlined text-primary text-6xl md:text-7xl opacity-10">hardware</span>
                </div>
                <div className="relative z-10">
                    <h2 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-tight">PC Gamer do Mês</h2>
                    <p className="text-slate-400 text-sm md:text-base mb-8 max-w-lg font-medium">Nosso setup "Mestre do Custo-Benefício" otimizado para 1440p em altas taxas de quadros. Custo total: <span className="text-primary font-bold">R$ 6.250</span></p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {buildComponents.map((comp, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary transition-colors">{comp.icon}</span>
                                    <span className="text-xs font-medium text-slate-200">{comp.name}</span>
                                </div>
                                <button
                                    onClick={() => handleSearch(comp.searchQuery)}
                                    className="text-[9px] font-black text-primary hover:underline uppercase tracking-widest cursor-pointer"
                                >
                                    Ver Preço
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 w-full bg-primary text-background-dark font-black py-4 rounded uppercase tracking-[0.2em] text-[10px] md:text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg"
                    >
                        Ver Lista Completa de Componentes
                    </button>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-2xl shadow-2xl relative animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">build</span> Setup Completo
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {fullBuildList.map((comp, i) => (
                                <div key={i} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                                    <span className="material-symbols-outlined text-2xl text-primary/50 mr-4">{comp.icon}</span>
                                    <div className="flex-grow">
                                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">{comp.category}</span>
                                        <span className="text-sm font-bold text-white">{comp.name}</span>
                                    </div>
                                    <button
                                        onClick={() => handleSearch(comp.searchQuery)}
                                        className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all"
                                        title="Ver Preço"
                                    >
                                        <span className="material-symbols-outlined text-sm font-bold">shopping_cart</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 text-center">
                            <p className="text-primary text-xs font-bold uppercase tracking-widest">
                                * Preços e disponibilidade podem variar. Pesquisa realizada na Amazon Brasil.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PCBuildShowcase;
