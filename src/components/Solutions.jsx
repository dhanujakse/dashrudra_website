import { useState } from 'react';
import { 
  Bot, 
  Workflow, 
  MessageSquareCode, 
  Layers, 
  Globe, 
  Cpu, 
  FileSpreadsheet, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react';

const Solutions = ({ onSelectSolution }) => {
  const [expandedId, setExpandedId] = useState(0); // Default open first one

  const solutions = [
    {
      id: 0,
      title: "AI-Powered Business Tools",
      shortDesc: "Custom AI utilities that extract answers from documents, assist customer queries, and accelerate decision-making.",
      icon: <Bot size={26} />,
      badge: "Intelligent Systems",
      problem: "Staff spend countless hours hunting through PDFs, spreadsheets, and messy chat threads to find policy answers or verify client info.",
      howItWorks: "We build tailored AI models and retrieval systems connected strictly to your business knowledge base, delivering instant and accurate answers.",
      achievement: "Reduces information retrieval time from 15 minutes to 3 seconds, enabling instant decisions and higher customer satisfaction."
    },
    {
      id: 1,
      title: "Workflow Automation",
      shortDesc: "End-to-end automated pipelines that connect forms, approvals, databases, and notifications with zero manual steps.",
      icon: <Workflow size={26} />,
      badge: "Process Automation",
      problem: "Team members spend substantial portions of their week manually moving tasks forward, copying numbers, and chasing email follow-ups.",
      howItWorks: "We engineer resilient event-driven webhooks and workflow pipelines that automatically execute the next step the moment a trigger occurs.",
      achievement: "Eliminates human error in routine task sequences and frees up 10 to 15 hours per employee each week for high-value strategic work."
    },
    {
      id: 2,
      title: "WhatsApp & Communication Automation",
      shortDesc: "Smart instant messaging flows that answer inquiries, send booking confirmations, and dispatch timely updates automatically.",
      icon: <MessageSquareCode size={26} />,
      badge: "Smart Messaging",
      problem: "Prospective customers drop off when enquiry replies take hours, while staff gets flooded with repetitive text messages during peak hours.",
      howItWorks: "We integrate official WhatsApp Business APIs with structured conversation logic to verify requests, answer FAQs, and update records instantly.",
      achievement: "24/7 instant response rate for prospective clients, zero unanswered enquiries, and seamless handoff to human staff when complex assistance is needed."
    },
    {
      id: 3,
      title: "Business Management Systems",
      shortDesc: "Unified administrative dashboards and portals built around your exact operational hierarchy and team roles.",
      icon: <Layers size={26} />,
      badge: "Core Software",
      problem: "Off-the-shelf software packages are either overly bloated with useless features or too rigid to fit how your team actually operates.",
      howItWorks: "We design and engineer bespoke management systems that precisely mirror your company's operational flow, approval tiers, and access permissions.",
      achievement: "Centralized visibility over operations, unified data access, and an intuitive interface that staff adopts with zero training friction."
    },
    {
      id: 4,
      title: "Custom Web Applications",
      shortDesc: "Modern, high-performance web platforms and portals designed for client interaction, staff self-service, or commerce.",
      icon: <Globe size={26} />,
      badge: "Custom Web",
      problem: "Generic website builders and sluggish templates fail to deliver the speed, custom logic, and security modern operations require.",
      howItWorks: "We engineer lightweight, blazing-fast web applications using clean modern frameworks, robust security standards, and responsive UI/UX.",
      achievement: "Seamless digital experience for your users, robust performance under load, and complete ownership of your intellectual property."
    },
    {
      id: 5,
      title: "AI Agents & Intelligent Workflows",
      shortDesc: "Autonomous digital agents capable of executing multi-step tasks, cross-verifying records, and handling complex flows.",
      icon: <Cpu size={26} />,
      badge: "Next-Gen AI",
      problem: "Complex operational workflows that require checking three different sources before taking action currently require dedicated full-time oversight.",
      howItWorks: "We configure specialized AI agents equipped with scoped tools to inspect data, execute validations, and flag anomalies for human review.",
      achievement: "Automates multi-step administrative workflows with rigorous validation checks, ensuring speed without sacrificing oversight."
    },
    {
      id: 6,
      title: "Data Processing & Reporting Automation",
      shortDesc: "Automated ingestion, validation, and visual reporting of transactional, financial, and operational datasets.",
      icon: <FileSpreadsheet size={26} />,
      badge: "Data Pipelines",
      problem: "Management receives weekly or monthly performance reports days late because someone has to aggregate and clean multiple Excel spreadsheets by hand.",
      howItWorks: "We construct automated ETL pipelines that ingest raw inputs, validate anomalies, and produce live executive dashboards and auto-emailed summaries.",
      achievement: "Real-time decision intelligence, 100% elimination of spreadsheet copy-paste errors, and automated audit-ready reports."
    },
    {
      id: 7,
      title: "Digital Transformation Solutions",
      shortDesc: "Strategic modernization of traditional, paper-reliant, or legacy operations into efficient digital workflows.",
      icon: <Zap size={26} />,
      badge: "Modernization",
      problem: "Established businesses struggle with legacy paper logs and fragmented processes that hinder scaling and make auditing difficult.",
      howItWorks: "We assess operational bottlenecks, map practical digital replacements step by step, and deploy solutions without disrupting current revenue.",
      achievement: "Modern, streamlined operations that scale smoothly, minimize operational vulnerability, and empower teams to do their best work."
    }
  ];

  const handleCardClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="solutions"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #050B16 0%, #071326 50%, #060E1D 100%)',
        position: 'relative',
        borderTop: '1px solid rgba(198, 206, 216, 0.08)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Service Capabilities</span>
          </div>

          <h2 className="section-title">
            Turning possibilities into practical solutions.
          </h2>

          <p className="section-description">
            Explore our solution categories. Click any capability to see the specific problems it addresses, how it works, and the impact it delivers.
          </p>
        </div>

        {/* Interactive Solutions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {solutions.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  background: isExpanded ? 'rgba(16, 38, 74, 0.9)' : 'rgba(7, 19, 38, 0.65)',
                  borderColor: isExpanded ? 'rgba(49, 139, 255, 0.5)' : 'rgba(198, 206, 216, 0.12)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isExpanded ? '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(49, 139, 255, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
                onClick={() => handleCardClick(item.id)}
              >
                {/* Visible Header / Summary */}
                <div style={{ padding: '2rem 1.75rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: isExpanded ? 'rgba(49, 139, 255, 0.2)' : 'rgba(36, 91, 158, 0.15)',
                        border: '1px solid rgba(49, 139, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--electric-blue)',
                      }}
                    >
                      {item.icon}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '100px',
                          background: 'rgba(198, 206, 216, 0.08)',
                          color: 'var(--metallic-silver)',
                          border: '1px solid rgba(198, 206, 216, 0.15)',
                        }}
                      >
                        {item.badge}
                      </span>
                      <div
                        style={{
                          color: isExpanded ? 'var(--electric-blue)' : 'var(--slate)',
                          transition: 'transform 0.3s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'none',
                        }}
                      >
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--pearl-white)',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--slate)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.shortDesc}
                  </p>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 1.75rem 2rem 1.75rem',
                      borderTop: '1px solid rgba(198, 206, 216, 0.1)',
                      paddingTop: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      background: 'rgba(5, 11, 22, 0.4)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* What Problem It Addresses */}
                    <div>
                      <h4
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#FF6B6B',
                          marginBottom: '0.35rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>The Problem Addressed</span>
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--metallic-silver)', lineHeight: 1.55 }}>
                        {item.problem}
                      </p>
                    </div>

                    {/* How It Works */}
                    <div>
                      <h4
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--electric-blue)',
                          marginBottom: '0.35rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>How The Solution Works</span>
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--metallic-silver)', lineHeight: 1.55 }}>
                        {item.howItWorks}
                      </p>
                    </div>

                    {/* What It Helps Businesses Achieve */}
                    <div>
                      <h4
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#4ADE80',
                          marginBottom: '0.35rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>What Businesses Achieve</span>
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--metallic-silver)', lineHeight: 1.55 }}>
                        {item.achievement}
                      </p>
                    </div>

                    {/* Enquiry CTA for this solution */}
                    <div style={{ paddingTop: '0.75rem' }}>
                      <button
                        onClick={() => onSelectSolution(item.title)}
                        className="btn btn-primary"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1.25rem',
                          fontSize: '0.88rem',
                        }}
                      >
                        <span>Enquire About {item.title}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
