import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import AboutSection from '@/components/sections/AboutSection';
import MenuSection from '@/components/sections/MenuSection';
import GallerySection from '@/components/sections/GallerySection';
import ReservationsSection from '@/components/sections/ReservationsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LocationSection from '@/components/sections/LocationSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/video7.mp4"
        bgImageSrc="/images/hero2.png"
        scrollToExpand="Descubre Camelia"
      />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ReservationsSection />
      <TestimonialsSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
