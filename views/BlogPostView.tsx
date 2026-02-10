import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import blogData from '../data/blog.json';
import ImageWithCredit from '../components/ImageWithCredit';
import CommentsSection from '../components/CommentsSection';
import AdSense from '../components/AdSense';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    imgCredit: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
    affiliateLink?: string;
    content: string;
}

const BlogPostView: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const found = blogData.posts.find((p: any) => p.slug === slug);
        setPost(found || null);
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
                <Link to="/blog" className="text-primary hover:underline">Voltar para o Blog</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 md:mb-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
                <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
                <span className="text-slate-900 dark:text-white uppercase">{post.category}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <article className="space-y-6 md:space-y-8">
                        <header className="space-y-4 md:space-y-6">
                            <span className="bg-primary text-background-dark px-3 py-1 rounded-sm text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] inline-block shadow-lg">
                                {post.category}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight uppercase">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-500 border-y border-slate-200 dark:border-white/5 py-4">
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-base md:text-[18px]">calendar_today</span> {new Date(post.date).toLocaleDateString('pt-BR')}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-base md:text-[18px]">person</span> {post.author}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-base md:text-[18px]">schedule</span> {post.readTime}
                                </span>
                            </div>
                        </header>

                        {/* Hero Image */}
                        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl bg-slate-800">
                            <ImageWithCredit
                                src={post.image}
                                alt={post.title}
                                credit={post.imgCredit}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80";
                                }}
                            />
                        </div>

                        {/* Google AdSense - Top */}
                        <AdSense slot="1234567890" />

                        {/* Article Content */}
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-white/10 prose-h2:pb-4
                                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                                prose-strong:text-primary prose-strong:font-black
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-ul:list-disc prose-ul:pl-6
                                prose-li:text-slate-700 dark:prose-li:text-slate-300
                                prose-img:rounded-xl prose-img:shadow-lg
                                prose-table:border-collapse
                                prose-td:border prose-td:border-slate-300 dark:prose-td:border-white/10
                                prose-th:border prose-th:border-slate-300 dark:prose-th:border-white/10"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Google AdSense - Bottom */}
                        <AdSense slot="0987654321" />

                        {/* Related Posts */}
                        <section className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5">
                            <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-6">Artigos Relacionados</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {blogData.posts
                                    .filter(p => p.category === post.category && p.id !== post.id)
                                    .slice(0, 2)
                                    .map((relatedPost: any) => (
                                        <Link
                                            key={relatedPost.id}
                                            to={`/blog/${relatedPost.slug}`}
                                            className="group bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                                        >
                                            <div className="relative aspect-video overflow-hidden bg-slate-800">
                                                <ImageWithCredit
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    credit={relatedPost.imgCredit}
                                                    showCredit={false}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </section>

                        {/* Comments */}
                        <CommentsSection contentId={post.id} contentType="blog" />
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
};

export default BlogPostView;
