/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Facilities from './components/Facilities';
import FloorPlans from './components/FloorPlans';
import Location from './components/Location';
import LeadForm from './components/LeadForm';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Pillars />
      <Facilities />
      <FloorPlans />
      <Location />
      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

