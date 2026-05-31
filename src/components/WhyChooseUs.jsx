const WhyChooseUs = () => {
  const reasons = [
    {
      num: "01",
      title: "Bespoke & Unlimited",
      desc: "We do not sell pre-made templates. We recognize your specific problems, write a custom case study, and engineer unique automation built around your exact workflows."
    },
    {
      num: "02",
      title: "Assistance Always",
      desc: "We don't hand over code and disappear. We are your dedicated automation team, providing active support, maintenance, and developer assistance indefinitely."
    },
    {
      num: "03",
      title: "Cyber-Secure Standards",
      desc: "Leveraging our cybersecurity degree credentials, we lock down spreadsheets, isolate active webhooks, and heavily encrypt database layers to prevent data leaks."
    },
    {
      num: "04",
      title: "Local Physical Support",
      desc: "Based in Madurai, we offer direct on-site assistance. We visit your schools, clinics, or MSMEs physically to map processes and train your staff face-to-face."
    }
  ];

  return (
    <section id="why-us" className="why-choose-us section-padding">
      <div className="container">
        <h2 className="section-title">Why Businesses Trust DashRudra</h2>
        
        <div className="why-grid">
          {reasons.map((reason, index) => (
            <div className="why-item" key={index}>
              <div className="why-number">{reason.num}</div>
              <h4 className="why-title brand-font">{reason.title}</h4>
              <p className="why-desc">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
