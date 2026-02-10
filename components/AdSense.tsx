import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
    slot: string;
    style?: React.CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle';
    responsive?: 'true' | 'false';
}

const AdSense: React.FC<AdSenseProps> = ({ slot, style, format = 'auto', responsive = 'true' }) => {
    const initialized = useRef(false);

    useEffect(() => {
        // Defensive check to prevent double-initialization in Strict Mode
        if (initialized.current) return;

        const loadAd = () => {
            try {
                // @ts-ignore
                if (window.adsbygoogle) {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    initialized.current = true;
                }
            } catch (err) {
                console.error('AdSense error:', err);
            }
        };

        // Delay execution slightly to ensure DOM is ready and not blocking main thread
        const timer = setTimeout(loadAd, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="ad-container my-8 overflow-hidden rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-card-dark text-center py-4">
            <ins
                className="adsbygoogle"
                style={style || { display: 'block' }}
                data-ad-client="ca-pub-3769888742015471"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Publicidade</p>
        </div>
    );
};

export default AdSense;
