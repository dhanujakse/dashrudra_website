import { Compass, Eye, Target, Sparkles, User, Award } from 'lucide-react';

const WhoWeAre = () => {
  return (
    <section
      id="who-we-are"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #F5F7FA 0%, #E9EFF6 50%, #F5F7FA 100%)',
        color: '#071326',
        position: 'relative',
        borderTop: '1px solid rgba(198, 206, 216, 0.4)',
        borderBottom: '1px solid rgba(198, 206, 216, 0.4)',
      }}
    >
      <div className="container">
        {/* Section Badge */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '100px',
              background: 'rgba(36, 91, 158, 0.1)',
              border: '1px solid rgba(36, 91, 158, 0.25)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#10264A',
              marginBottom: '1.25rem',
            }}
          >
            <Compass size={14} color="#245B9E" />
            <span>About DASHRUDRA</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: '800',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              color: '#071326',
            }}
          >
            We believe technology should make life easier.
          </h2>

          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto 3.5rem auto',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              color: '#334155',
            }}
          >
            <p style={{ marginBottom: '1.25rem' }}>
              <strong>DashRudra</strong> began with a simple belief: <em>meaningful technology doesn't have to be complicated.</em>
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              We believe innovation should solve real problems, simplify everyday work and create opportunities for people and businesses to grow.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              We bring ideas, technical knowledge and a problem-solving mindset together to build solutions that make a difference.
            </p>
            <p style={{ fontWeight: '700', color: '#10264A' }}>
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
            marginBottom: '4.5rem',
          }}
        >
          {/* Vision */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '2.75rem 2.25rem',
              border: '1px solid rgba(36, 91, 158, 0.15)',
              boxShadow: '0 10px 30px rgba(7, 19, 38, 0.06)',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(36, 91, 158, 0.08)',
                border: '1px solid rgba(36, 91, 158, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#245B9E',
                marginBottom: '1.5rem',
              }}
            >
              <Eye size={28} />
            </div>

            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#071326',
                marginBottom: '1rem',
              }}
            >
              Our Vision
            </h3>

            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
              To build a world where businesses operate seamlessly without repetitive friction, where intelligent systems work silently in the background, and human teams are fully empowered to focus their creativity and energy on what matters most.
            </p>
          </div>

          {/* Mission */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '2.75rem 2.25rem',
              border: '1px solid rgba(36, 91, 158, 0.15)',
              boxShadow: '0 10px 30px rgba(7, 19, 38, 0.06)',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(49, 139, 255, 0.08)',
                border: '1px solid rgba(49, 139, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#318BFF',
                marginBottom: '1.5rem',
              }}
            >
              <Target size={28} />
            </div>

            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#071326',
                marginBottom: '1rem',
              }}
            >
              Our Mission
            </h3>

            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
              To turn everyday operational challenges into robust, intelligent solutions. We deliver practical AI applications, automated workflows, and custom technology tailored directly to how businesses actually work—built with integrity, clarity, and measurable impact.
            </p>
          </div>
        </div>

        {/* Founding Story Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #071326 0%, #10264A 100%)',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            color: '#FFFFFF',
            boxShadow: '0 16px 40px rgba(7, 19, 38, 0.15)',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7CB4FF',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              The Founding Story
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                fontWeight: '700',
                marginBottom: '1.25rem',
                color: '#F5F7FA',
              }}
            >
              Built from a passion to solve real problems.
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#C6CED8',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}
            >
              Watching organizations drown in paperwork, loose spreadsheet cells, and disjointed systems sparked our journey. We recognized that technology often promises efficiency but delivers complexity.
            </p>
            <p
              style={{
                fontSize: '1rem',
                color: '#C6CED8',
                lineHeight: 1.75,
              }}
            >
              DASHRUDRA was founded to bridge that exact divide: creating software that is fundamentally practical, direct, and engineered to give people their time back.
            </p>
          </div>
        </div>

        {/* Founders Section (Placeholders for actual photographs, no fabricated bios) */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#245B9E',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Leadership
            </span>
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#071326',
              }}
            >
              Founding Team
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
              Engineers and innovators dedicated to building practical technology with purpose.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            {/* Founder Placeholder 1 */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(36, 91, 158, 0.15)',
                boxShadow: '0 8px 24px rgba(7, 19, 38, 0.05)',
              }}
            >
              {/* Elegant Photo Placeholder */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
                  margin: '0 auto 1.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  color: '#64748B',
                }}
              >
                <User size={48} />
              </div>

              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#071326',
                  marginBottom: '0.35rem',
                }}
              >
                Founder & Engineering Lead
              </h4>

              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#245B9E',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                }}
              >
                DASHRUDRA
              </p>

              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Focused on architecture, systems engineering, and AI automation workflows.
              </p>
            </div>

            {/* Founder Placeholder 2 */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(36, 91, 158, 0.15)',
                boxShadow: '0 8px 24px rgba(7, 19, 38, 0.05)',
              }}
            >
              {/* Elegant Photo Placeholder */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
                  margin: '0 auto 1.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  color: '#64748B',
                }}
              >
                <User size={48} />
              </div>

              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#071326',
                  marginBottom: '0.35rem',
                }}
              >
                Co-Founder & Technology Lead
              </h4>

              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#245B9E',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                }}
              >
                DASHRUDRA
              </p>

              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Dedicated to software design, custom web solutions, and operational integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
