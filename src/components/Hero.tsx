import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Award, Landmark } from 'lucide-react';
import heroBg from '../../assets/rumahmewahminimalis.jpg';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block uppercase tracking-[0.3em] text-gold text-xs md:text-sm font-semibold mb-6">
            Eksklusivitas Tanpa Batas
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Beyond Luxury.<br />
            <span className="italic text-white/90 font-light">Beyond Expectation.</span>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 text-white/80">
            Kavling Mediterania dengan Private Lift dan Sky Garden di jantung kawasan elit Jakarta Selatan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#kontak"
              className="px-8 py-4 bg-gold text-white uppercase tracking-wider text-sm font-medium hover:bg-gold-hover transition-colors flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              Daftar Kunjungan Eksklusif
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-gold" />
              <span className="text-xs uppercase tracking-wider font-medium">Sertifikat IMB</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-gold" />
              <span className="text-xs uppercase tracking-wider font-medium">Top Property 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark size={20} className="text-gold" />
              <span className="text-xs uppercase tracking-wider font-medium">Didukung Bank Ternama</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
