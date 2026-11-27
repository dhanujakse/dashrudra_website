import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cpu,
  Workflow,
  Code2,
  TrendingUp,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import Footer from './Footer';

const PILLARS = [
  {
    icon: <Cpu size={28} color="#318BFF" />,
    number: '01',
    title: 'AI & Intelligent Automation',
    tagline: 'Autonomous precision across operations',
    description: 'We design custom autonomous agents and predictive models that eliminate manual decision-making bottlenecks and execute repetitive operational tasks with zero fatigue.'
  },
  {
    icon: <Workflow size={28} color="#C6CED8" />,
    number: '02',
    title: 'Workflow Transformation',
    tagline: 'End-to-end operational clarity',
    description: 'We audit your existing operational workflows, strip away manual friction, and build connected pipelines that allow data to move seamlessly between your teams and software tools.'
  },
  {
    icon: <Code2 size={28} color="#245B9E" />,
    number: '03',
    title: 'Custom Software Engineering',
    tagline: 'Bespoke high-performance systems',
    description: 'When off-the-shelf software falls short, we architect tailored platforms, secure APIs, and responsive web portals built specifically around your exact business mechanics.'
  },
  {
    icon: <TrendingUp size={28} color="#318BFF" />,
    number: '04',
    title: 'Measurable Practical ROI',
    tagline: 'Quantifiable time and capital return',
    description: 'We do not build technology for the sake of novelty. Every solution is engineered to deliver immediate tangible value: operational hours saved, faster turnaround, and zero clerical error.'
  }
];

const SOLUTIONS = [
  {
    id: 'workflow-auto',
    badge: 'Operations',
    title: 'Autonomous Workflow Automation',
    desc: 'Eliminate repetitive data-entry, approval loops, and manual cross-system reconciliation with resilient event-driven pipelines.',
    metrics: '85% Reduction in cycle time',
    capabilities: [
      'Multi-system data sync without manual exports',
      'Automated multi-tier approval chains',
      'Error-trapping & proactive anomaly notifications',
      'Full audit trail and compliance logging'
    ]
  },
  {
    id: 'doc-intelligence',
    badge: 'Cognitive AI',
    title: 'Intelligent Document Processing',
    desc: 'Transform messy PDFs, invoices, contracts, and scanned forms into structured, queryable data feeding directly into your ERP/CRM.',
    metrics: '99.4% Extraction accuracy',
    capabilities: [
      'Multi-lingual layout-aware optical extraction',
      'Automatic entity validation & 3-way matching',
      'Line-item reconciliation against purchase orders',
      'Zero-human touch for standard documentation'
    ]
  },
  {
    id: 'conversational-ops',
    badge: 'Enterprise Intelligence',
    title: 'Contextual AI & Knowledge Agents',
    desc: 'Empower your teams and customers with AI agents trained strictly on your internal procedures, documentation, and product catalogs.',
    metrics: 'Instant contextual answers',
    capabilities: [
      'Private Retrieval-Augmented Generation (RAG)',
      'Enterprise role-based access security',
      'Autonomous customer support triage',
      'Real-time synthesis of complex internal reports'
    ]
  },
  {
    id: 'custom-platforms',
    badge: 'Engineering',
    title: 'Tailored Enterprise Software',
    desc: 'High-availability bespoke web applications, client portals, and mission-critical backends engineered for security and scale.',
    metrics: 'Engineered for 10x growth',
    capabilities: [
      'Modern microservice and serverless architectures',
      'Strict SOC2 / GDPR compliant data governance',
      'Bespoke executive analytics dashboards',
      'High-throughput custom REST & GraphQL APIs'
    ]
  }
];

const METHODOLOGY = [
  {
    step: '01',
    title: 'Understand & Diagnose',
    desc: 'We spend time inside your day-to-day operations, auditing existing workflows, logging manual friction, and pinpointing exact automation opportunities with highest ROI.'
  },
  {
    step: '02',
    title: 'Architect & Engineer',
    desc: 'We design custom AI agents and software architectures tailored to your existing infrastructure, ensuring complete data security, low latency, and reliability.'
  },
  {
    step: '03',
    title: 'Deploy & Integrate',
    desc: 'We roll out solutions with zero operational downtime, validating each workflow through rigorous automated test suites and seamless API connectors.'
  },
  {
    step: '04',
    title: 'Continuously Optimize',
    desc: 'Technology is never static. We continuously monitor throughput, refine AI models with real operational feedback, and expand capabilities as your business scales.'
  }
];

const MainHomepageContent = () => {
  const [activeSolution, setActiveSolution] = useState(0);

  return (
    <div style={{ position: 'relative', zIndex: 10, background: '#050B16' }}>
      {/* 1. Executive Purpose Statement */}
      <section
        style={{
          padding: '6rem 0 5rem 0',
          borderBottom: '1px solid var(--border-hairline)',
          background: 'radial-gradient(ellipse at top, rgba(16, 38, 74, 0.45) 0%, rgba(5, 11, 22, 1) 75%)'
        }}
      >
        <div className="page-container" style={{ maxWidth: '980px', textAlign: 'center' }}>
          <div className="editorial-kicker" style={{ justifyContent: 'center' }}>
            <span>OUR PURPOSE</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
              fontWeight: '700',
              lineHeight: 1.2,
              marginBottom: '1.75rem',
              color: '#FFFFFF'
            }}
          >
            To make life easier, businesses more efficient and technology more meaningful.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              color: 'var(--metallic-silver)',
              lineHeight: 1.8,
              maxWidth: '820px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            We help companies eliminate repetitive manual work, simplify their operations and focus their time and energy on activities that actually create value.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/solutions" className="btn-action btn-primary">
              <span>View All Solutions</span>
              <ArrowRight size={16} />
            </Link>

            <Link to="/purpose" className="btn-action btn-outline">
              <span>Read Our Purpose</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Strategic Pillars */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="page-container">
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
            <div className="editorial-kicker">
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '1rem' }}>
              Strategic Engineering for Practical Business Impact
            </h2>
            <p style={{ color: 'var(--slate)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              We combine deep systems architecture with practical AI to replace disjointed manual processes with unified automated systems.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {PILLARS.map((p) => (
              <div
                key={p.number}
                style={{
                  background: 'rgba(7, 19, 38, 0.7)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '10px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(49, 139, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hairline)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '10px',
                      background: 'rgba(16, 38, 74, 0.8)',
                      border: '1px solid rgba(198, 206, 216, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {p.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--slate)', fontWeight: '700' }}>
                    {p.number}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.4rem', color: '#FFFFFF' }}>
                  {p.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--electric-blue)', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                  {p.tagline}
                </span>

                <p style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Interactive Solutions */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-hairline)', background: 'rgba(7, 19, 38, 0.4)' }}>
        <div className="page-container">
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
            <div className="editorial-kicker">
              <span>SOLUTIONS IN ACTION</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '1rem' }}>
              Built for Concrete Results, Not Theoretical Experiments
            </h2>
            <p style={{ color: 'var(--slate)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Select a solution below to explore the architecture, business metrics, and core enterprise capabilities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Selector List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SOLUTIONS.map((sol, idx) => {
                const isSelected = activeSolution === idx;
                return (
                  <button
                    key={sol.id}
                    onClick={() => setActiveSolution(idx)}
                    style={{
                      background: isSelected ? 'rgba(16, 38, 74, 0.9)' : 'rgba(7, 19, 38, 0.6)',
                      border: isSelected ? '1px solid var(--electric-blue)' : '1px solid var(--border-hairline)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 10px 30px rgba(49, 139, 255, 0.15)' : 'none'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--electric-blue)' : 'var(--slate)', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                        {sol.badge}
                      </span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: isSelected ? '#FFFFFF' : 'var(--metallic-silver)' }}>
                        {sol.title}
                      </h4>
                    </div>
                    <ChevronRight size={18} color={isSelected ? '#318BFF' : 'var(--slate)'} />
                  </button>
                );
              })}
            </div>

            {/* Right Active Solution Deep Dive */}
            <div
              style={{
                background: 'rgba(7, 19, 38, 0.85)',
                border: '1px solid var(--border-active)',
                borderRadius: '12px',
                padding: '2.5rem',
                backdropFilter: 'blur(16px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    background: 'rgba(49, 139, 255, 0.15)',
                    border: '1px solid rgba(49, 139, 255, 0.4)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--electric-blue)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {SOLUTIONS[activeSolution].badge}
                </span>

                <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={15} />
                  {SOLUTIONS[activeSolution].metrics}
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '1rem', color: '#FFFFFF' }}>
                {SOLUTIONS[activeSolution].title}
              </h3>

              <p style={{ color: 'var(--metallic-silver)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                {SOLUTIONS[activeSolution].desc}
              </p>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.75rem' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', display: 'block', marginBottom: '1rem' }}>
                  Enterprise Architecture Features
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  {SOLUTIONS[activeSolution].capabilities.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--pearl-white)' }}>
                      <CheckCircle2 size={16} color="#318BFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/solutions" className="btn-action btn-primary" style={{ display: 'inline-flex' }}>
                  <span>Explore Solution Deep-Dive</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Deliver */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="page-container">
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
            <div className="editorial-kicker">
              <span>OUR METHODOLOGY</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '1rem' }}>
              How We Turn Everyday Friction Into Automated Efficiency
            </h2>
            <p style={{ color: 'var(--slate)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Our delivery framework is structured around operational discipline, transparent deliverables, and continuous velocity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {METHODOLOGY.map((m) => (
              <div
                key={m.step}
                style={{
                  background: 'rgba(7, 19, 38, 0.5)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '10px',
                  padding: '2.25rem 1.75rem',
                  position: 'relative'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: 'var(--electric-blue)',
                    display: 'block',
                    marginBottom: '1rem'
                  }}
                >
                  {m.step}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.75rem', color: '#FFFFFF' }}>
                  {m.title}
                </h3>

                <p style={{ color: 'var(--slate)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive CTA */}
      <section
        style={{
          padding: '7rem 0',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(7, 19, 38, 0.6) 0%, rgba(5, 11, 22, 1) 100%)'
        }}
      >
        <div className="page-container" style={{ maxWidth: '780px' }}>
          <div className="editorial-kicker" style={{ justifyContent: 'center' }}>
            <span>ENGAGE WITH DASHRUDRA</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: '700',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: '#FFFFFF'
            }}
          >
            Ready to eliminate manual work and build what matters?
          </h2>

          <p style={{ color: 'var(--metallic-silver)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Schedule an initial consultation with our engineering team to review your workflow bottlenecks and map out a practical automation roadmap.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-action btn-primary" style={{ padding: '0.9rem 2.25rem', fontSize: '0.95rem' }}>
              <span>Start a Project Discussion</span>
              <ArrowRight size={16} />
            </Link>

            <Link to="/work" className="btn-action btn-outline" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
              <span>Review Our Work</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default MainHomepageContent;