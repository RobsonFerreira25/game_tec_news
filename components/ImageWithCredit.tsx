
import React from 'react';

interface ImageWithCreditProps {
    src: string;
    alt: string;
    credit?: string;
    className?: string;
    containerClassName?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ImageWithCredit: React.FC<ImageWithCreditProps> = ({
    src,
    alt,
    credit,
    className = "w-full h-full object-cover",
    containerClassName = "relative w-full h-full overflow-hidden",
    onError
}) => {
    return (
        <div className={containerClassName}>
            <img
                src={src}
                alt={alt}
                className={className}
                onError={onError}
            />
            {credit && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] text-white/80 pointer-events-none select-none z-10 border border-white/10">
                    Foto: {credit}
                </div>
            )}
        </div>
    );
};

export default ImageWithCredit;
