'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LocationSection() {
  const { t } = useLanguage();
  return (
    <section id="ubicacion" className="py-24 lg:py-36 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#C4956A] text-xs tracking-[0.35em] uppercase mb-4">{t.location.eyebrow}</p>
          <h2
            className="text-5xl lg:text-6xl font-light text-[#3D2B1F]"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.location.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Google Maps embed */}
          <motion.div
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg"
            style={{ height: '420px' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.4!2d2.1760808!3d41.4067233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3a72d3c7a57%3A0x17c37b28d4b4e9ec!2sCamelia%20Art%20Caf%C3%A9%20%7C%20Sagrada%20Fam%C3%ADlia!5e0!3m2!1sen!2ses!4v1234567890"
              width="100%"
              height="100%"
              className="border-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Camelia Art Café — C/ de Padilla 264, Barcelona"
            />
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div>
              <h3
                className="text-2xl text-[#3D2B1F] mb-3"
                style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
              >
                {t.location.primaryAddress}
              </h3>
              <p className="text-[#2C1A0E]/65 text-sm leading-relaxed">
                C/ de Padilla, 264<br />
                Eixample, 08025 Barcelona
              </p>
            </div>

            <div>
              <h3
                className="text-2xl text-[#3D2B1F] mb-3"
                style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
              >
                {t.location.secondaryAddress}
              </h3>
              <p className="text-[#2C1A0E]/65 text-sm leading-relaxed">
                C/ de la Diputació, 278<br />
                Eixample, Barcelona
              </p>
            </div>

            <div>
              <h3
                className="text-2xl text-[#3D2B1F] mb-3"
                style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
              >
                {t.location.contact}
              </h3>
              <a
                href="tel:+34936846789"
                className="block text-[#2C1A0E]/65 hover:text-[#C4956A] cursor-pointer transition-colors text-sm mb-3"
              >
                +34 936 84 67 89
              </a>
              <a
                href="https://instagram.com/cameliartcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C4956A] hover:text-[#3D2B1F] cursor-pointer transition-colors text-sm"
              >
                {/* Instagram icon */}
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @cameliartcafe
              </a>
            </div>

            {/* Quick info pill */}
            <div className="bg-[#F0E6D6] rounded-xl p-4 text-sm text-[#2C1A0E]/60 space-y-1.5">
              <p>{t.location.distance}</p>
              <p>{t.location.vibe}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
