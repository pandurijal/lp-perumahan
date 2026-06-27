import { useState, useEffect } from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

type NavbarProps = {
  onOpenAuth: () => void;
  user: any;
};

export default function Navbar({ onOpenAuth, user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'Denah', href: '#denah' },
    { name: 'Lokasi', href: '#lokasi' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
          The Everest
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-wide uppercase transition-colors hover:text-gold ${
                isScrolled ? 'text-charcoal/80' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserCircle className={isScrolled ? 'text-charcoal' : 'text-white'} size={24} />
                <span className={`text-sm ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
                  {user.user_metadata?.name || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'bg-gray-200 text-charcoal hover:bg-gray-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className={`px-6 py-2.5 rounded-none text-sm font-medium tracking-wide transition-all ${
                isScrolled
                  ? 'bg-gold text-white hover:bg-gold-hover'
                  : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white hover:text-charcoal'
              }`}
            >
              Masuk / Daftar
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${isScrolled ? 'text-charcoal' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charcoal font-medium text-lg uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <UserCircle className="text-charcoal" size={24} />
                    <span className="text-charcoal font-medium">
                      {user.user_metadata?.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-red-600 font-medium"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gold font-medium"
                >
                  Masuk / Daftar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
