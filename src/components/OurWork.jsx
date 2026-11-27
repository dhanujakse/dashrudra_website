import { CheckCircle2, Code, Layers, Sparkles, ExternalLink } from 'lucide-react';

const OurWork = ({ onOpenDemo }) => {
  const projects = [
    {
      title: "Hall Harmony — Examination & Seating Management System",
      status: "Active Institutional Deployment",
      statusColor: "#4ADE80",
      problem: "Educational institutions spend days manually compiling seating arrangements, cross-referencing subject codes to prevent adjacent conflicts, and drafting printed room rosters.",
      approach: "Engineered an algorithmic seating assignment platform that takes student and hall matrices, runs automated conflict-free constraint solving, and generates print-ready room rosters in seconds.",
      techStack: ["React 19", "Vite", "Algorithmic Solver", "Encrypted Roster Database"],
      results: "Deploys conflict-free seating maps for multi-hall examinations with zero manual roster compilation, eliminating scheduling friction.",
      hasLiveDemo: true
    },
    {
      title: "Automated Enterprise Messaging & Enquiry Dispatch",
      status: "Custom Architecture",
      statusColor: "#318BFF",
      problem: "Customer enquiries arrived through fragmented WhatsApp numbers and contact forms, resulting in delayed responses and lost leads.",
      approach: "Built a centralized webhook pipeline connecting WhatsApp Business APIs to an internal triage queue, triggering automated acknowledgement, data capture, and staff notifications.",
      techStack: ["WhatsApp Business API", "Node.js", "Webhook Ingestion", "Secure Event Bus"],
      results: "Eliminates response lag for incoming queries, automatically captures verified customer details, and routes priority requests to staff.",
      hasLiveDemo: false
    },
    {
      title: "Automated Invoicing & Operational Ledger Pipeline",
      status: "Custom Architecture",
      statusColor: "#318BFF",
      problem: "Staff spent multiple hours daily manually copying numbers from hand-filled registers into accounting sheets, resulting in transcription errors and late reconciliations.",
      approach: "Developed an automated validation pipeline with structured OCR parsing and automatic schema mapping to ingest transaction logs directly into unified digital ledgers.",
      techStack: ["Python", "OCR Pipeline", "REST APIs", "Relational Database"],
      results: "Eliminates manual re-entry, automatically highlights discrepancies for review, and prepares daily reconciled balance summaries.",
      hasLiveDemo: false
    },
    {
      title: "Upcoming Project Showcase",
      status: "In Active Engineering",
      statusColor: "#94A3B8",
      problem: "Additional custom software, AI workflow systems, and client integrations currently underway.",
      approach: "Each solution is engineered to address validated operational bottlenecks following our 5-stage discovery and build methodology.",
      techStack: ["AI Agents", "Cloud Integrations", "Custom Web"],
      results: "Case study information and verified operational metrics will be published upon deployment completion.",
      hasLiveDemo: false,
      isPlaceholder: true
    }
  ];

  return (
    <section
      id="our-work"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #060E1D 0%, #081730 50%, #050B16 100%)',
        position: 'relative',
        borderTop: '1px solid rgba(198, 206, 216, 0.08)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Proven Deployments</span>
          </div>

          <h2 className="section-title">
            Ideas built into real solutions.
          </h2>

          <p className="section-description">
            A look at real systems we design and engineer. Built to eliminate manual overhead, ensure reliability, and deliver measurable operational clarity.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: proj.isPlaceholder ? 'rgba(7, 19, 38, 0.4)' : 'rgba(7, 19, 38, 0.75)',
                border: proj.isPlaceholder ? '1px dashed rgba(198, 206, 216, 0.2)' : '1px solid rgba(198, 206, 216, 0.15)',
                borderRadius: '18px',
                position: 'relative',
              }}
            >
              <div>
                {/* Status Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '100px',
                      background: 'rgba(5, 11, 22, 0.6)',
                      border: `1px solid ${proj.statusColor}44`,
                      color: proj.statusColor,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: proj.statusColor,
                        display: 'inline-block',
                      }}
                    />
                    {proj.status}
                  </span>

                  {proj.hasLiveDemo && (
                    <button
                      onClick={onOpenDemo}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--electric-blue)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Request Demo</span>
                      <ExternalLink size={14} />
                    </button>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    color: 'var(--pearl-white)',
                    marginBottom: '1.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  {proj.title}
                </h3>

                {/* Problem Statement */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#FF7B7B',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    The Problem:
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                    {proj.problem}
                  </p>
                </div>

                {/* Our Approach */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--electric-blue)',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Our Approach:
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--metallic-silver)', lineHeight: 1.6 }}>
                    {proj.approach}
                  </p>
                </div>

                {/* Actual Results */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#4ADE80',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Practical Impact:
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--silver-bright)', lineHeight: 1.6 }}>
                    {proj.results}
                  </p>
                </div>
              </div>

              {/* Technologies Used */}
              <div
                style={{
                  borderTop: '1px solid rgba(198, 206, 216, 0.1)',
                  paddingTop: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: 'var(--slate)',
                        background: 'rgba(16, 38, 74, 0.6)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(198, 206, 216, 0.1)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
