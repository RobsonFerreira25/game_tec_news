import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blogData from '../data/blog.json';
import ImageWithCredit from '../components/ImageWithCredit';

const BlogView: React.FC = () => {
    const [filter, setFilter] = useState('Todos');
    const posts = blogData.posts;

    const categories = ['Todos', ...new Set(posts.map(p => p.category))];
    const filteredPosts = filter === 'Todos' ? posts : posts.filter(p => p.category === filter);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Google AdSense - Top Banner */}
            <div className="mb-8">
                <div className="bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Google AdSense - Banner Horizontal 728x90</span>
                </div>
            </div>

            {/* Header */}
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]"></span>
                    <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight uppercase">
                        Blog Gametech
                    </h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
                    Artigos, análises e guias completos sobre o universo gamer e tecnologia.
                </p>
            </header>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide whitespace-nowrap">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                                ? 'bg-primary text-background-dark shadow-lg scale-105'
                                : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {filteredPosts.slice(0, 4).map((post, i) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden group hover:border-primary/30 transition-all shadow-sm"
                            >
                                <div className="relative aspect-video overflow-hidden bg-slate-800">
                                    <ImageWithCredit
                                        src={post.image}
                                        alt={post.title}
                                        credit={post.imgCredit}
                                        showCredit={false}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                                        }}
                                    />
                                    <span className="absolute top-4 left-4 bg-primary text-background-dark text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                        <span>Por {post.author}</span>
                                        <span>{post.readTime} de leitura</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Google AdSense - Mid Content */}
                    <div className="mb-8">
                        <div className="bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Google AdSense - Banner Responsivo</span>
                        </div>
                    </div>

                    {/* More Posts */}
                    <div className="space-y-4">
                        {filteredPosts.slice(4).map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10 group cursor-pointer"
                            >
                                <div className="flex-shrink-0 w-32 h-20 bg-slate-800 rounded overflow-hidden shadow-md">
                                    <ImageWithCredit
                                        src={post.image}
                                        alt={post.title}
                                        credit={post.imgCredit}
                                        showCredit={false}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80";
                                        }}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <span className="text-primary text-[9px] font-black uppercase tracking-widest block mb-1">
                                        {post.category}
                                    </span>
                                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors leading-snug mb-1">
                                        {post.title}
                                    </h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                    <div className="sticky top-24 space-y-8">
                        {/* Google AdSense - Sidebar */}
                        <div className="bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Google AdSense</span>
                            <div className="mt-2 text-[10px] text-slate-400">300x600</div>
                        </div>

                        {/* Popular Posts */}
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
                            <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary fill-current">trending_up</span> Mais Lidos
                            </h3>
                            <div className="space-y-4">
                                {posts.slice(0, 3).map((post, i) => (
                                    <Link
                                        key={post.id}
                                        to={`/blog/${post.slug}`}
                                        className="flex gap-3 group cursor-pointer"
                                    >
                                        <span className="text-3xl font-display font-bold text-slate-200 dark:text-slate-700 group-hover:text-primary transition-colors">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h4>
                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Newsletter */}
                        <section className="bg-primary p-8 rounded-2xl text-background-dark text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-background-dark/5 rounded-full blur-2xl"></div>
                            <span className="material-symbols-outlined text-5xl mb-4 font-bold">mail</span>
                            <h3 className="font-display font-bold text-3xl uppercase tracking-tighter mb-2 leading-none">
                                Newsletter Semanal
                            </h3>
                            <p className="text-xs font-bold mb-6 opacity-80 uppercase tracking-widest leading-relaxed">
                                Receba os melhores artigos direto no seu e-mail
                            </p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Seu melhor e-mail..."
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border-transparent placeholder:text-background-dark/50 text-sm font-bold focus:ring-2 focus:ring-background-dark focus:bg-white transition-all outline-none"
                                />
                                <button className="w-full bg-background-dark text-primary font-black py-3.5 rounded-lg uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                                    Inscrever-se
                                </button>
                            </form>
                        </section>
                    </div>
                </aside>
            </div>

            {/* Google AdSense - Bottom Banner */}
            <div className="mt-12">
                <div className="bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Google AdSense - Banner Horizontal 728x90</span>
                </div>
            </div>
        </div>
    );
};

export default BlogView;
