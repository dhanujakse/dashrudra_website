import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WhatWeDoPage = () => {
  const pillars = [
    {
      id: "01",
      title: "Artificial Intelligence",
      summary: "We develop intelligent solutions that help businesses understand information, simplify decisions and improve everyday operations.",
      scope: [
        "Domain-specific document comprehension and extraction",
        "Natural language assistants for internal knowledge access",
        "Predictive operational indicators to avert bottlenecks",
        "Automated semantic categorization of business records"
      ]
    },
    {
      id: "02",
      title: "Intelligent Automation",
      summary: "We automate repetitive workflows, connect business processes and reduce unnecessary manual effort.",
      scope: [
        "Autonomous event-driven cross-system synchronization",
        "WhatsApp Business and instant messaging notification triggers",
        "Automated transactional approval and verification sequences",
        "Structured periodic reporting and data distribution"
      ]
    },
    {
      id: "03",
      title: "Custom Technology Solutions",
      summary: "We design and develop software tailored to real business requirements, creating solutions that fit the way businesses actually work.",
      scope: [
        "Bespoke administrative portals and management platforms",
        "High-performance operational databases and REST APIs",
        "Custom web applications engineered with zero template bloat",
        "Long-term maintainable architectures with complete client ownership"
      ]
    }
  ];

  return (
    <div className="page-screen">
      <div className="page-container">
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="editorial-kicker">
            <span>What We Do</span>
          </div>

          <h1 className="editorial-heading">
            Technology that works for you.
          </h1>

          <p className="editorial-subheading">
            We focus our engineering on three core capabilities built to eliminate operational friction and make technology genuinely meaningful.
          </p>
        </div>

        {/* 3 Core Pillars List / Editorial Panels */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              style={{
                background: 'var(--surface-panel)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '4px',
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: '80px 1.2fr 1.6fr',
                gap: '2.5rem',
                alignItems: 'start'
              }}
              className="pillar-editorial-card"
            >
              {/* Pillar Number */}
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: 'var(--steel-blue)',
                  lineHeight: 1
                }}
              >
                {pillar.id}
              </span>

              {/* Title & Summary */}
              <div>
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: '700',
                    color: 'var(--pearl-white)',
                    marginBottom: '1rem'
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.98rem', color: 'var(--metallic-silver)', lineHeight: 1.65 }}>
                  {pillar.summary}
                </p>
              </div>

              {/* Scope & Deliverables */}
              <div
                style={{
                  borderLeft: '1px solid var(--border-hairline)',
                  paddingLeft: '2rem'
                }}
                className="pillar-scope-col"
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--slate)',
                    display: 'block',
                    marginBottom: '1rem'
                  }}
                >
                  Engineering Scope
                </span>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {pillar.scope.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--slate)',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        lineHeight: 1.5
                      }}
                    >
                      <span style={{ color: 'var(--electric-blue)', fontSize: '0.9rem' }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action Row */}
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
            <span style={{ fontSize: '0.85rem', color: 'var(--slate)' }}>
              Ready to see the practical implementation of these pillars across real business operations?
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/solutions" className="btn-action btn-primary">
              <span>Explore Solutions</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoPage;
