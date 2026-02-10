import React, { useEffect } from 'react';

interface AdSenseProps {
    slot: string;
    style?: React.CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle';
    responsive?: 'true' | 'false';
}

const AdSense: React.FC<AdSenseProps> = ({ slot, style, format = 'auto', responsive = 'true' }) => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
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
