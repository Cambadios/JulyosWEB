import Hero from "../components/Hero";
import MusicSection from "../components/MusicSection";
import GallerySection from "../components/GallerySection";
import AgendaSection from "../components/AgendaSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <MusicSection />
      <GallerySection />
      <AgendaSection />
      <ContactSection />
      <Footer />
    </>
  );
}
