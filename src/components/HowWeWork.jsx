import { Search, Eye, Rocket, Activity } from 'lucide-react';

const HowWeWork = () => {
  const steps = [
    {
      step: "01",
      icon: <Search size={22} />,
      title: "1. Bottleneck Discovery",
      desc: "We analyze your operations to pinpoint where your staff is drowning in repetitive admin tasks, messy WhatsApp chats, or insecure logs."
    },
    {
      step: "02",
      icon: <Eye size={22} />,
      title: "2. 30-Min Custom Demo",
      desc: "Within days, we invite you to a live demo where you watch your *exact* business workflows running automated on our systems."
    },
    {
      step: "03",
      icon: <Rocket size={22} />,
      title: "3. Rapid Deployment",
      desc: "We encrypt, integrate, and deploy your custom workflow pipelines. Your team is up and running on autopilot in days, not months."
    },
    {
      step: "04",
      icon: <Activity size={22} />,
      title: "4. Threat Audit & Support",
      desc: "We actively audit webhook endpoints, monitor for data leaks, and refine LLM prompts to ensure your pipelines remain bulletproof."
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works section-padding">
      <div className="container">
        <h2 className="section-title title-glow-green">How We Work</h2>
        <p className="section-subtitle">
          Our rapid engineering blueprint. From identifying friction to deploying leak-proof operational automation.
        </p>

        <div className="how-grid">
          {steps.map((stepItem, index) => (
            <div className="how-item" key={index}>
              <div className="how-step-box">
                {stepItem.icon}
              </div>
              <h4 className="how-title">{stepItem.title}</h4>
              <p className="how-desc">{stepItem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
