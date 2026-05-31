import { CheckCircle2, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';

const Solution = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Bespoke Automation Engineering",
      desc: "No template traps. We study your active processes, locate manual drag, and build software built strictly around your operation.",
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: "Seamless Workflow Integration",
      desc: "We connect invoicing registers, client enquiries, and inventory rosters into centralized, lightweight automated dashboards.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Cryptographic Data Protection",
      desc: "Every automated pipeline and cloud entry is isolated, encrypted, and monitored by cybersecurity engineers to guarantee data integrity.",
    },
    {
      icon: <HeartHandshake size={24} />,
      title: "Lifelong Active Assistance",
      desc: "We stand behind our software. We monitor connections, run threat audits, and provide continuous developer assistance always.",
    }
  ];

  return (
    <section id="solution" className="solution section-padding">
      <div className="container">
        <h2 className="section-title">Our Solution <span className="text-gold">(Custom AI & Security)</span></h2>
        
        <div className="solution-container">
          <div className="solution-features">
            <h3 className="brand-font" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-light)' }}>
              Tailored Automation Portals
            </h3>
            
            {features.map((feature, i) => (
              <div className="feature-item animate-fade-in" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="feature-icon-wrapper icon-gold">
                  {feature.icon}
                </div>
                <div className="feature-text">
                  <h4 className="brand-font">{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
            
            <div style={{ marginTop: '2rem' }}>
              <a href="#contact" className="btn btn-primary">
                Preview Our Systems
              </a>
            </div>
          </div>
          
          <div className="mockup-container animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="mockup-header">
              <div className="mockup-dot dot-red"></div>
              <div className="mockup-dot dot-yellow"></div>
              <div className="mockup-dot dot-green"></div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: '10px' }}>
                dashrudra.tech / dashboard / operational-overview
              </span>
            </div>
            <div className="mockup-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ width: '150px', height: '24px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                <div style={{ width: '80px', height: '24px', background: 'var(--primary-gold)', borderRadius: '4px' }}></div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ height: '60px', background: '#cbd5e1', borderRadius: '6px' }}></div>
                <div style={{ height: '60px', background: '#cbd5e1', borderRadius: '6px' }}></div>
                <div style={{ height: '60px', background: '#cbd5e1', borderRadius: '6px' }}></div>
              </div>
              
              <table className="mock-table">
                <thead>
                  <tr>
                    <th>Organization / Flow</th>
                    <th>Automated Pipeline</th>
                    <th>Security Protocol</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Kumbakonam Hospital</td><td>Patient Registry Log</td><td>AES-256 Encrypted</td><td style={{ color: 'green' }}>Active</td></tr>
                  <tr><td>Tamil Nadu Traders</td><td>WhatsApp Invoice Auto-Chaser</td><td>Tokenized Sandbox</td><td style={{ color: 'green' }}>Active</td></tr>
                  <tr><td>Trichy Matriculation</td><td>Staff Payroll & Leaves</td><td>Access Hardened</td><td style={{ color: 'green' }}>Active</td></tr>
                  <tr><td>Madurai Clinics</td><td>Daily Appointment Booking</td><td>AES-256 Encrypted</td><td style={{ color: 'green' }}>Active</td></tr>
                </tbody>
              </table>
              
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', padding: '5px 10px', background: 'rgba(212, 175, 55, 0.2)', color: '#b48608', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                Audited & Encrypted Flow
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
