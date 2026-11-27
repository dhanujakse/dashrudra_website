import { Compass, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'What We Do', href: '#what-we-do' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'How We Work', href: '#how-we-work' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Who We Are', href: '#who-we-are' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      style={{
        background: '#040812',
        borderTop: '1px solid rgba(198, 206, 216, 0.12)',
        padding: '5rem 0 2.5rem 0',
        position: 'relative',
        color: 'var(--metallic-silver)',
      }}
    >
      <div className="container">
        {/* Top Footer Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <a
              href="#home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                marginBottom: '1.25rem',
              }}
            >
              <img
                src="/logo-star.png"
                alt="DASHRUDRA Compass Star"
                style={{
                  height: '36px',
                  width: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 0 8px rgba(49, 139, 255, 0.4))',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  className="brand-text"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    letterSpacing: '0.14em',
                    lineHeight: 1.1,
                  }}
                >
                  DASHRUDRA
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    color: 'var(--metallic-silver)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    opacity: 0.85,
                  }}
                >
                  STRATEGY. INSIGHT. IMPACT.
                </span>
              </div>
            </a>

            <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We build AI-powered solutions, automate repetitive workflows and develop technology that makes businesses work smarter.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="mailto:dashrudratechorg@gmail.com"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(16, 38, 74, 0.6)',
                  border: '1px solid var(--border-silver)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--pearl-white)',
                  transition: 'all 0.25s ease',
                }}
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(16, 38, 74, 0.6)',
                  border: '1px solid var(--border-silver)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--pearl-white)',
                  transition: 'all 0.25s ease',
                }}
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(16, 38, 74, 0.6)',
                  border: '1px solid var(--border-silver)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--pearl-white)',
                  transition: 'all 0.25s ease',
                }}
                aria-label="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--pearl-white)',
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--slate)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--slate)')}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--pearl-white)',
                marginBottom: '1.25rem',
              }}
            >
              Contact Direct
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--slate)' }}>
                <Mail size={16} color="#318BFF" />
                <a
                  href="mailto:dashrudratechorg@gmail.com"
                  style={{ color: 'var(--metallic-silver)', textDecoration: 'none' }}
                >
                  dashrudratechorg@gmail.com
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--slate)' }}>
                <MapPin size={16} color="#318BFF" />
                <span>Tamil Nadu, India</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                onClick={scrollToTop}
                style={{
                  background: 'rgba(16, 38, 74, 0.6)',
                  border: '1px solid var(--border-silver)',
                  color: 'var(--pearl-white)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--slate)',
          }}
        >
          <div>
            &copy; {currentYear} DASHRUDRA. All Rights Reserved.
          </div>
          <div style={{ fontStyle: 'italic' }}>
            We create technology that gives people more time to do what matters.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
