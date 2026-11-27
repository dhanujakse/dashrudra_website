import { Copy, Layers, MessageSquare, Database, RefreshCw, Clock, ArrowRight } from 'lucide-react';

const Problem = () => {
  const painPoints = [
    {
      icon: <Copy size={24} />,
      title: "Copying Information",
      description: "Re-typing customer details, invoices, and roster data between spreadsheets and tools manually, causing silent errors and hours lost."
    },
    {
      icon: <Layers size={24} />,
      title: "Managing Repetitive Processes",
      description: "Chasing routine internal approvals, follow-up notifications, and checklist items that should trigger themselves without manual oversight."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Handling Routine Enquiries",
      description: "Answering the exact same customer and stakeholder questions dozens of times daily instead of deploying intelligent automated channels."
    },
    {
      icon: <Database size={24} />,
      title: "Organizing Scattered Records",
      description: "Filing receipts, attendance logs, and transactional records in chaotic desktop folders and paper sheets with no unified search."
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Disconnected Systems",
      description: "Constantly copy-pasting data back and forth between isolated software that refuses to communicate natively."
    }
  ];

  return (
    <section
      id="problem"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #050B16 0%, #071326 50%, #0A1A33 100%)',
        borderTop: '1px solid rgba(198, 206, 216, 0.08)',
        borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle silver curve accent in background */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(49, 139, 255, 0.08) 0%, rgba(5, 11, 22, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Section Badge */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Clock size={14} />
            <span>The Problem We Solve</span>
          </div>

          <h2 className="section-title">
            Your time is too valuable for repetitive work.
          </h2>

          <p className="section-description">
            Every day, businesses spend valuable time performing tasks that could be handled more efficiently.
            Copying information, managing repetitive processes, handling routine enquiries, organizing records and switching between disconnected systems.
            These activities consume time, energy and resources that could be invested in growth.
          </p>
        </div>

        {/* Repetitive Pain Point Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="glass-panel"
              style={{
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                border: '1px solid rgba(198, 206, 216, 0.12)',
                background: 'rgba(7, 19, 38, 0.6)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(49, 139, 255, 0.1)',
                  border: '1px solid rgba(49, 139, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--electric-blue)',
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--pearl-white)',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--slate)',
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement Callout Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 38, 74, 0.7) 0%, rgba(7, 19, 38, 0.9) 100%)',
            border: '1px solid rgba(49, 139, 255, 0.35)',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #318BFF 50%, transparent 100%)',
            }}
          />

          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--electric-blue)',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            Our Philosophy
          </span>

          <h3
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
              fontWeight: '700',
              lineHeight: 1.3,
              maxWidth: '850px',
              margin: '0 auto 1.25rem auto',
            }}
            className="silver-gradient-text"
          >
            "Let people focus on progress. Let technology handle repetition."
          </h3>

          <p
            style={{
              color: 'var(--metallic-silver)',
              fontSize: '1.05rem',
              maxWidth: '680px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.6,
            }}
          >
            We believe technology should take care of repetitive work so people can focus on what truly matters.
          </p>

          <a
            href="#what-we-do"
            className="btn btn-silver"
            style={{ padding: '0.8rem 2rem', fontSize: '0.95rem' }}
          >
            <span>See How We Help</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Problem;
