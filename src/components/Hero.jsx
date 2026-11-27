import { useEffect, useState } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import HeroScene3D from './HeroScene3D';

const Hero = ({ onOpenDemo }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 1.2)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 20%, #0d254c 0%, #071326 45%, #050b16 100%)',
      }}
    >
      {/* 3D Rotating Earth, Compass-Star & Flowing Curves */}
      <HeroScene3D scrollProgress={scrollProgress} />

      {/* Atmospheric Horizon Light Glow at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140%',
          height: '240px',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(49, 139, 255, 0.35) 0%, rgba(36, 91, 158, 0.15) 40%, rgba(5, 11, 22, 0) 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ textAlign: 'center', zIndex: 3, maxWidth: '1000px' }}>
        {/* Brand Tagline Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.45rem 1.25rem',
            borderRadius: '9999px',
            background: 'rgba(16, 38, 74, 0.65)',
            border: '1px solid rgba(198, 206, 216, 0.25)',
            backdropFilter: 'blur(12px)',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Compass size={16} color="#318BFF" />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.22em',
              color: 'var(--metallic-silver)',
              textTransform: 'uppercase',
            }}
          >
            DASHRUDRA &bull; STRATEGY. INSIGHT. IMPACT.
          </span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.8vw, 4.8rem)',
            fontWeight: '800',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
          }}
        >
          <span className="silver-gradient-text" style={{ display: 'block' }}>
            Less Repetition.
          </span>
          <span className="blue-gradient-text" style={{ display: 'block' }}>
            More Possibilities.
          </span>
        </h1>

        {/* Supporting Headline */}
        <h2
          style={{
            fontSize: 'clamp(1.15rem, 2.2vw, 1.65rem)',
            fontWeight: '500',
            color: 'var(--silver-bright)',
            marginBottom: '1.5rem',
            maxWidth: '820px',
            margin: '0 auto 1.5rem auto',
            lineHeight: 1.4,
          }}
        >
          We turn everyday business challenges into intelligent solutions.
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.98rem, 1.25vw, 1.15rem)',
            color: 'var(--slate)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.7,
          }}
        >
          We build AI-powered solutions, automate repetitive workflows and develop technology that makes businesses work smarter.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#what-we-do"
            className="btn btn-primary"
            style={{ padding: '0.95rem 2.2rem', fontSize: '1rem' }}
          >
            <span>Explore What We Do</span>
            <ArrowRight size={18} />
          </a>

          <button
            onClick={onOpenDemo}
            className="btn btn-outline"
            style={{ padding: '0.95rem 2.2rem', fontSize: '1rem' }}
          >
            <Sparkles size={17} color="#318BFF" />
            <span>Let's Work Together</span>
          </button>
        </div>

        {/* Visual Cue: Continuous Flow Downward */}
        <div
          style={{
            marginTop: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.75,
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--slate)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Scroll to Journey
          </span>
          <div
            style={{
              width: '1px',
              height: '34px',
              background: 'linear-gradient(180deg, #318BFF 0%, rgba(49, 139, 255, 0) 100%)',
              animation: 'scrollPulse 2s infinite ease-in-out',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
