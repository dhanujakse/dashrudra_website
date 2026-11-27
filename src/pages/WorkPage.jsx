import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WorkPage = () => {
  const projects = [
    {
      title: "Hall Harmony — Examination & Seating Management Platform",
      status: "Active Institutional Deployment",
      statusColor: "#4ADE80",
      problem: "Educational institutions spend days manually compiling seating arrangements, cross-referencing subject codes to prevent adjacent conflicts, and drafting printed room rosters.",
      approach: "Engineered an algorithmic seating assignment platform that processes student and hall matrices, executes automated conflict-free constraint solving, and produces print-ready room rosters in seconds.",
      tech: ["React 19", "Vite", "Algorithmic Solver", "Encrypted Roster Database"],
      outcome: "Deploys conflict-free seating maps for multi-hall examinations with zero manual roster compilation, eliminating scheduling friction."
    },
    {
      title: "Automated Enterprise Messaging & Inquiry Dispatch",
      status: "Custom Architecture",
      statusColor: "#318BFF",
      problem: "Customer inquiries arrived through fragmented WhatsApp chats and web forms, causing response delays and untracked leads.",
      approach: "Built a centralized webhook pipeline connecting WhatsApp Business APIs to an internal triage queue, triggering automated acknowledgement, structured data capture, and staff alerts.",
      tech: ["WhatsApp Business API", "Node.js", "Webhook Ingestion", "Secure Event Bus"],
      outcome: "Eliminates response lag for incoming queries, automatically captures verified contact details, and routes priority requests to staff."
    },
    {
      title: "Automated Invoicing & Operational Ledger Pipeline",
      status: "Custom Architecture",
      statusColor: "#318BFF",
      problem: "Staff spent multiple hours daily manually copying numbers from hand-filled registers into accounting spreadsheets, leading to transcription errors and late reconciliations.",
      approach: "Developed an automated validation pipeline with structured OCR parsing and automatic schema mapping to ingest transaction logs directly into digital ledgers.",
      tech: ["Python", "OCR Pipeline", "REST APIs", "Relational Database"],
      outcome: "Eliminates manual re-entry, automatically highlights discrepancies for review, and prepares daily reconciled balance summaries."
    },
    {
      title: "Upcoming Project Showcase",
      status: "In Active Engineering",
      statusColor: "#8293AA",
      problem: "Additional custom software, AI workflow systems, and client integrations currently underway.",
      approach: "Each solution is engineered to address validated operational bottlenecks following our 5-stage discovery and build methodology.",
      tech: ["AI Agents", "Cloud Integrations", "Custom Web"],
      outcome: "Case study information and verified operational metrics will be published upon deployment completion.",
      isPlaceholder: true
    }
  ];

  return (
    <div className="page-screen">
      <div className="page-container">
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="editorial-kicker">
            <span>Our Work</span>
          </div>

          <h1 className="editorial-heading">
            Ideas built into real solutions.
          </h1>

          <p className="editorial-subheading">
            A look at real systems we design and engineer. Built to eliminate manual overhead, ensure reliability, and deliver measurable operational clarity.
          </p>
        </div>

        {/* Project Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {projects.map((proj, idx) => (
            <div
              key={idx}
              style={{
                background: proj.isPlaceholder ? 'rgba(7, 19, 38, 0.45)' : 'var(--surface-panel)',
                border: proj.isPlaceholder ? '1px dashed var(--border-hairline)' : '1px solid var(--border-hairline)',
                borderRadius: '4px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Status Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: proj.statusColor,
                      display: 'inline-block'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: proj.statusColor
                    }}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    color: 'var(--pearl-white)',
                    lineHeight: 1.3,
                    marginBottom: '1.5rem'
                  }}
                >
                  {proj.title}
                </h3>

                {/* Challenge */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F87171', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>
                    Operational Challenge
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                    {proj.problem}
                  </p>
                </div>

                {/* Approach */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--electric-blue)', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>
                    Our Approach
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--metallic-silver)', lineHeight: 1.6 }}>
                    {proj.approach}
                  </p>
                </div>

                {/* Practical Impact */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ADE80', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>
                    Practical Impact
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--pearl-white)', lineHeight: 1.6 }}>
                    {proj.outcome}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div
                style={{
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                {proj.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.74rem',
                      color: 'var(--slate)',
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(16, 38, 74, 0.6)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '2px'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
              Interested in how custom automation can be architected for your specific business constraints?
            </span>
          </div>

          <Link to="/contact" className="btn-action btn-primary">
            <span>Discuss a Project</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
