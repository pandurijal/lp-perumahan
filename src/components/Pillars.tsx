import { ArrowUpFromLine, Smartphone, TreePine } from 'lucide-react';
import { motion } from 'motion/react';

const pillars = [
  {
    icon: ArrowUpFromLine,
    title: 'Private Lift',
    description: 'Akses eksklusif dan privat langsung dari garasi menuju setiap lantai hunian Anda.',
  },
  {
    icon: Smartphone,
    title: 'Smart Home System',
    description: 'Kendali 1-sentuhan untuk pencahayaan, suhu, dan sistem keamanan premium.',
  },
  {
    icon: TreePine,
    title: '70% Green Area',
    description: 'Harmoni konsep resort mewah di tengah hiruk pikuk pusat kota.',
  },
];

export default function Pillars() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-charcoal mb-4">
            The Exclusivity
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group flex flex-col items-center text-center p-8 border border-gray-100 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 bg-white"
              >
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500">
                  <Icon size={36} className="text-charcoal group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4 text-charcoal">{pillar.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
