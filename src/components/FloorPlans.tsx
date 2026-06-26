import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize, Layout, BedDouble, Bath } from 'lucide-react';

const plans = [
  {
    id: '250',
    name: 'Tipe 250',
    luasTanah: '250 m²',
    luasBangunan: '320 m²',
    kamarTidur: '4 + 1',
    kamarMandi: '4 + 1',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '350',
    name: 'Tipe 350',
    luasTanah: '350 m²',
    luasBangunan: '450 m²',
    kamarTidur: '5 + 1',
    kamarMandi: '5 + 2',
    image: 'https://images.unsplash.com/photo-1600607687931-cebf004f1418?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '500',
    name: 'Signature 500',
    luasTanah: '500 m²',
    luasBangunan: '750 m²',
    kamarTidur: '6 + 2',
    kamarMandi: '7 + 2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  }
];

export default function FloorPlans() {
  const [activePlanId, setActivePlanId] = useState(plans[0].id);

  const activePlan = plans.find(p => p.id === activePlanId)!;

  return (
    <section id="denah" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.2em] text-gold text-sm font-semibold mb-4 block">Koleksi Unit</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-charcoal">
            Mahakarya Arsitektur
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setActivePlanId(plan.id)}
              className={`px-8 py-3 uppercase tracking-wider text-sm font-medium transition-all duration-300 ${
                activePlanId === plan.id
                  ? 'bg-charcoal text-white shadow-lg'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-charcoal hover:text-charcoal'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 shadow-sm border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              <div>
                <h3 className="font-serif text-4xl font-bold text-charcoal mb-4">{activePlan.name}</h3>
                <p className="text-gray-500 font-light text-lg">
                  Dirancang secara teliti untuk memaksimalkan pencahayaan alami dan sirkulasi udara, memberikan ruang yang leluasa untuk setiap momen berharga.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1"><Maximize size={24} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Luas Tanah</p>
                    <p className="text-2xl font-serif font-semibold text-charcoal">{activePlan.luasTanah}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1"><Layout size={24} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Luas Bangunan</p>
                    <p className="text-2xl font-serif font-semibold text-charcoal">{activePlan.luasBangunan}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1"><BedDouble size={24} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Kamar Tidur</p>
                    <p className="text-2xl font-serif font-semibold text-charcoal">{activePlan.kamarTidur}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1"><Bath size={24} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Kamar Mandi</p>
                    <p className="text-2xl font-serif font-semibold text-charcoal">{activePlan.kamarMandi}</p>
                  </div>
                </div>
              </div>

              <a href="#kontak" className="inline-block mt-8 text-gold uppercase tracking-widest text-sm font-semibold hover:text-charcoal transition-colors border-b border-gold hover:border-charcoal pb-1">
                Unduh Spesifikasi Lengkap
              </a>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan.image}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] bg-gray-100 overflow-hidden"
            >
              <img
                src={activePlan.image}
                alt={`Interior ${activePlan.name}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
