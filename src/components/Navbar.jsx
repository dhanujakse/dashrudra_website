import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = ({ onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.35s ease',
        background: scrolled
          ? 'rgba(5, 11, 22, 0.88)'
          : 'linear-gradient(180deg, rgba(5, 11, 22, 0.75) 0%, rgba(5, 11, 22, 0) 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(198, 206, 216, 0.12)' : '1px solid transparent',
        padding: scrolled ? '0.85rem 0' : '1.35rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo Presentation */}
        <a
          href="#home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/logo-star.png"
            alt="DASHRUDRA Compass Star"
            style={{
              height: '38px',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 10px rgba(49, 139, 255, 0.35))',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="brand-text"
              style={{
                fontSize: '1.28rem',
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
                letterSpacing: '0.24em',
                color: 'var(--metallic-silver)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                textTransform: 'uppercase',
                opacity: 0.85,
                marginTop: '1px',
              }}
            >
              STRATEGY. INSIGHT. IMPACT.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.8rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--metallic-silver)',
                fontSize: '0.9rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--metallic-silver)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenDemo}
            className="btn btn-primary nav-cta-btn"
            style={{
              padding: '0.6rem 1.4rem',
              fontSize: '0.85rem',
            }}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-silver)',
              borderRadius: '8px',
              color: 'var(--pearl-white)',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'rgba(5, 11, 22, 0.98)',
            borderBottom: '1px solid var(--border-silver)',
            padding: '2rem 1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--pearl-white)',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
                }}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              Let's Work Together
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
