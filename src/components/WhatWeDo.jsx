import { Brain, Cpu, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const WhatWeDo = ({ onSelectCategory }) => {
  const pillars = [
    {
      id: "ai",
      number: "01",
      icon: <Brain size={32} />,
      title: "ARTIFICIAL INTELLIGENCE",
      subtitle: "Smart insights & decision support",
      description: "We develop intelligent solutions that help businesses understand information, simplify decisions and improve everyday operations.",
      points: [
        "Natural language understanding for business queries",
        "Document comprehension and automated data extraction",
        "Predictive operational insights to prevent bottlenecks",
        "Intelligent context-aware assistants and copilots"
      ],
      accentColor: "#318BFF"
    },
    {
      id: "automation",
      number: "02",
      icon: <Cpu size={32} />,
      title: "INTELLIGENT AUTOMATION",
      subtitle: "Zero manual friction across workflows",
      description: "We automate repetitive workflows, connect business processes and reduce unnecessary manual effort.",
      points: [
        "Automated cross-system data synchronization",
        "WhatsApp and instant communication triggers",
        "Autonomous routine approvals and invoicing pipelines",
        "Error-free scheduled record updates and notifications"
      ],
      accentColor: "#7CB4FF"
    },
    {
      id: "custom-tech",
      number: "03",
      icon: <Code2 size={32} />,
      title: "CUSTOM TECHNOLOGY SOLUTIONS",
      subtitle: "Bespoke software built for your reality",
      description: "We design and develop software tailored to real business requirements, creating solutions that fit the way businesses actually work.",
      points: [
        "Custom web applications engineered from scratch",
        "Centralized business dashboards and management systems",
        "High-performance operational databases and APIs",
        "Scalable architectures with zero vendor lock-in"
      ],
      accentColor: "#C6CED8"
    }
  ];

  return (
    <section
      id="what-we-do"
      className="section-padding"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #0a1b38 0%, #050b16 100%)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Cpu size={14} />
            <span>Core Capabilities</span>
          </div>

          <h2 className="section-title">
            Technology that works for you.
          </h2>

          <p className="section-description">
            We focus our engineering on three core pillars designed to eliminate operational friction and unleash business potential.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-panel"
              style={{
                padding: '2.75rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(7, 19, 38, 0.75)',
                border: '1px solid rgba(198, 206, 216, 0.15)',
              }}
            >
              {/* Top Accent Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${pillar.accentColor} 0%, transparent 100%)`,
                }}
              />

              <div>
                {/* Header with Number and Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.75rem',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      background: 'rgba(16, 38, 74, 0.8)',
                      border: `1px solid ${pillar.accentColor}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pillar.accentColor,
                      boxShadow: `0 8px 24px ${pillar.accentColor}22`,
                    }}
                  >
                    {pillar.icon}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: '800',
                      color: 'var(--slate)',
                      opacity: 0.35,
                    }}
                  >
                    {pillar.number}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    color: 'var(--pearl-white)',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: pillar.accentColor,
                    fontWeight: '600',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {pillar.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.98rem',
                    color: 'var(--metallic-silver)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem',
                  }}
                >
                  {pillar.description}
                </p>

                {/* Capability Bullet Points */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                    borderTop: '1px solid rgba(198, 206, 216, 0.1)',
                    paddingTop: '1.25rem',
                  }}
                >
                  {pillar.points.map((pt, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        fontSize: '0.88rem',
                        color: 'var(--slate)',
                      }}
                    >
                      <CheckCircle2 size={16} color={pillar.accentColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <a
                href="#solutions"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--pearl-white)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(198, 206, 216, 0.08)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = pillar.accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--pearl-white)')}
              >
                <span>Explore Solutions in this Pillar</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
