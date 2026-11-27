import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const CHAPTERS = [
  { path: '/', label: 'Home', number: '01' },
  { path: '/purpose', label: 'Our Purpose', number: '02' },
  { path: '/what-we-do', label: 'What We Do', number: '03' },
  { path: '/solutions', label: 'Solutions', number: '04' },
  { path: '/work', label: 'Our Work', number: '05' },
  { path: '/about', label: 'About Us', number: '06' },
  { path: '/contact', label: 'Contact', number: '07' }
];

const HeaderNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(5, 11, 22, 0.92)'
          : 'linear-gradient(180deg, rgba(5, 11, 22, 0.85) 0%, rgba(5, 11, 22, 0) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--border-hairline)' : '1px solid transparent',
        padding: scrolled ? '1rem 0' : '1.5rem 0'
      }}
    >
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo Presentation */}
        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}
        >
          <img
            src="/logo-star.png"
            alt="DASHRUDRA Compass Star"
            style={{
              height: '34px',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 10px rgba(49, 139, 255, 0.35))'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="brand-title"
              style={{
                fontSize: '1.22rem',
                lineHeight: 1.1,
                letterSpacing: '0.14em'
              }}
            >
              DASHRUDRA
            </span>
            <span
              className="brand-tagline"
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.24em',
                marginTop: '1px'
              }}
            >
              STRATEGY. INSIGHT. IMPACT.
            </span>
          </div>
        </NavLink>

        {/* Desktop Editorial Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="desktop-nav-menu"
        >
          {CHAPTERS.map((ch) => {
            const isActive = location.pathname === ch.path;

            return (
              <NavLink
                key={ch.path}
                to={ch.path}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#FFFFFF' : 'var(--metallic-silver)',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.65rem', color: isActive ? 'var(--electric-blue)' : 'var(--slate-dark)' }}>
                  {ch.number}
                </span>
                <span>{ch.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--electric-blue)'
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Header Right Action & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={() => navigate('/contact')}
            className="btn-action btn-outline header-cta-btn"
            style={{
              padding: '0.55rem 1.25rem',
              fontSize: '0.78rem'
            }}
          >
            <span>Discuss a Project</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-hairline)',
              borderRadius: '4px',
              color: 'var(--pearl-white)',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            borderBottom: '1px solid var(--border-hairline)',
            padding: '2rem 1.5rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CHAPTERS.map((ch) => (
              <NavLink
                key={ch.path}
                to={ch.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  fontWeight: location.pathname === ch.path ? '700' : '500',
                  color: location.pathname === ch.path ? 'var(--electric-blue)' : 'var(--pearl-white)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{ch.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate)' }}>{ch.number}</span>
              </NavLink>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="btn-action btn-primary"
              style={{ marginTop: '0.75rem', width: '100%' }}
            >
              Discuss a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
