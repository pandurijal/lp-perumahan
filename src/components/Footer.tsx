export default function Footer() {
  return (
    <footer className="bg-[#151515] text-white/50 py-12 text-center border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-2xl font-bold text-white mb-6">The Everest</h2>
        <p className="text-sm font-light mb-8 max-w-md mx-auto">
          Bukan Sekadar Rumah, Ini adalah Warisan.<br />
          Investasi Prestise untuk Masa Depan Anda.
        </p>
        <div className="flex justify-center space-x-6 text-sm uppercase tracking-wider mb-12">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} The Everest Residences. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
