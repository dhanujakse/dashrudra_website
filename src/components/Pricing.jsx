import { ShieldCheck, Percent } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: "Quick-Wins Package",
      setupFee: "₹8,000",
      retainer: "₹1,999 / month",
      desc: "Perfect for local retail shops, clinics, and traders wanting immediate release from passive administration traps.",
      features: [
        "1 Custom WhatsApp AI Enquiry Bot",
        "Automated Payment Follow-Up flow",
        "Staff Attendance & Payroll logger",
        "Email & WhatsApp chat support",
        "Basic operational encryption"
      ],
      popular: false,
      btnText: "Claim Quick-Wins Demo"
    },
    {
      name: "Institutional Scale",
      setupFee: "₹45,000",
      retainer: "₹4,999 / month",
      desc: "Perfect for colleges, clinics, and multi-branch setups seeking cohesive, automated operational control.",
      features: [
        "Hall Harmony Seating module included",
        "Full WhatsApp Automated invoicing",
        "Integrates with active student/client vaults",
        "Priority developer support (24h SLA)",
        "Daily automated secure backups"
      ],
      popular: true,
      btnText: "Request Flagship Demo"
    },
    {
      name: "Enterprise Custom Suite",
      setupFee: "₹1,50,000",
      retainer: "₹12,499 / month",
      desc: "For larger organizations needing deep knowledge processing and highly audited internal compliance protocols.",
      features: [
        "Private Internal RAG Chatbot (RAG)",
        "Cryptographic Workflow Approval portals",
        "Infinite custom endpoints & API hooks",
        "Direct Hotline & dedicated engineer",
        "Complete enterprise-grade security hardening"
      ],
      popular: false,
      btnText: "Request custom demo"
    }
  ];

  return (
    <section id="pricing" className="pricing section-padding">
      <div className="container">
        <h2 className="section-title title-glow-green">Transparent Pricing</h2>
        <p className="section-subtitle">
          Affordable operational automation. Pay an upfront setup fee, followed by a flat monthly maintenance retainer. No hidden user seat licensing trap.
        </p>

        <div className="pricing-grid">
          {tiers.map((tier, index) => (
            <div className={`cyber-card pricing-card ${tier.popular ? 'popular' : ''}`} key={index}>
              {tier.popular && <span className="popular-badge">Highly Recommended</span>}
              
              <div className="pricing-header">
                <h3 className="pricing-tier-name">{tier.name}</h3>
                <p className="pricing-desc">{tier.desc}</p>
                <div className="pricing-price-box">
                  <span className="pricing-setup-fee">{tier.setupFee}</span>
                  <span className="pricing-setup-label">One-Time Setup Fee</span>
                  <span className="pricing-retainer">Retainer: {tier.retainer}</span>
                </div>
              </div>

              <ul className="pricing-features-list">
                {tier.features.map((feature, idx) => (
                  <li className="pricing-feature-item" key={idx}>
                    <ShieldCheck className="pricing-feature-check" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pricing-btn-container">
                <a href="#contact" className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'}`}>
                  {tier.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="launch-offer-banner">
          <h4 className="launch-offer-title">
            <Percent size={18} />
            Exclusive Launch Client Incentive
          </h4>
          <p className="launch-offer-desc">
            To scale up our real-world portfolio, we are offering an immediate <strong>50% OFF</strong> all one-time setup fees for our first <strong>3 launch clients</strong>! Standard flat maintenance retainers still apply. Secure your slot now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
