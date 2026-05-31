import { 
  FileSearch, 
  ClipboardList, 
  Cpu, 
  ShieldCheck, 
  HeartHandshake, 
  Network 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <FileSearch size={40} />,
      title: "1. Recognizing the Problem",
      desc: "We visit your facility to deep-dive into your registers, spreadsheet logs, and daily tasks. We identify exactly where time is lost and where your data is vulnerable to leaks."
    },
    {
      icon: <ClipboardList size={40} />,
      title: "2. Thorough Case Study",
      desc: "We construct a comprehensive operational blueprint. We map out your custom automated flow pathways, database targets, and security protocols before writing a line of code."
    },
    {
      icon: <Cpu size={40} />,
      title: "3. Bespoke Custom Engineering",
      desc: "Our services are unlimited. We build exactly what you need, whether it is a WhatsApp enquiry bot, clinic roster, hospital intake log, or staff attendance registry."
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "4. Cybersecurity Hardening",
      desc: "Leveraging our cybersecurity background, every pipeline is fully encrypted, sandbox-isolated, and heavily protected from external exposures or internal data leaks."
    },
    {
      icon: <HeartHandshake size={40} />,
      title: "5. Lifelong Active Assistance",
      desc: "We don't just deploy and disappear. We stand by our clients, providing active server audits, prompt tuning, threat monitoring, and dedicated developer assistance always."
    },
    {
      icon: <Network size={40} />,
      title: "6. Unlimited Scale Capabilities",
      desc: "We connect local retail drawers to complex multi-branch databases. No matter how custom your spreadsheets or operational procedures are, we automate them."
    }
  ];

  return (
    <section id="services" className="services section-padding" style={{ backgroundColor: '#0B1F3A' }}>
      <div className="container">
        <h2 className="section-title">Bespoke Automation & Security Services</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 4rem', lineHeight: '1.6' }}>
          We are not a template vendor. We recognize your unique operations, write a comprehensive custom case study, build secure workflow systems tailored to you, and provide active support indefinitely.
        </p>
        
        <div className="services-grid">
          {services.map((svc, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                {svc.icon}
              </div>
              <h3 className="service-title brand-font">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
