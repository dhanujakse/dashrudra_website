import { ChevronRight, ShieldCheck } from 'lucide-react';

const Hero = ({ onOpenDemo }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      
      <div className="container">
        <div className="hero-content animate-fade-in">
          <div className="hero-subtitle text-gold brand-font">
            Secure AI Workflow Automation
          </div>
          
          <h1 className="hero-title gradient-text">
            Automating Repetitive Workflows.<br />Securely & Affordably.
          </h1>
          
          <p className="hero-tagline">
            We rescue Tamil Nadu businesses, clinics, and traders from exhausting manual invoicing, messy WhatsApp approval chains, and unprotected paper records with bulletproof cybersecurity infrastructure.
          </p>
          
          <div className="hero-actions">
            <button onClick={onOpenDemo} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <ShieldCheck size={20} />
              Request a 10-Min Live Demo
            </button>
            <a href="#services" className="btn btn-outline">
              Explore Our Solutions
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
