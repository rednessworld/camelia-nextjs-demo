'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { href: '#inicio', label: t.nav.inicio },
    { href: '#menu', label: t.nav.menu },
    { href: '#galeria', label: t.nav.galeria },
    { href: '#reservas', label: t.nav.reservas },
    { href: '#ubicacion', label: t.nav.ubicacion },
  ];

  return (
    <footer className="bg-[#2C1A0E] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Camelia Art Café"
              width={160}
              height={60}
              className="h-[140px] w-auto mb-5 brightness-0 invert opacity-80"
            />
            <p className="text-[#E8C9A0]/50 text-sm leading-relaxed max-w-xs whitespace-pre-line">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-[#E8C9A0] text-[10px] tracking-[0.35em] uppercase mb-6">
              {t.footer.nav}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#E8C9A0]/50 text-sm hover:text-[#C4956A] cursor-pointer transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#E8C9A0] text-[10px] tracking-[0.35em] uppercase mb-6">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+34936846789"
                  className="text-[#E8C9A0]/50 hover:text-[#C4956A] cursor-pointer transition-colors"
                >
                  +34 936 84 67 89
                </a>
              </li>
              <li className="text-[#E8C9A0]/50">C/ de Padilla, 264 · Eixample</li>
              <li className="text-[#E8C9A0]/50">C/ de la Diputació, 278 · Eixample</li>
              <li>
                <a
                  href="https://instagram.com/cameliartcafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8C9A0]/50 hover:text-[#C4956A] cursor-pointer transition-colors"
                >
                  @cameliartcafe
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E8C9A0]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#E8C9A0]/30 text-xs">
            © 2026 Camelia Art Café · {t.footer.copyright}
          </p>
          <p className="text-[#E8C9A0]/15 text-xs">
            {t.footer.sub}
          </p>
        </div>
      </div>
    </footer>
  );
}
