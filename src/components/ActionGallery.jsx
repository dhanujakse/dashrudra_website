import { LayoutGrid, Network, ShieldCheck, Database, Calendar } from 'lucide-react';

const ActionGallery = () => {
  const projects = [
    {
      badge: "LIVE DEPLOYMENT",
      badgeColor: "green",
      title: "Hall Harmony Seating System",
      desc: "Our active institutional deployment for conflict-free academic coordination. Manages exam rooms and coordinates seating algorithms in real-time, eliminating administrative overhead.",
      techs: ["Vite", "React 19", "Cyber Seating Algo", "Secure Logs"],
      graphic: (
        <div className="gallery-graphic-mock">
          <div className="gallery-graphic-header">
            <span className="gallery-graphic-dot green"></span>
            <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              harmony.dashrudra.tech / status
            </span>
          </div>
          <div className="gallery-graphic-body" style={{ background: '#0F172A', color: 'var(--text-pure)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span>Room</span>
              <span>Invigilator</span>
              <span>Capacity</span>
              <span>Status</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#94A3B8', margin: '4px 0' }}>
              <span>Hall 301</span>
              <span>Prof. Smith</span>
              <span>30/30</span>
              <span className="text-green" style={{ fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#94A3B8', margin: '4px 0' }}>
              <span>Hall 302</span>
              <span>Dr. Rajan</span>
              <span>30/30</span>
              <span className="text-green" style={{ fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#94A3B8', margin: '4px 0' }}>
              <span>Hall 303</span>
              <span>Prof. Davis</span>
              <span>28/30</span>
              <span className="text-green" style={{ fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ marginTop: '4px', fontSize: '0.6rem', color: 'var(--accent-green)', background: 'rgba(34, 197, 94, 0.05)', padding: '3px', borderRadius: '4px', textAlign: 'center', border: '1px dashed rgba(34, 197, 94, 0.2)' }}>
              ✓ 100% Conflict-Free Seating Map Established
            </div>
          </div>
        </div>
      )
    },
    {
      badge: "WORKFLOW MAPPING",
      badgeColor: "blue",
      title: "Consolidated Business Pipelines",
      desc: "Our interactive operational blueprint designed for MSMEs. Channels enquiry bots, checkout forms, and payment follow-ups into structured secure arrays.",
      techs: ["WhatsApp API", "AI Routing Node", "Stripe API", "Audits"],
      graphic: (
        <div className="gallery-graphic-mock">
          <div className="gallery-graphic-header">
            <span className="gallery-graphic-dot blue"></span>
            <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              dashrudra / blueprint-visualizer
            </span>
          </div>
          <div className="gallery-graphic-body" style={{ background: '#0F172A', display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-blue)', borderRadius: '4px', padding: '3px 6px', fontSize: '0.6rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Database size={8} /> WhatsApp Node
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>→</span>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--accent-green)', borderRadius: '4px', padding: '3px 6px', fontSize: '0.6rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ShieldCheck size={8} /> AI Core Filter
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '25px' }}>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>↳</span>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid var(--accent-cyan)', borderRadius: '4px', padding: '3px 6px', fontSize: '0.6rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Calendar size={8} /> Auto Invoice Suite
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>→</span>
              <span style={{ fontSize: '0.55rem', color: 'var(--accent-green)', fontWeight: 600 }}>Payment Cleared</span>
            </div>
          </div>
        </div>
      )
    },
    {
      badge: "CYBERSECURITY LAYER",
      badgeColor: "cyan",
      title: "Hardened Data Protection Layer",
      desc: "Our native security infrastructure. Injects isolated sandboxes, locks active access tokens, and shields customer database pools from leaking.",
      techs: ["AES-256", "Token Lock", "OAuth 2.0", "Sec Sandbox"],
      graphic: (
        <div className="gallery-graphic-mock">
          <div className="gallery-graphic-header">
            <span className="gallery-graphic-dot blue"></span>
            <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              dashrudra / sandbox-monitor
            </span>
          </div>
          <div className="gallery-graphic-body" style={{ background: '#0F172A', fontFamily: 'monospace', padding: '8px', overflow: 'hidden' }}>
            <div style={{ fontSize: '0.55rem', color: 'var(--accent-cyan)', margin: '2px 0' }}>[DASHRUDRA_DAEMON] Starting security audit...</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--accent-green)', margin: '2px 0' }}>[INTEGRITY] AES-256 verification complete.</div>
            <div style={{ fontSize: '0.55rem', color: '#94A3B8', margin: '2px 0' }}>[SANDBOX] Data flow restricted to local port.</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--accent-green)', margin: '2px 0' }}>[STATUS] Zero packet leaks detected. LOCKED.</div>
            <div style={{ height: '3px', background: 'var(--accent-green)', width: '100%', marginTop: '6px', borderRadius: '2px', boxShadow: '0 0 6px var(--accent-green)' }}></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="container">
        <h2 className="section-title title-glow-green">DashRudra In Action</h2>
        <p className="section-subtitle">
          Real layouts and functional modules engineered by our student team to streamline business flows and protect customer data.
        </p>

        <div className="gallery-grid">
          {projects.map((proj, index) => (
            <div className="cyber-card gallery-card" key={index}>
              <div className="gallery-img-container">
                <span className={`gallery-badge ${proj.badgeColor}`}>{proj.badge}</span>
                {proj.graphic}
              </div>
              <div className="gallery-card-body">
                <h3 className="gallery-card-title brand-font">{proj.title}</h3>
                <p className="gallery-card-desc">{proj.desc}</p>
                <div className="gallery-card-techs">
                  {proj.techs.map((tech, idx) => (
                    <span className="gallery-tech-tag" key={idx}>{tech}</span>
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

export default ActionGallery;
