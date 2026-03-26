'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const locations = [
  {
    index: 1,
    name: 'Padilla',
    address: 'C/ de Padilla, 264',
    neighborhood: 'Eixample, 08025 Barcelona',
  },
  {
    index: 2,
    name: 'Diputació',
    address: 'C/ de la Diputació, 278',
    neighborhood: 'Eixample, Barcelona',
  },
];

export default function ReservationsSection() {
  const { t } = useLanguage();
  return (
    <section id="reservas" className="py-24 lg:py-36 bg-[#FAF6F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#C4956A] text-xs tracking-[0.35em] uppercase mb-4">{t.reservations.eyebrow}</p>
          <h2
            className="text-5xl lg:text-6xl font-light text-[#3D2B1F] mb-5"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.reservations.heading}
          </h2>
          <p className="text-[#2C1A0E]/55 text-sm max-w-md mx-auto leading-relaxed mb-14">
            {t.reservations.subheading}
          </p>
        </motion.div>

        {/* Phone */}
        <motion.a
          href="tel:+34936846789"
          className="inline-block mb-16 cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
        >
          <span
            className="text-4xl sm:text-5xl lg:text-6xl text-[#3D2B1F] hover:text-[#C4956A] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            +34 936 84 67 89
          </span>
        </motion.a>

        {/* Hours table */}
        <motion.div
          className="bg-[#F0E6D6] rounded-2xl p-8 mb-10 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3
            className="text-2xl text-[#3D2B1F] mb-6 text-left"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.reservations.hoursTitle}
          </h3>
          <table className="w-full text-sm text-[#2C1A0E]">
            <tbody>
              <tr className="border-b border-[#C4956A]/20">
                <td className="py-3 text-left text-[#2C1A0E]/55">{t.reservations.hours.allDays}</td>
                <td className="py-3 text-right font-medium">{t.reservations.hours.allDaysTime}</td>
              </tr>
              <tr className="border-b border-[#C4956A]/20">
                <td className="py-3 text-left text-[#2C1A0E]/55">{t.reservations.hours.brunch}</td>
                <td className="py-3 text-right font-medium">{t.reservations.hours.brunchTime}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[#2C1A0E]/40 text-xs mt-4 text-center italic">
            {t.reservations.hours.note}
          </p>
        </motion.div>

        {/* Two locations */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              className="bg-[#F0E6D6] rounded-2xl p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.35 }}
            >
              <div className="w-8 h-8 rounded-full bg-[#C4956A] flex items-center justify-center text-white text-xs font-semibold mb-4">
                {loc.index}
              </div>
              <p className="text-[#3D2B1F] font-medium text-sm mb-0.5">{loc.address}</p>
              <p className="text-[#2C1A0E]/55 text-xs">{loc.neighborhood}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
