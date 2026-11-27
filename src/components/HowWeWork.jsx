import { useState } from 'react';
import { Search, Compass, Hammer, Cpu, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const HowWeWork = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      step: "01",
      name: "DISCOVER",
      icon: <Search size={22} />,
      headline: "Understand the business, its challenges and existing workflows.",
      details: "We start by observing how work currently flows. Rather than proposing generic tools, we sit with your team to review existing registers, spreadsheet logs, communication channels, and daily routines.",
      deliverables: ["Process mapping", "Friction audit", "Operational workflow inventory"]
    },
    {
      step: "02",
      name: "UNDERSTAND",
      icon: <Compass size={22} />,
      headline: "Identify repetitive tasks, inefficiencies and opportunities for improvement.",
      details: "We pinpoint exactly where team energy is drained on non-productive work. We calculate hours lost to manual copying, delayed approvals, or disparate data silos to establish clear metrics for success.",
      deliverables: ["Bottleneck diagnosis", "Automation scope roadmap", "Impact assessment"]
    },
    {
      step: "03",
      name: "DESIGN & BUILD",
      icon: <Hammer size={22} />,
      headline: "Develop solutions according to actual requirements.",
      details: "Our engineering team designs and crafts the software strictly to match your operational reality. No forced rigid templates; every data model, UI button, and API endpoint is built for your team's natural workflow.",
      deliverables: ["Tailored software build", "Secure database architecture", "Intuitive user interface"]
    },
    {
      step: "04",
      name: "AUTOMATE",
      icon: <Cpu size={22} />,
      headline: "Connect systems and automate processes wherever appropriate.",
      details: "We link your communication channels, forms, and administrative systems into cohesive automated pathways. Repetitive tasks run silently in the background while human staff stays informed through clean notifications.",
      deliverables: ["System integration", "Automated event webhooks", "Notification pipelines"]
    },
    {
      step: "05",
      name: "IMPROVE",
      icon: <TrendingUp size={22} />,
      headline: "Refine solutions through feedback, testing and continuous improvement.",
      details: "Meaningful technology evolves. We gather feedback from real day-to-day usage, monitor performance, and continuously optimize algorithms and workflows to ensure lasting operational impact.",
      deliverables: ["Staff training & feedback loop", "Performance audits", "Ongoing refinement"]
    }
  ];

  return (
    <section
      id="how-we-work"
      className="section-padding"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #0c203f 0%, #050b16 100%)',
        position: 'relative',
        borderTop: '1px solid rgba(198, 206, 216, 0.08)',
        borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Compass size={14} />
            <span>Our Methodology</span>
          </div>

          <h2 className="section-title">
            From everyday challenges to meaningful change.
          </h2>

          <p className="section-description">
            A structured, collaborative approach to eliminating operational friction and building solutions that actually get used.
          </p>
        </div>

        {/* Five-Stage Interactive Visual Timeline */}
        <div
          style={{
            position: 'relative',
            marginBottom: '3.5rem',
          }}
        >
          {/* Horizontal Connecting Guide Line (Desktop) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '5%',
              right: '5%',
              height: '2px',
              background: 'rgba(198, 206, 216, 0.15)',
              zIndex: 1,
            }}
            className="timeline-guide-line"
          />

          {/* Timeline Step Nodes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1rem',
              position: 'relative',
              zIndex: 2,
            }}
            className="timeline-nodes-grid"
          >
            {stages.map((st, idx) => {
              const isActive = activeStage === idx;

              return (
                <div
                  key={st.step}
                  onClick={() => setActiveStage(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {/* Step Bubble */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: isActive ? 'linear-gradient(135deg, #318BFF 0%, #1A64D4 100%)' : 'rgba(7, 19, 38, 0.9)',
                      border: isActive ? '2px solid #FFFFFF' : '2px solid rgba(198, 206, 216, 0.25)',
                      boxShadow: isActive ? '0 0 25px rgba(49, 139, 255, 0.6)' : '0 4px 15px rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? '#FFFFFF' : 'var(--metallic-silver)',
                      transition: 'all 0.3s ease',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.8 }}>{st.step}</span>
                      {st.icon}
                    </div>
                  </div>

                  {/* Stage Label */}
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: isActive ? 'var(--electric-blue)' : 'var(--metallic-silver)',
                      transition: 'color 0.25s ease',
                      textTransform: 'uppercase',
                    }}
                  >
                    {st.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Showcase Card */}
        <div
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
            background: 'rgba(10, 26, 51, 0.85)',
            border: '1px solid rgba(49, 139, 255, 0.35)',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: '800',
                color: 'var(--electric-blue)',
                padding: '0.3rem 0.8rem',
                background: 'rgba(49, 139, 255, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(49, 139, 255, 0.25)',
              }}
            >
              STAGE {stages[activeStage].step}
            </span>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--pearl-white)',
              }}
            >
              {stages[activeStage].name}
            </h3>
          </div>

          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--silver-bright)',
              lineHeight: 1.4,
              marginBottom: '1.25rem',
            }}
          >
            {stages[activeStage].headline}
          </h4>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            {stages[activeStage].details}
          </p>

          {/* Key Deliverables */}
          <div
            style={{
              borderTop: '1px solid rgba(198, 206, 216, 0.12)',
              paddingTop: '1.5rem',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--metallic-silver)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Key Deliverables In This Stage:
            </span>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {stages[activeStage].deliverables.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(5, 11, 22, 0.6)',
                    border: '1px solid rgba(198, 206, 216, 0.15)',
                    fontSize: '0.88rem',
                    color: 'var(--pearl-white)',
                  }}
                >
                  <CheckCircle size={16} color="#318BFF" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
