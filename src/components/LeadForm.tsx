import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '250',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isPhoneValid = formData.phone.length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', type: '250' });
    }, 1500);
  };

  return (
    <section id="kontak" className="py-24 bg-charcoal text-white relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Dapatkan Brochure Lengkap & Harga Spesial Early Bird
          </h2>
          <p className="text-lg text-white/70 font-light">
            Isi data di bawah untuk dihubungi oleh Marketing Manager eksklusif kami.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-white/10 backdrop-blur-md p-12 text-center border border-white/20">
            <h3 className="font-serif text-3xl font-bold text-gold mb-4">Terima Kasih</h3>
            <p className="text-white/80 font-light mb-8 text-lg">
              Permintaan Anda telah kami terima. Brochure lengkap akan segera dikirimkan ke WhatsApp/Email Anda, dan Marketing Manager kami akan segera menghubungi.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-sm uppercase tracking-wider text-white border-b border-white hover:text-gold hover:border-gold transition-colors pb-1"
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-charcoal px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className={`w-full bg-gray-50 border ${formData.phone && !isPhoneValid ? 'border-red-400' : 'border-gray-200'} text-charcoal px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
                  placeholder="081234567890"
                />
                {formData.phone && !isPhoneValid && (
                  <p className="text-red-500 text-xs mt-1">Nomor WhatsApp minimal 10 digit.</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email (Opsional)</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-charcoal px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipe Unit Minat *</label>
                <div className="relative">
                  <select
                    id="type"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-charcoal px-4 py-3 appearance-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  >
                    <option value="250">Tipe 250 (4+1 KT)</option>
                    <option value="350">Tipe 350 (5+1 KT)</option>
                    <option value="500">Signature 500 (6+2 KT)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isPhoneValid || isSubmitting}
              className={`w-full py-5 text-center uppercase tracking-widest text-sm font-bold transition-all flex items-center justify-center
                ${!isPhoneValid ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gold text-white hover:bg-gold-hover'}`}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim & Dapatkan Penawaran'}
            </button>

            <div className="mt-6 flex justify-center items-center gap-2 text-gray-400">
              <ShieldCheck size={16} />
              <p className="text-xs font-light">Data Anda aman dan tidak akan disebarkan.</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
