import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const SolutionsPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const navigate = useNavigate();

  const solutions = [
    {
      index: "01",
      category: "Intelligent Systems",
      title: "AI-Powered Business Tools",
      summary: "Custom AI utilities that extract answers from unstructured business documents, assist routine inquiries, and accelerate decision-making.",
      problem: "Staff spend excessive time manually searching across fragmented PDFs, spreadsheets, and internal chats to verify policies or extract details.",
      howItWorks: "We engineer scoped retrieval and model pipelines connected strictly to verified business data, delivering instant factual answers with source references.",
      outcomes: "Reduces information retrieval time from minutes to seconds, improving staff efficiency and customer response speed."
    },
    {
      index: "02",
      category: "Process Engineering",
      title: "Workflow Automation",
      summary: "End-to-end automated pipelines connecting internal forms, approval chains, databases, and notifications with zero manual steps.",
      problem: "Operational progress stalls when tasks rely on employees manually emailing reminders, copying entries, or notifying the next team member.",
      howItWorks: "We implement event-driven webhook architectures that automatically execute the next sequence of steps whenever a designated trigger occurs.",
      outcomes: "Eliminates administrative bottlenecks and prevents manual human transcription errors across routine sequences."
    },
    {
      index: "03",
      category: "Communication",
      title: "WhatsApp & Communication Automation",
      summary: "Automated instant messaging workflows that handle inbound inquiries, dispatch booking verifications, and send real-time alerts.",
      problem: "High drop-off rates when prospective customers wait hours for responses, coupled with staff burnout during peak inquiry periods.",
      howItWorks: "We connect official messaging APIs with structured verification logic to address FAQs, confirm requests, and log records automatically.",
      outcomes: "Provides immediate, 24/7 engagement with prospective clients while routing complex situations cleanly to human personnel."
    },
    {
      index: "04",
      category: "Software Architecture",
      title: "Business Management Systems",
      summary: "Centralized operational portals and dashboards engineered precisely around your organization's hierarchy and workflow.",
      problem: "Commercial off-the-shelf software packages are often bloated with unnecessary features or too rigid to accommodate actual operations.",
      howItWorks: "We design and build bespoke administrative platforms that mirror your company's actual operational flow, approval tiers, and roles.",
      outcomes: "Provides complete visibility over operations, unified access to records, and software staff actually enjoys using."
    },
    {
      index: "05",
      category: "Web Engineering",
      title: "Custom Web Applications",
      summary: "High-performance, secure web applications designed for customer interaction, operational management, or self-service.",
      problem: "Generic template builders fail to deliver the speed, custom business logic, and security modern operations demand.",
      howItWorks: "We engineer lightweight, modular web platforms using modern architectures, robust security standards, and responsive interfaces.",
      outcomes: "Delivers a fast, seamless experience for end-users while giving your business full ownership over its digital assets."
    },
    {
      index: "06",
      category: "Autonomous Systems",
      title: "AI Agents & Intelligent Workflows",
      summary: "Autonomous digital agents capable of executing multi-step verifications, cross-checking sources, and handling complex flows.",
      problem: "Multi-stage administrative processes requiring data checks across three different tools consume substantial full-time oversight.",
      howItWorks: "We configure specialized AI agents equipped with scoped tools to inspect records, execute checks, and flag anomalies for human review.",
      outcomes: "Automates multi-step procedures with continuous validation checks, delivering velocity without sacrificing human oversight."
    },
    {
      index: "07",
      category: "Data Pipelines",
      title: "Data Processing & Reporting Automation",
      summary: "Automated ingestion, validation, and structured visual reporting of operational, transactional, and inventory datasets.",
      problem: "Executive reports are delivered days late because staff must manually clean, format, and aggregate multiple disparate spreadsheets.",
      howItWorks: "We construct automated ETL pipelines that ingest raw inputs, validate anomalies, and produce live dashboards and scheduled summaries.",
      outcomes: "Enables real-time operational visibility and completely eliminates spreadsheet copy-paste discrepancies."
    },
    {
      index: "08",
      category: "Digital Evolution",
      title: "Digital Transformation Solutions",
      summary: "Strategic migration of legacy, paper-reliant, or spreadsheet-dependent operations into resilient automated workflows.",
      problem: "Established businesses struggle with legacy paper logs and fragmented processes that hinder scaling and make auditing difficult.",
      howItWorks: "We evaluate operational friction points, plan a step-by-step modernization roadmap, and deploy solutions without disrupting current revenue.",
      outcomes: "Modern, streamlined operations that scale smoothly, minimize operational vulnerability, and empower teams to do their best work."
    }
  ];

  const handleToggle = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="page-screen">
      <div className="page-container">
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="editorial-kicker">
            <span>Our Solutions</span>
          </div>

          <h1 className="editorial-heading">
            Turning possibilities into practical solutions.
          </h1>

          <p className="editorial-subheading">
            Our service capabilities are engineered to solve specific operational friction points. Select any capability to inspect the problem addressed, the technical approach, and the practical outcome.
          </p>
        </div>

        {/* Solutions Capability List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '4rem'
          }}
        >
          {solutions.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={item.index}
                style={{
                  background: isExpanded ? 'var(--surface-elevated)' : 'var(--surface-panel)',
                  border: isExpanded ? '1px solid var(--border-active)' : '1px solid var(--border-hairline)',
                  borderRadius: '4px',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden'
                }}
              >
                {/* Header Row */}
                <div
                  onClick={() => handleToggle(idx)}
                  style={{
                    padding: '1.75rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: isExpanded ? 'var(--electric-blue)' : 'var(--slate)'
                      }}
                    >
                      {item.index}
                    </span>

                    <div>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--slate)',
                          display: 'block',
                          marginBottom: '2px'
                        }}
                      >
                        {item.category}
                      </span>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: 'var(--pearl-white)'
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        color: isExpanded ? 'var(--electric-blue)' : 'var(--slate)',
                        transition: 'transform 0.25s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'none'
                      }}
                    >
                      <ChevronDown size={20} />
                    </span>
                  </div>
                </div>

                {/* Expanded Editorial Drawer */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 2rem 2.25rem 2rem',
                      borderTop: '1px solid var(--border-hairline)',
                      paddingTop: '1.75rem'
                    }}
                  >
                    <p style={{ fontSize: '1rem', color: 'var(--silver-light)', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {item.summary}
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2rem',
                        marginBottom: '2rem',
                        background: 'rgba(5, 11, 22, 0.45)',
                        padding: '1.5rem',
                        border: '1px solid var(--border-hairline)'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F87171', display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>
                          The Challenge Addressed
                        </span>
                        <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                          {item.problem}
                        </p>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--electric-blue)', display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>
                          Our Approach
                        </span>
                        <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                          {item.howItWorks}
                        </p>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4ADE80', display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>
                          Business Impact
                        </span>
                        <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                          {item.outcomes}
                        </p>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => navigate('/contact', { state: { solution: item.title } })}
                        className="btn-action btn-primary"
                        style={{ fontSize: '0.82rem', padding: '0.7rem 1.5rem' }}
                      >
                        <span>Discuss This Solution</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
              Have an operational challenge not listed above? We design custom software tailored to unique requirements.
            </span>
          </div>

          <Link to="/contact" className="btn-action btn-outline">
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
