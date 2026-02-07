
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface Comment {
    id: string;
    user_name: string;
    content: string;
    created_at: string;
}

interface CommentsSectionProps {
    articleSlug: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleSlug }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [userName, setUserName] = useState('');
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const { user, profile } = useAuth();

    useEffect(() => {
        fetchComments();
    }, [articleSlug]);

    const fetchComments = async () => {
        setIsFetching(true);
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('article_slug', articleSlug)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data || []);
        }
        setIsFetching(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalUserName = user ? (profile?.username || 'Usuário') : userName;
        if (!newComment.trim() || !finalUserName.trim()) return;

        setIsLoading(true);
        const { error } = await supabase
            .from('comments')
            .insert([
                {
                    article_slug: articleSlug,
                    user_name: finalUserName,
                    content: newComment,
                    user_id: user?.id || null
                },
            ]);

        if (error) {
            alert('Erro ao enviar comentário. Tente novamente.');
            console.error('Error posting comment:', error);
        } else {
            setNewComment('');
            fetchComments();
        }
        setIsLoading(false);
    };

    return (
        <div className="mt-12 pt-12 border-t border-slate-200 dark:border-white/5">
            <h3 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-primary font-bold">chat_bubble</span>
                Comentários ({comments.length})
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-12 space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm transition-all focus-within:border-primary/50">
                {!user && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Seu Nome</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Ex: João Silva"
                                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                required
                            />
                        </div>
                    </div>
                )}
                {user && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-primary/10 rounded-lg border border-primary/20 w-fit">
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Postando como: {profile?.username || 'Usuário'}</span>
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Mensagem</label>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="O que você achou dessa matéria?"
                        rows={4}
                        className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white resize-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto px-8 py-4 bg-primary text-background-dark font-black rounded-xl text-[10px] uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? 'Enviando...' : 'Postar Comentário'}
                    <span className="material-symbols-outlined text-sm font-bold">send</span>
                </button>
            </form>

            {/* List */}
            <div className="space-y-6">
                {isFetching ? (
                    <div className="flex justify-center py-10 opacity-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="group bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:border-primary/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm border border-primary/20">
                                        {comment.user_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{comment.user_name}</h4>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                            {new Date(comment.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                                {comment.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 px-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-3 opacity-50">forum</span>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Seja o primeiro a comentar!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
