import { motion } from 'motion/react';

const facilities = [
  {
    name: 'Infinity Pool',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop',
  },
  {
    name: 'Executive Lounge',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop',
  },
  {
    name: 'Private Gym',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2000&auto=format&fit=crop',
  },
];

export default function Facilities() {
  return (
    <section id="fasilitas" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4 block">Gaya Hidup</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Fasilitas Bintang 6 di Halaman Belakang Anda.
            </h2>
          </div>
          <p className="text-gray-400 font-light max-w-sm">
            Setiap detail dirancang untuk memberikan pengalaman hidup tak tertandingi bagi Anda dan keluarga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((fac, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative aspect-[4/5] group overflow-hidden bg-gray-900"
            >
              <img
                src={fac.image}
                alt={fac.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-serif text-2xl font-medium tracking-wide">{fac.name}</h3>
                <div className="w-0 h-0.5 bg-gold mt-4 transition-all duration-500 group-hover:w-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
