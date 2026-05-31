import { ShieldAlert } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <a href="#home" className="footer-logo" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', textDecoration: 'none' }}>
          <ShieldAlert className="text-gold" size={24} style={{ flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.15', alignItems: 'flex-start' }}>
            <span className="brand-font" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-light)', letterSpacing: '0.5px' }}>DashRudra</span>
            <span style={{ color: 'var(--primary-gold)', fontSize: '0.62rem', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Secure AI Automation</span>
          </div>
        </a>
        <p className="footer-text">
          Automating Repetitive Workflows. Securely & Affordably. <br />
           Built with pride by Third-Year Cybersecurity Engineering Students.
        </p>
        <p className="footer-text" style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7 }}>
          &copy; {currentYear} DashRudra. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
