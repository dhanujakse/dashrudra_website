import { FileSpreadsheet, Hourglass, Network, ShieldX } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: <FileSpreadsheet size={32} />,
      title: "Excel & Spreadsheet Reliance",
      desc: "Schools, hospitals, and traders still rely on manual Excel registers and static sheets to track sensitive files, leading to human errors and scheduling leaks."
    },
    {
      icon: <Hourglass size={32} />,
      title: "Manual Overhead Drain",
      desc: "Valuable hours are wasted daily on manual booking check-ins, writing paper invoices, and sending passive payment follow-ups that get ignored."
    },
    {
      icon: <Network size={32} />,
      title: "No Automated Workflows",
      desc: "Operations depend on chaotic, loose papers and unstructured WhatsApp chat groups instead of modern, secure, and auto-triggered software pipelines."
    },
    {
      icon: <ShieldX size={32} />,
      title: "Critical Security Exposures",
      desc: "Patient logs, student registries, and financial transactions are kept in open databases and unprotected spreadsheets, leaving the data fully exposed to leaks."
    }
  ];

  return (
    <section id="problem" className="problem section-padding">
      <div className="container">
        <h2 className="section-title">The Operational Gaps We Solve</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          We have found that many educational institutions, hospitals, and medium-sized businesses rely on basic, static spreadsheets rather than automation. They have not yet integrated secure, AI-powered workflows, resulting in severe operational friction and critical data exposures.
        </p>
        
        <div className="problem-grid">
          {problems.map((prob, index) => (
            <div className="problem-card glass-card" key={index}>
              <div className="problem-icon">
                {prob.icon}
              </div>
              <h3 className="problem-title">{prob.title}</h3>
              <p className="problem-desc">{prob.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
