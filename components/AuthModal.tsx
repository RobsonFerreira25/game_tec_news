
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onClose();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            username: username,
                        },
                    },
                });
                if (error) throw error;
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro na autenticação');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1a2b34] w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="relative p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-2">
                            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
                        </h2>
                        <p className="text-sm font-black uppercase tracking-widest text-primary">
                            Portal Gametech News
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-4 py-8">
                            <span className="material-symbols-outlined text-6xl text-green-500 animate-bounce">check_circle</span>
                            <h3 className="text-xl font-bold">Verifique seu e-mail!</h3>
                            <p className="text-slate-400 text-sm">Enviamos um link de confirmação para ativar sua conta.</p>
                            <button
                                onClick={onClose}
                                className="w-full bg-primary text-background-dark font-black py-4 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all"
                            >
                                Entendi
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleAuth} className="space-y-4">
                            {!isLogin && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nome Completo</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full bg-slate-100 dark:bg-white/5 border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                                            placeholder="Ex: João Silva"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Usuário</label>
                                        <input
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-slate-100 dark:bg-white/5 border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                                            placeholder="Ex: joaotech"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">E-mail</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Senha</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-500 text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-background-dark font-black py-4 rounded-xl uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar Conta'}
                            </button>

                            <div className="text-center mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
                                >
                                    {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre agora'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
