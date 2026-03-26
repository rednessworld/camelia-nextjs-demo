'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type MenuItem = {
  name: string;
  description?: string;
  price: string;
  note?: string;
};

type MenuGroup = {
  heading: string;
  items: MenuItem[];
};

type CategoryData =
  | { kind: 'grouped'; groups: MenuGroup[] }
  | { kind: 'flat'; items: MenuItem[] };

// ─── Menu data (Catalan — from physical menu) ─────────────────────────────

const categories = ['BrunchLunch', 'BeguesCalentes', 'EspecialsLattes', 'BegesFredes'] as const;
type Category = (typeof categories)[number];

const menuData: Record<Category, CategoryData> = {

  BrunchLunch: {
    kind: 'grouped',
    groups: [
      {
        heading: 'El Dolç',
        items: [
          {
            name: 'Pancakes amb Fruites',
            description: 'Pancakes de vainilla, fruites de temporada, mel de proximitat i iogurt grec',
            price: '€10.80',
          },
          {
            name: 'Torrada Dolça',
            description: 'Pa de massa mare amb crema de cacauets, plàtans caramel·litzats, nabius i coco en escates',
            price: '€9.90',
          },
          {
            name: 'Torrada Francesa',
            description: 'Pa de mantega, crema de formatge mascarpone cítric, fruites de temporada i plàtans caramel·litzats',
            price: '€11.50',
          },
          {
            name: 'Iogurt amb Fruites',
            description: 'Iogurt grec, granola casolana, fruites de temporada i mel de proximitat',
            price: '€8.50',
          },
          {
            name: 'Pastisseria',
            description: 'Enfornem tots els nostres pastissos diàriament al nostre obrador',
            price: 'des de €4.50',
          },
        ],
      },
      {
        heading: 'El Salat',
        items: [
          {
            name: 'Bagel de Salmó',
            description: 'Pa bagel amb formatge crema de nabius vermells dessecats, nous caramel·litzades i cebollí, salmó fumat i rul·los de carbassó',
            price: '€11.80',
            note: 'Extra alvocat +2,50€',
          },
          {
            name: 'Torrada de Pernil Serrano',
            description: 'Pa de massa mare, melmelada de tomàquet, pernil salat, formatge de cabra caramel·litzat, mel, nous i romaní',
            price: '€11.80',
          },
          {
            name: "Torrada d'Alvocat",
            description: 'Pa de massa mare, base de formatge crema batut, alvocat, ou escalfat, raves, magrana i farigola',
            price: '€11.80',
          },
          {
            name: 'Croissant Benedictí',
            description: 'Croissant de mantega, espinacs baby, carn de vedella fumada, 2 ous escalfats coberts amb salsa casolana benedict',
            price: '€13.90',
            note: 'Opció base alvocat o salmó',
          },
          {
            name: 'Esmorzar Americà',
            description: 'Torrada de pa de massa mare, 3 ous campers remenats, Pernil Dolç i formatge crema',
            price: '€11.50',
            note: 'Extra alvocat +2,50€',
          },
          {
            name: 'Burrata Pizzeta',
            description: 'Pizzeta de massa mare, pesto casolà, girgoles saltejades amb oli de sèsam, carbassons, burrata i festucs',
            price: '€13.90',
          },
        ],
      },
      {
        heading: 'Amanides',
        items: [
          {
            name: 'Poke Bowl',
            description: 'Quinoa, ou dur, edamames, formatge crema, salmó fumat, blat de moro, alvocat, salsa teriyaki i llavors de sèsam',
            price: '€12.50',
          },
          {
            name: 'Fil Fil Hummus',
            description: 'Mix de verds, verdures grillades, falafel casolà, hummus i salsa tzatziki',
            price: '€13.50',
          },
          {
            name: 'Amanida Fresca',
            description: 'Fulles verdes, pastanagues rostides, tires Heura, magrana, formatge de cabra caramel·litzat, amanida amb salsa de mel i mostassa',
            price: '€13.50',
          },
        ],
      },
    ],
  },

  BeguesCalentes: {
    kind: 'flat',
    items: [
      { name: 'Espresso Simple', price: '€1.50' },
      { name: 'Espresso Doble', price: '€1.60' },
      { name: 'Tallat', price: '€1.80' },
      { name: 'Long Black / Americà', price: '€2.00' },
      { name: 'Latte Macchiato', price: '€3.00' },
      { name: 'Cafè amb Llet', price: '€2.20' },
      { name: 'Flat White', price: '€2.80' },
      { name: 'Cappuccí', price: '€2.20' },
      { name: 'Motxa', price: '€3.00' },
      { name: 'Xocolata a la Tassa', price: '€2.80 — €3.00' },
    ],
  },

  EspecialsLattes: {
    kind: 'grouped',
    groups: [
      {
        heading: 'Cafès Especials',
        items: [
          {
            name: 'Spiced Latte',
            description: 'Doble shot de cafè especiat amb canyella i nou moscada, llet emulsionada, nata muntada i xarop de caramel',
            price: '€4.50',
          },
          {
            name: 'Motxa Lover',
            description: 'Doble shot de cafè, cacau amarg, llet emulsionada, nata muntada, xarop de xocolata i encenalls de xocolata',
            price: '€4.50',
          },
          {
            name: 'Café Irlandés',
            description: 'Doble shot de cafè, rom daurat, llet emulsionada i xarop de xocolata',
            price: '€4.50',
          },
        ],
      },
      {
        heading: 'Matchas & Lattes',
        items: [
          { name: 'Lavanda Latte', price: '€4.50' },
        ],
      },
    ],
  },

  BegesFredes: {
    kind: 'flat',
    items: [],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────


function MenuCard({ item, index, groupLabel }: { item: MenuItem; index: number; groupLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        padding: '28px',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Top section */}
      <div>
        <p style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: '13px',
          color: '#C4956A',
          marginBottom: '6px',
          fontWeight: 400,
        }}>
          {groupLabel}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontWeight: '700',
          fontSize: '22px',
          color: '#E8C9A0',
          lineHeight: '1.3',
          margin: 0,
        }}>
          {item.name}
        </h3>
        {item.description && (
          <p style={{ color: 'rgba(232,201,160,0.7)', fontSize: '14px', lineHeight: '1.6', marginTop: '12px', marginBottom: 0 }}>
            {item.description}
          </p>
        )}
        {item.note && (
          <p style={{ color: '#C4956A', fontSize: '12px', fontStyle: 'italic', marginTop: '6px' }}>
            {item.note}
          </p>
        )}
      </div>

      {/* Bottom section — price */}
      <div style={{ marginTop: '20px' }}>
        <span style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontWeight: '700',
          fontSize: '28px',
          color: '#E8C9A0',
          lineHeight: 1,
        }}>
          {item.price}
        </span>
      </div>
    </motion.div>
  );
}

function CoffeeRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="flex items-center justify-between py-3.5 border-b border-[#C4956A]/10 last:border-0 group"
    >
      <span
        className="text-[#E8C9A0]/80 text-[1.05rem] group-hover:text-[#E8C9A0] transition-colors"
        style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
      >
        {item.name}
      </span>
      <span className="text-[#C4956A] font-medium text-sm flex-shrink-0 ml-4">
        {item.price}
      </span>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('BrunchLunch');
  const { t } = useLanguage();

  const data = menuData[activeCategory];
  const isCoffeeList = activeCategory === 'BeguesCalentes';
  const isEmpty = data.kind === 'flat' && data.items.length === 0;

  return (
    <section id="menu" className="pt-24 pb-12 bg-[#3D2B1F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#C4956A] text-xs tracking-[0.35em] uppercase mb-4">
            {t.menu.eyebrow}
          </p>
          <h2
            className="text-5xl lg:text-6xl font-light text-[#E8C9A0]"
            style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)' }}
          >
            {t.menu.heading}
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[11px] tracking-widest uppercase cursor-pointer transition-all duration-300 rounded-full border ${
                activeCategory === cat
                  ? 'bg-[#C4956A] border-[#C4956A] text-white'
                  : 'border-[#C4956A]/35 text-[#E8C9A0]/55 hover:border-[#C4956A]/70 hover:text-[#E8C9A0]'
              }`}
            >
              {t.menu.categories[cat]}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >

            {/* ── Flat coffee list (Begudes Calentes) ── */}
            {isCoffeeList && data.kind === 'flat' && (
              <div className="max-w-sm mx-auto bg-white/[0.03] border border-[#C4956A]/15 rounded-2xl px-8 py-6">
                {data.items.map((item, i) => (
                  <CoffeeRow key={item.name} item={item} index={i} />
                ))}
              </div>
            )}

            {/* ── Grouped (Brunch & Lunch / Especials & Lattes) ── */}
            {data.kind === 'grouped' && (
              <div className="grid sm:grid-cols-2 gap-5">
                {data.groups.flatMap((group) =>
                  group.items.map((item, i) => (
                    <MenuCard key={item.name} item={item} index={i} groupLabel={group.heading} />
                  ))
                )}
              </div>
            )}

            {/* ── Empty state ── */}
            {isEmpty && (
              <p className="text-center text-[#E8C9A0]/30 text-sm tracking-wider py-12">
                Pròximament
              </p>
            )}

          </motion.div>
        </AnimatePresence>

        <p className="text-center text-[#E8C9A0]/25 text-xs tracking-wider mt-14">
          {t.menu.footer}
        </p>
      </div>
    </section>
  );
}
