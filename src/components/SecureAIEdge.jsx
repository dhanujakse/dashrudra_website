const SecureAIEdge = () => {
  const advantages = [
    {
      num: "01",
      title: "Local Tamil Nadu Presence",
      desc: "Based in Madurai, we offer direct hands-on support. We physically visit your premises to map workflows, deploy bots, and train your staff without distant call-center delays."
    },
    {
      num: "02",
      title: "Cybersecurity Infrastructure Built-In",
      desc: "Every script, invoice pipeline, and chatbot is constructed on cybersecurity first-principles. We protect your company data, financial logs, and customer sheets from digital leaks."
    },
    {
      num: "03",
      title: "No Per-User License Traps",
      desc: "Enterprise workflow platforms charge billing fees for every employee slot. We build tailored operational software under a flat-retainer model. Scale your team with zero extra fees."
    }
  ];

  return (
    <section id="edge" className="edge section-padding">
      <div className="container">
        <h2 className="section-title title-glow-blue">The SecureAI Edge</h2>
        <p className="section-subtitle">
          Why local enterprises and organizations choose our student-engineered workflows over generic, expensive corporate automation packages.
        </p>
        
        <div className="edge-grid">
          {advantages.map((adv, index) => (
            <div className="cyber-card edge-card" key={index}>
              <div className="edge-num">{adv.num}</div>
              <h4 className="edge-title brand-font">{adv.title}</h4>
              <p className="edge-desc">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecureAIEdge;
