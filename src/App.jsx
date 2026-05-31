import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import { ShieldCheck } from 'lucide-react';
import './App.css';

function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="app-container text-light">
      <Navbar />
      <main>
        <Hero onOpenDemo={() => setIsDemoModalOpen(true)} />
        <About />
        <Problem />
        <Solution />
        <Services />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />

      {/* Global B2B 10-Min Live Demo Modal popup */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      {/* Floating Glowing B2B sticky CTA button in bottom-right */}
      <button 
        onClick={() => setIsDemoModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          background: 'var(--primary-gold)',
          color: '#0B1F3A',
          border: 'none',
          borderRadius: '50px',
          padding: '0.85rem 1.5rem',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.9rem',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(212, 175, 55, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.4)';
        }}
      >
        <ShieldCheck size={18} />
        Book 10-Min Demo
      </button>
    </div>
  );
}

export default App;
