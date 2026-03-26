'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Polaroid {
  src: string;
  alt: string;
  caption: string;
  rotation: number; // degrees — hardcoded for stable layout
  yOffset: number;  // px translateY for scattered feel
}

const polaroids: Polaroid[] = [
  { src: '/images/food1.jpg',   alt: 'Brunch artístic al Camelia',         caption: 'Brunch vibes',      rotation: -4, yOffset:  0  },
  { src: '/images/food5.jpg',   alt: 'Torrada premium de temporada',        caption: 'Buenos días',        rotation:  3, yOffset: -10 },
  { src: '/images/food6.jpg',   alt: 'Bagel de salmó fumat',               caption: 'Fresh catch',        rotation: -6, yOffset:  8  },
  { src: '/images/food7.jpg',   alt: 'French toast amb fruites del bosc',   caption: 'Sunday mood',        rotation:  2, yOffset: -5  },
  { src: '/images/food9.jpg',   alt: 'Croissant de mantequilla artesanal',  caption: 'Homemade pastry',    rotation: -3, yOffset:  12 },
  { src: '/images/food10.jpg',  alt: "Cheesecake d'arándanos casolà",       caption: 'Sweet corner',       rotation:  5, yOffset: -8  },
  { src: '/images/food11.jpg',  alt: 'Cookie de xocolata negra',           caption: 'Afternoon light',    rotation: -2, yOffset:  5  },
  { src: '/images/food12.jpg',  alt: 'Composició esmorzar de temporada',   caption: 'Carte blanche',      rotation:  4, yOffset: -12 },
  { src: '/images/cafe3.jpg',   alt: 'Interior vintage amb muebles antics', caption: 'Coffee art',         rotation: -5, yOffset:  6  },
  { src: '/images/cafe4.jpg',   alt: 'Espai acollidor del Camelia',        caption: 'El Born mornings',   rotation:  3, yOffset: -3  },
  { src: '/images/brunch1.jpg', alt: 'Brunch complet — la nostra carta',   caption: 'La Sagrada',         rotation:  6, yOffset:  10 },
  { src: '/images/brunch2.jpg', alt: 'Brunch de cap de setmana',           caption: 'Rosa latte',         rotation: -3, yOffset: -6  },
];

// ─── Grain texture (SVG noise as data URI) ────────────────────────────────────

const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundSize: '200px 200px',
  opacity: 0.04,
  mixBlendMode: 'multiply' as const,
};

// ─── Single Polaroid card ─────────────────────────────────────────────────────

function PolaroidCard({
  polaroid,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  mobile = false,
}: {
  polaroid: Polaroid;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  mobile?: boolean;
}) {
  const rotation = mobile ? polaroid.rotation / 2 : polaroid.rotation;
  const yOffset  = mobile ? 0 : polaroid.yOffset;
  const imgSize  = mobile ? 150 : 220;
  const delay    = (index % 4) * 0.09;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset + 28, rotate: rotation }}
      whileInView={{ opacity: 1, y: yOffset, rotate: rotation }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      whileHover={{
        rotate: 0,
        scale: 1.4,
        y: yOffset,
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
      style={{
        zIndex: isHovered ? 50 : (index % 6) + 1,
        margin: mobile ? '8px' : '12px -8px',
        flexShrink: 0,
      }}
      className="cursor-pointer relative"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      {/* Polaroid frame */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: mobile ? '8px 8px 26px' : '12px 12px 40px',
          boxShadow: isHovered
            ? '0 12px 40px rgba(0,0,0,0.22)'
            : '0 4px 15px rgba(0,0,0,0.15)',
          transition: 'box-shadow 0.28s ease',
        }}
      >
        {/* Photo */}
        <div
          style={{ width: imgSize, height: imgSize, position: 'relative', overflow: 'hidden' }}
        >
          <Image
            src={polaroid.src}
            alt={polaroid.alt}
            fill
            className="object-cover"
            sizes={`${imgSize}px`}
          />
        </div>

        {/* Caption */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: mobile ? '13px' : '15px',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: mobile ? '8px' : '12px',
            color: '#3D2B1F',
            opacity: 0.65,
            letterSpacing: '0.01em',
            lineHeight: 1,
          }}
        >
          {polaroid.caption}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const p = polaroids[index];
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-3xl w-full mx-6 cursor-default"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid frame */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 16px 52px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
            <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="80vw" />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontSize: '20px',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: '16px',
              color: '#3D2B1F',
              opacity: 0.65,
            }}
          >
            {p.caption}
          </p>
        </div>
      </motion.div>

      {/* Close */}
      <button
        className="absolute top-5 right-6 text-white/55 hover:text-white text-3xl leading-none cursor-pointer transition-colors"
        onClick={onClose}
        aria-label="Tancar"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer transition-colors p-3"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Anterior"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer transition-colors p-3"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Següent"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Counter */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">
        {index + 1} / {polaroids.length}
      </p>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function GallerySection() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex]   = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + polaroids.length) % polaroids.length : null), []);
  const next  = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % polaroids.length : null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <section id="galeria" className="relative bg-[#FAF6F0] overflow-hidden pt-20 pb-8">

      {/* Grain texture overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={grainStyle} />

      {/* Header */}
      <div className="relative z-10 text-center mb-14 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#C4956A] text-xs tracking-[0.35em] uppercase mb-4">
            {t.gallery.eyebrow}
          </p>
          <h2
            className="text-5xl lg:text-6xl font-light text-[#3D2B1F] mb-3"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.gallery.heading}
          </h2>
          <p
            className="text-[#3D2B1F]/45 text-sm italic tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.gallery.subtitle}
          </p>
        </motion.div>
      </div>

      {/* ── Desktop polaroid wall (sm+) ── */}
      <div className="hidden sm:flex flex-wrap justify-center relative z-10 px-8 pb-16"
           style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {polaroids.map((p, i) => (
          <PolaroidCard
            key={p.src}
            polaroid={p}
            index={i}
            isHovered={hoveredIndex === i}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      {/* ── Mobile 2-col grid (< sm) ── */}
      <div className="sm:hidden grid grid-cols-2 justify-items-center relative z-10 px-4 pb-10"
           style={{ gap: '12px' }}>
        {polaroids.map((p, i) => (
          <PolaroidCard
            key={`m-${p.src}`}
            polaroid={p}
            index={i}
            isHovered={hoveredIndex === i}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setLightboxIndex(i)}
            mobile
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
