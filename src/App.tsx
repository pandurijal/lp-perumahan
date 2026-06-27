import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Facilities from './components/Facilities';
import FloorPlans from './components/FloorPlans';
import Location from './components/Location';
import LeadForm from './components/LeadForm';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import AuthModal from './components/AuthModal';
import { supabase } from './lib/supabase';

export default function App() {
  const isAdmin = window.location.pathname === '/admin';
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="font-sans">
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} user={user} />
      <Hero />
      <Pillars />
      <Facilities />
      <FloorPlans />
      <Location />
      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

