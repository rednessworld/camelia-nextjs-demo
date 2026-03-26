'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="inicio" className="pt-24 lg:pt-36 pb-24 lg:pb-32 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-[#C4956A] text-xs tracking-[0.35em] uppercase mb-5">
              {t.about.eyebrow}
            </p>
            <h2
              className="text-5xl lg:text-6xl xl:text-7xl font-light text-[#3D2B1F] leading-[1.1] mb-8"
              style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
            >
              {t.about.heading1}<br />
              <em>{t.about.heading2}</em><br />
              {t.about.heading3}
            </h2>
            <div className="space-y-5 text-[#2C1A0E]/70 leading-relaxed text-[15px]">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-10 bg-[#C4956A]" />
              <span className="text-[#C4956A] text-xs tracking-[0.3em] uppercase">
                {t.about.location}
              </span>
            </div>
          </motion.div>

          {/* Overlapping photos */}
          <motion.div
            className="relative h-[480px] sm:h-[560px] lg:h-[620px]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Back image — larger, top-right */}
            <div className="absolute right-0 top-0 w-[80%] h-[78%] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/cafe4.jpg"
                alt="Interior acogedor del Camelia Art Café con muebles vintage y libros"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
            {/* Front image — smaller, bottom-left */}
            <div className="absolute left-0 bottom-0 w-[58%] h-[58%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6F0]">
              <Image
                src="/images/cafe3.jpg"
                alt="Taza de café de especialidad y repostería artesanal en Camelia"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 28vw"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-3 right-10 bg-[#C4956A] text-white px-5 py-2.5 rounded-full text-xs tracking-widest uppercase shadow-lg">
              Desde 2018
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
