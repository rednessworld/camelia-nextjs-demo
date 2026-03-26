'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Refs for touch — all mutable, no re-render lag
  const touchStartYRef = useRef<number>(0);
  const lastTouchYRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  // Keep a ref in sync with mediaFullyExpanded so stable touch handlers can read it
  const mediaFullyExpandedRef = useRef<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    mediaFullyExpandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const expandHero = () => {
      setMediaFullyExpanded(true);
      setScrollProgress(1);
      setShowContent(true);
    };
    if (window.location.hash) expandHero();
    window.addEventListener('hashchange', expandHero);
    return () => window.removeEventListener('hashchange', expandHero);
  }, []);

  // Wheel handler — re-registers when scrollProgress or mediaFullyExpanded changes (desktop only)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.002;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
      }
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll as EventListener);
    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded]);

  // Touch handlers — registered once, use refs throughout (no stale closures)
  useEffect(() => {
    const handleTouchStart = (e: Event) => {
      const te = e as globalThis.TouchEvent;
      touchStartYRef.current = te.touches[0].clientY;
      lastTouchYRef.current = te.touches[0].clientY;
      velocityRef.current = 0;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as globalThis.TouchEvent;
      if (mediaFullyExpandedRef.current) return;
      e.preventDefault();

      const currentY = te.touches[0].clientY;
      const deltaY = lastTouchYRef.current - currentY;
      lastTouchYRef.current = currentY;

      velocityRef.current = deltaY * 0.012;

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        setScrollProgress(prev => {
          const next = Math.min(Math.max(prev + velocityRef.current, 0), 1);
          if (next >= 1) {
            mediaFullyExpandedRef.current = true;
            setMediaFullyExpanded(true);
            setShowContent(true);
          } else if (next < 0.75) {
            setShowContent(false);
          }
          return next;
        });
      });
    };

    const handleTouchEnd = () => {
      const decay = () => {
        velocityRef.current *= 0.92;
        if (Math.abs(velocityRef.current) > 0.001 && !mediaFullyExpandedRef.current) {
          setScrollProgress(prev => {
            const next = Math.min(Math.max(prev + velocityRef.current, 0), 1);
            if (next >= 1) {
              mediaFullyExpandedRef.current = true;
              setMediaFullyExpanded(true);
              setShowContent(true);
            }
            return next;
          });
          animFrameRef.current = requestAnimationFrame(decay);
        }
      };
      animFrameRef.current = requestAnimationFrame(decay);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []); // runs once — all state access via refs

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = isMobileState
    ? Math.min(windowWidth * 0.88, 550) + scrollProgress * 300
    : 450 + scrollProgress * 750;
  const mediaHeight = isMobileState ? 480 + scrollProgress * 150 : 500 + scrollProgress * 175;

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out" style={{ overflowX: 'hidden' }}>
      <section className="relative flex flex-col items-center justify-start h-[100dvh]">
        <div className="relative w-full flex flex-col items-center h-[100dvh]">
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ filter: `blur(${scrollProgress * 12}px)` }}
          >
            <Image src={bgImageSrc} alt="Background" width={1920} height={1080}
              className="h-screen" style={{ width: '100%', objectFit: 'cover', objectPosition: '20% center', display: 'block' }} priority />
            <div
              className="absolute inset-0"
              style={{ background: `rgba(0,0,0,${0.4 + scrollProgress * 0.3})` }}
            />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Logo */}
              <motion.div
                className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
                animate={{ opacity: 0.25 + scrollProgress * 0.75 }}
                transition={{ duration: 0.05, ease: 'linear' }}
              >
                <Image src="/images/logo.png" alt="Camelia Art Café logo" width={500} height={300}
                  style={{ width: 'clamp(220px, 80vw, 420px)', height: 'auto' }} priority />
                <p className="text-[#E8C9A0] italic font-light text-xl mt-4 tracking-widest"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {t.hero.tagline}
                </p>
              </motion.div>

              {/* Expanding video */}
              <div
                className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '75vw',
                  maxHeight: '75vh',
                  boxShadow: '0px 0px 50px rgba(0,0,0,0.4)',
                }}
              >
                <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline
                  className="w-full h-full object-cover" />
                <motion.div
                  className="absolute inset-0 bg-black/40"
                  animate={{ opacity: 0.6 - scrollProgress * 0.4 }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              </div>

              {/* Scroll hint */}
              <div className="absolute bottom-8 z-20 flex flex-col items-center gap-2">
                <motion.p
                  className="text-white/70 text-sm tracking-widest uppercase"
                  animate={{ opacity: 1 - scrollProgress * 3 }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                >
                  {scrollToExpand || t.hero.scrollToExpand}
                </motion.p>
                <motion.div
                  className="w-px h-8 bg-white/40"
                  animate={{ scaleY: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
            </div>

            {children && (
              <motion.section
                className="flex flex-col w-full px-8 md:px-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
