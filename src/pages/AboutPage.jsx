import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="page-screen">
      <div className="page-container">
        {/* Editorial Header */}
        <div style={{ maxWidth: '840px', marginBottom: '3.5rem' }}>
          <div className="editorial-kicker">
            <span>About DASHRUDRA</span>
          </div>

          <h1 className="editorial-heading">
            We believe technology should make life easier.
          </h1>

          <p className="editorial-subheading">
            Meaningful technology doesn't have to be complicated. We build it to solve real problems and create genuine impact.
          </p>

          <div className="editorial-copy">
            <p style={{ marginBottom: '1.25rem' }}>
              <strong>DashRudra</strong> began with a simple belief: meaningful technology doesn't have to be complicated.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              We believe innovation should solve real problems, simplify everyday work and create opportunities for people and businesses to grow.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              We bring ideas, technical knowledge and a problem-solving mindset together to build solutions that make a difference.
            </p>
            <p style={{ color: 'var(--pearl-white)', fontWeight: '600' }}>
              We don't build technology just to exist. We build it to create impact.
            </p>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {/* Vision */}
          <div
            style={{
              background: 'var(--surface-panel)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '4px',
              padding: '2.5rem',
              borderTop: '2px solid var(--steel-blue)'
            }}
          >
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--electric-blue)',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Our Vision
            </span>

            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: '700',
                color: 'var(--pearl-white)',
                marginBottom: '1rem'
              }}
            >
              Frictionless Enterprise Operations
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--slate)', lineHeight: 1.7 }}>
              To build a world where businesses operate seamlessly without repetitive friction, where intelligent systems work reliably in the background, and human teams are fully empowered to focus their creativity and energy on what matters most.
            </p>
          </div>

          {/* Mission */}
          <div
            style={{
              background: 'var(--surface-panel)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '4px',
              padding: '2.5rem',
              borderTop: '2px solid var(--metallic-silver)'
            }}
          >
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--metallic-silver)',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Our Mission
            </span>

            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: '700',
                color: 'var(--pearl-white)',
                marginBottom: '1rem'
              }}
            >
              Practical Innovation with Real Impact
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--slate)', lineHeight: 1.7 }}>
              To turn everyday operational challenges into robust, intelligent solutions. We deliver practical AI applications, automated workflows, and custom technology tailored directly to how businesses actually work—built with integrity, clarity, and measurable impact.
            </p>
          </div>
        </div>

        {/* Founding Story Narrative */}
        <div
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-hairline)',
            borderRadius: '4px',
            padding: '3rem 2.5rem',
            marginBottom: '4rem'
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--electric-blue)',
                display: 'block',
                marginBottom: '0.75rem'
              }}
            >
              The Founding Story
            </span>

            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: '700',
                color: 'var(--pearl-white)',
                marginBottom: '1.25rem'
              }}
            >
              Built from a passion to solve real problems.
            </h3>

            <p style={{ fontSize: '0.98rem', color: 'var(--slate)', lineHeight: 1.75, marginBottom: '1rem' }}>
              Watching organizations struggle with repetitive paperwork, fragile spreadsheet formulas, and disconnected systems sparked our journey. We observed that technology often promises efficiency but delivers unnecessary complexity.
            </p>

            <p style={{ fontSize: '0.98rem', color: 'var(--slate)', lineHeight: 1.75 }}>
              DASHRUDRA was founded to bridge that exact divide: creating software that is fundamentally practical, direct, and engineered to give people their time back.
            </p>
          </div>
        </div>

        {/* Leadership Placeholders (Exact requirement: Leave photographs empty for now, do not invent bios) */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--slate)',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              Leadership
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--pearl-white)' }}>
              Founding Team
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '800px'
            }}
          >
            {/* Founder Placeholder 1 */}
            <div
              style={{
                background: 'var(--surface-panel)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '4px',
                padding: '2.5rem 2rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '4px',
                  background: 'rgba(16, 38, 74, 0.6)',
                  border: '1px dashed var(--border-hairline)',
                  margin: '0 auto 1.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--slate)'
                }}
              >
                <User size={40} />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--pearl-white)', marginBottom: '0.25rem' }}>
                Founder & Engineering Lead
              </h4>

              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--electric-blue)',
                  display: 'block'
                }}
              >
                DASHRUDRA
              </span>
            </div>

            {/* Founder Placeholder 2 */}
            <div
              style={{
                background: 'var(--surface-panel)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '4px',
                padding: '2.5rem 2rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '4px',
                  background: 'rgba(16, 38, 74, 0.6)',
                  border: '1px dashed var(--border-hairline)',
                  margin: '0 auto 1.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--slate)'
                }}
              >
                <User size={40} />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--pearl-white)', marginBottom: '0.25rem' }}>
                Co-Founder & Technology Lead
              </h4>

              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--electric-blue)',
                  display: 'block'
                }}
              >
                DASHRUDRA
              </span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div
          style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--slate)' }}>
              Let's talk about how DashRudra can help simplify operations and eliminate repetitive tasks for your team.
            </span>
          </div>

          <Link to="/contact" className="btn-action btn-primary">
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
