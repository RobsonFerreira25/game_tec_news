import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import newsData from '../data/news.json';
import ImageWithCredit from '../components/ImageWithCredit';
import CommentsSection from '../components/CommentsSection';

interface NewsItem {
    title: string;
    label: string;
    image?: string;
    img?: string;
    description: string;
    slug?: string;
    time?: string;
    content?: string;
    sourceName?: string;
    sourceUrl?: string;
    author?: string;
}

const NewsView: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [news, setNews] = useState<any | null>(null);

    useEffect(() => {
        // Busca a notícia no JSON pelo slug
        const featured = { ...newsData.featured, slug: newsData.featured.slug || 'featured' };
        const latest = newsData.latest.map((n: any) => ({
            ...n,
            slug: n.slug || n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }));
        const mini = newsData.mini.map((m: any) => ({
            ...m,
            slug: m.slug || m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }));

        const allNews = [featured, ...latest, ...mini];

        const found = allNews.find(n => n.slug === slug);
        setNews(found || null);

        window.scrollTo(0, 0);
    }, [slug]);

    if (!news) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Notícia não encontrada</h1>
                <Link to="/" className="text-primary hover:underline">Voltar para a Home</Link>
            </div>
        );
    }

    const displayImage = news.image || news.img || "https://picsum.photos/id/10/1200/600";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 md:mb-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
                <span className="text-slate-900 dark:text-white uppercase">{news.label}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <article className="space-y-6 md:space-y-8">
                        <header className="space-y-4 md:space-y-6">
                            <span className="bg-primary text-background-dark px-3 py-1 rounded-sm text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] inline-block shadow-lg">
                                {news.label}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight uppercase">
                                {news.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-500 border-y border-slate-200 dark:border-white/5 py-4">
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-base md:text-[18px]">calendar_today</span> {news.time || 'Hoje'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-base md:text-[18px]">person</span> Por {news.author || 'Redação Gametech'}
                                </span>
                            </div>
                        </header>

                        <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900 border border-white/5">
                            <ImageWithCredit
                                src={displayImage}
                                alt={news.title}
                                credit={news.imgCredit}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80";
                                    (e.target as HTMLImageElement).onerror = null;
                                }}
                            />
                        </div>

                        <div className="prose prose-sm sm:prose-base md:prose-lg prose-slate dark:prose-invert max-w-none prose-h2:uppercase prose-h2:font-display prose-h2:tracking-tight prose-h3:uppercase prose-h3:font-display prose-a:text-primary prose-strong:text-primary">
                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic mb-6 md:mb-10 border-l-4 border-primary pl-4 md:pl-6">
                                {news.description}
                            </p>

                            <div className="text-slate-700 dark:text-slate-200 mt-6 md:mt-8">
                                {news.content ? (
                                    <div className="article-body" dangerouslySetInnerHTML={{ __html: news.content }} />
                                ) : (
                                    <p>Conteúdo completo em breve. Fique ligado para mais atualizações sobre esta matéria.</p>
                                )}
                            </div>
                        </div>

                        {/* Source Credits */}
                        <footer className="mt-8 md:mt-12 p-4 md:p-6 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 italic text-sm">
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">link</span>
                                Fonte original: <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold transition-all">{news.sourceName || 'Veja a matéria original'}</a>
                            </p>
                            <p className="text-slate-500 mt-2 text-xs">Créditos: {news.sourceName || 'Veículo de Imprensa'}</p>
                        </footer>

                        {/* Comments Section */}
                        <CommentsSection articleSlug={slug || 'featured'} />
                    </article>
                </div>

                <aside className="lg:col-span-4">
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
};

export default NewsView;
