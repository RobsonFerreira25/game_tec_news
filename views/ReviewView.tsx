
import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ImageWithCredit from '../components/ImageWithCredit';
import CommentsSection from '../components/CommentsSection';
import reviewsData from '../data/reviews.json';

const ReviewView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const review = reviewsData.find((r: any) => r.slug === slug);

  if (!review) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-6 md:mb-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
        <Link to="/" className="hover:text-primary transition-colors">Reviews</Link>
        <span className="material-symbols-outlined text-[10px] md:text-[12px]">chevron_right</span>
        <span className="text-slate-900 dark:text-white">{review.slug.includes('mouse') ? 'Mouses Gamer' : (review.slug.includes('webcam') || review.slug.includes('tiny') ? 'Webcams' : 'Hardware')}</span>
      </nav>

      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-tight uppercase">
          {review.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base md:text-[18px]">calendar_today</span> {review.date}</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base md:text-[18px]">person</span> Por {review.author}</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base md:text-[18px]">timer</span> {review.readTime}</span>
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
                  <span className="text-4xl md:text-5xl font-display font-bold text-primary">{review.verdict}</span>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-background-dark px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">Veredito</div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-display font-bold mb-3 flex items-center justify-center md:justify-start gap-2 uppercase tracking-tight">
                  <span className="material-symbols-outlined text-primary font-bold">verified</span>
                  {review.verdictTitle}
                </h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {review.verdictDescription}
                </p>
              </div>
              <div className="w-full md:w-auto">
                <a href={review.amazonLink} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[#ff9900] hover:bg-[#e68a00] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95">
                  <span className="material-symbols-outlined text-[18px] md:text-[20px]">shopping_cart</span>
                  Ver na Amazon
                </a>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 shadow-sm">
              <h3 className="text-green-600 dark:text-green-400 font-display font-bold text-lg mb-6 flex items-center gap-3 uppercase tracking-wider">
                <span className="material-symbols-outlined font-bold">thumb_up</span> Prós
              </h3>
              <ul className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {review.pros.map((pro: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-center"><span className="material-symbols-outlined text-green-500 text-[18px] font-bold">check</span> {pro}</li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 shadow-sm">
              <h3 className="text-red-600 dark:text-red-400 font-display font-bold text-lg mb-6 flex items-center gap-3 uppercase tracking-wider">
                <span className="material-symbols-outlined font-bold">thumb_down</span> Contras
              </h3>
              <ul className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {review.cons.map((con: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-center"><span className="material-symbols-outlined text-red-500 text-[18px] font-bold">close</span> {con}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Technical Article */}
          <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <h2 className="text-3xl font-display font-bold border-l-4 border-primary pl-6 uppercase tracking-tight">Análise Detalhada</h2>
            <div
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: review.content }}
            />
            <div className="rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer my-10">
              <ImageWithCredit
                src={review.mainImage}
                alt={review.title}
                credit={review.imgCredit}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </article>

          {/* Comments Section */}
          <CommentsSection articleSlug={review.slug} />
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
                {review.specs.map((spec: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                    <span className="text-slate-500">{spec.label}</span>
                    <span className="text-slate-900 dark:text-white">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Promo */}
            <div className="rounded-2xl overflow-hidden relative aspect-[3/4] group cursor-pointer shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10 p-8 flex flex-col justify-end">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 drop-shadow-lg">Oferta Relâmpago</span>
                <h4 className="text-white text-2xl font-display font-bold mb-6 uppercase tracking-tight drop-shadow-lg">{review.title} com o melhor preço</h4>
                <a href={review.amazonLink} className="bg-primary text-background-dark font-black py-4 rounded-xl text-[10px] w-full uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl text-center block">Aproveitar agora</a>
              </div>
              <ImageWithCredit
                src={review.mainImage}
                alt="Promo"
                credit={review.imgCredit}
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
