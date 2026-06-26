import { MapPin, Navigation, Building, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Location() {
  return (
    <section id="lokasi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4 block">Lokasi Strategis</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-charcoal mb-8">
              Pusat Prestise & Aksesibilitas
            </h2>
            <p className="text-gray-500 font-light text-lg mb-12">
              Berada di koridor utama dengan akses tak tertandingi menuju pusat bisnis dan gaya hidup eksklusif ibukota.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <Navigation size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-semibold mb-2">Akses Cepat</h4>
                  <ul className="text-gray-500 font-light space-y-1">
                    <li>5 Menit ke Gerbang Tol Utama</li>
                    <li>15 Menit ke Bandara Internasional</li>
                    <li>10 Menit ke CBD Area</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <Building size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-semibold mb-2">Gaya Hidup</h4>
                  <ul className="text-gray-500 font-light space-y-1">
                    <li>7 Menit ke Pusat Perbelanjaan Mewah</li>
                    <li>Dikelilingi Restoran Fine Dining</li>
                    <li>Dekat dengan Klub Golf Eksklusif</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <GraduationCap size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-semibold mb-2">Pendidikan & Medis</h4>
                  <ul className="text-gray-500 font-light space-y-1">
                    <li>3 Menit ke Sekolah Internasional</li>
                    <li>5 Menit ke Rumah Sakit Bertaraf Internasional</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            className="lg:col-span-7 order-1 lg:order-2 h-[500px] lg:h-[700px] w-full bg-gray-100 relative group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.70010996847!2d106.74108871037562!3d-6.251411516086704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-all duration-700 group-hover:filter-none"
            ></iframe>
            
            <div className="absolute bottom-6 left-6 right-6 bg-white p-6 shadow-xl max-w-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-serif font-bold text-lg">Marketing Gallery</h4>
                  <p className="text-sm text-gray-500 font-light mt-1">
                    Jl. Boulevard Eksklusif No. 1,<br />Kawasan Premium, Jakarta
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
