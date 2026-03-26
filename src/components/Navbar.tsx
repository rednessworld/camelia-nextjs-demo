'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

const languages = ['ES', 'EN', 'CAT'] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '#inicio', label: t.nav.inicio },
    { href: '#menu', label: t.nav.menu },
    { href: '#galeria', label: t.nav.galeria },
    { href: '#reservas', label: t.nav.reservas },
    { href: '#ubicacion', label: t.nav.ubicacion },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(250, 246, 240, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 20px rgba(0,0,0,0.08)',
      } : {
        background: 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#" className="flex-shrink-0 cursor-pointer" aria-label="Camelia Art Café — inicio">
            <Image
              src="/images/logo.png"
              alt="Camelia Art Café"
              width={160}
              height={56}
              className="h-[90px] w-auto"
              style={{
                filter: scrolled ? 'brightness(0)' : 'brightness(0) invert(1)',
                transition: 'filter 0.3s ease',
              }}
              priority
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.15em] uppercase cursor-pointer transition-colors duration-300 ${
                  scrolled ? 'text-[#3D2B1F] hover:text-[#C4956A]' : 'text-white hover:text-[#E8C9A0]'
                }`}
                style={{ fontFamily: 'var(--font-dm-sans, sans-serif)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language switcher + hamburger */}
          <div className="flex items-center gap-4">
            {/* Language switcher — desktop */}
            <div className="hidden md:flex items-center">
              {languages.map((lang, i) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as Language)}
                  className={`text-xs tracking-wider px-2.5 py-1 cursor-pointer transition-colors duration-200 ${
                    i < languages.length - 1
                      ? `border-r ${scrolled ? 'border-[#3D2B1F]/20' : 'border-white/30'}`
                      : ''
                  } ${
                    language === lang
                      ? scrolled ? 'text-[#C4956A] font-semibold' : 'text-[#E8C9A0] font-semibold'
                      : scrolled ? 'text-[#3D2B1F]/50 hover:text-[#3D2B1F]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 cursor-pointer transition-colors ${
                scrolled || menuOpen ? 'text-[#3D2B1F]' : 'text-white'
              }`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-px bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — always solid background */}
      <div
        className={`md:hidden bg-[#FAF6F0] border-t border-[#E8C9A0]/40 shadow-xl transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#3D2B1F] text-sm tracking-[0.15em] uppercase cursor-pointer hover:text-[#C4956A] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-4 pt-3 border-t border-[#E8C9A0]/40">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as Language)}
                className={`text-xs tracking-wider cursor-pointer transition-colors ${
                  language === lang
                    ? 'text-[#C4956A] font-semibold'
                    : 'text-[#3D2B1F]/50 hover:text-[#3D2B1F]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
