'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  WheelEvent,
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

  // Use ref for touchStartY to avoid stale closure in touch handlers
  const touchStartYRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: Event) => {
      const touch = (e as globalThis.TouchEvent).touches[0];
      touchStartYRef.current = touch.clientY;
    };

    const handleTouchMove = (e: Event) => {
      const te = e as globalThis.TouchEvent;
      if (!touchStartYRef.current) return;
      const touchY = te.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      // Deadzone — ignore tiny movements
      if (Math.abs(deltaY) < 3) return;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = deltaY * 0.003;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        requestAnimationFrame(() => {
          setScrollProgress(newProgress);
          if (newProgress >= 1) {
            setMediaFullyExpanded(true);
            setShowContent(true);
          } else if (newProgress < 0.75) {
            setShowContent(false);
          }
        });
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded]);

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
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

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

              {/* Logo — fades out as video expands */}
              <motion.div
                className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
                animate={{ opacity: 0.25 + scrollProgress * 0.75 }}
                transition={{ duration: 0.1 }}
              >
                <Image src="/images/logo.png" alt="Camelia Art Café logo" width={500} height={300}
                  style={{ width: '420px', height: 'auto' }} priority />
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
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Scroll hint */}
              <div className="absolute bottom-8 z-20 flex flex-col items-center gap-2">
                <motion.p
                  className="text-white/70 text-sm tracking-widest uppercase"
                  animate={{ opacity: 1 - scrollProgress * 3 }}
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
