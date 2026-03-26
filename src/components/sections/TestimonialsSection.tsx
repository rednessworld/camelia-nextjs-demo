'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const reviews = [
  {
    name: 'María G.',
    date: 'Octubre 2024',
    rating: 5,
    text: 'Un lugar absolutamente mágico. El ambiente es único en Barcelona — libros, música suave, muebles de otra época. El Rose Latte es una obra de arte y el cheesecake de arándanos, impecable. Se convirtió en mi lugar favorito del Eixample.',
    lang: 'ES',
  },
  {
    name: 'James T.',
    date: 'September 2024',
    rating: 5,
    text: 'Hidden gem near Sagrada Família. Perfect escape from the tourist crowds. The salmon bagel was exceptional and the flat white was some of the best coffee I had in Barcelona. Staff is warm and welcoming. Will be back every trip.',
    lang: 'EN',
  },
  {
    name: 'Laia P.',
    date: 'Novembre 2024',
    rating: 4,
    text: "L'ambient és preciós, sembla la casa d'una àvia artista. El chai latte és deliciós i els alfajors casolans són una autèntica meravella argentina. Una mica de cua al matí però val la pena esperar. Molt recomanable.",
    lang: 'CAT',
  },
  {
    name: 'Antoine R.',
    date: 'Octobre 2024',
    rating: 5,
    text: "Un café extraordinaire. L\u2019atmosphère est intime et chaleureuse, comme chez soi. Le matcha latte était parfait et le French toast absolument délicieux. À deux pas de la Sagrada Família mais dans un tout autre monde. Incontournable.",
    lang: 'FR',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? 'text-[#C4956A]' : 'text-[#E8C9A0]/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 lg:py-36 bg-[#3D2B1F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#C4956A] text-xs tracking-[0.35em] uppercase mb-4">{t.testimonials.eyebrow}</p>
          <h2
            className="text-5xl lg:text-6xl font-light text-[#E8C9A0] mb-2"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.testimonials.heading}
          </h2>
          <p className="text-[#E8C9A0]/40 text-xs tracking-wider">
            {t.testimonials.subheading}
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              <Stars count={review.rating} />
              <p style={{ marginTop: '20px', color: 'rgba(232,201,160,0.7)', fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic', flex: 1 }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#E8C9A0', fontSize: '14px', fontWeight: 500 }}>{review.name}</p>
                  <p style={{ color: 'rgba(232,201,160,0.5)', fontSize: '12px', marginTop: '2px' }}>{review.date}</p>
                </div>
                <span style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#E8C9A0',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                }}>
                  {review.lang}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Read on Google CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://www.google.com/maps/place/Camelia+Art+Caf%C3%A9+%7C+Sagrada+Fam%C3%ADlia/@41.4067233,2.176199,20z/data=!4m8!3m7!1s0x12a4a3a72d3c7a57:0x17c37b28d4b4e9ec!8m2!3d41.4067233!4d2.1760808!9m1!1b1!16s%2Fg%2F11gjt4mg9s?authuser=0&entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C4956A]/40 text-[#E8C9A0] text-xs tracking-[0.2em] uppercase cursor-pointer hover:bg-[#C4956A]/10 hover:border-[#C4956A] transition-all duration-300 rounded-full"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {t.testimonials.readOnGoogle}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
