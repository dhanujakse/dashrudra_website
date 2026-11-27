import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PurposePage = () => {
  const frictionPoints = [
    {
      title: "Data Replication",
      detail: "Manual copying of client information, invoices, and roster data between spreadsheets and systems, creating silent errors and administrative fatigue."
    },
    {
      title: "Disconnected Operations",
      detail: "Isolated software silos requiring constant manual synchronization, copy-pasting, and reconciliation."
    },
    {
      title: "Routine Inquiries",
      detail: "Answering identical customer, vendor, and stakeholder queries dozens of times every day instead of deploying intelligent automated channels."
    },
    {
      title: "Process Friction",
      detail: "Chasing routine internal approvals, follow-up messages, and checklist items that should trigger autonomously."
    }
  ];

  return (
    <div className="page-screen">
      <div className="page-container">
        <div style={{ maxWidth: '840px' }}>
          <div className="editorial-kicker">
            <span>Our Purpose</span>
          </div>

          <h1 className="editorial-heading">
            Your time is too valuable for repetitive work.
          </h1>

          <p className="editorial-subheading">
            Every day, businesses spend valuable time performing tasks that could be handled more efficiently.
          </p>

          <p className="editorial-copy" style={{ marginBottom: '2rem' }}>
            Copying information, managing repetitive processes, handling routine enquiries, organizing records and switching between disconnected systems. These activities consume time, energy and resources that could be invested in growth.
          </p>

          <p className="editorial-copy" style={{ marginBottom: '3rem', color: 'var(--silver-light)' }}>
            We believe technology should take care of repetitive work so people can focus on what truly matters.
          </p>
        </div>

        {/* Operational Friction Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {frictionPoints.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface-panel)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '4px',
                padding: '2rem 1.75rem',
                borderLeft: '2px solid var(--steel-blue)'
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: 'var(--pearl-white)',
                  marginBottom: '0.65rem'
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.65 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Closing Statement */}
        <div
          style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--electric-blue)',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              Guiding Principle
            </span>
            <p
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: '700',
                color: 'var(--pearl-white)',
                lineHeight: 1.35
              }}
            >
              "Let people focus on progress. Let technology handle repetition."
            </p>
          </div>

          <Link to="/what-we-do" className="btn-action btn-primary">
            <span>Discover Our Capabilities</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurposePage;
