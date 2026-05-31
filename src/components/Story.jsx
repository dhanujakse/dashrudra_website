import { AlertTriangle, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';

const Story = () => {
  return (
    <section id="journey" className="story section-padding">
      <div className="container">
        <h2 className="section-title title-glow-blue">The Story of Our Evolution</h2>
        <p className="section-subtitle">
          How building a classroom exam hall arranger forced us to witness the digital gaps crippling local business owners—and why we pivoted.
        </p>

        <div className="story-container">
          {/* Problem Column */}
          <div className="story-card-col">
            <div className="cyber-card cyber-card-red" style={{ height: '100%', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
              <div className="story-card-header">
                <div className="story-icon-box red">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="story-card-title text-red">The Real-World Gaps</h3>
              </div>
              
              <ul className="story-list">
                <li className="story-item">
                  <span className="story-item-bullet red">●</span>
                  <div className="story-item-text">
                    <strong>Manual Invoicing & Passive Chasing</strong>
                    <span>Local traders and clinics waste hundreds of hours manually compiling receipts and sending passive texts that clients simply ignore.</span>
                  </div>
                </li>
                
                <li className="story-item">
                  <span className="story-item-bullet red">●</span>
                  <div className="story-item-text">
                    <strong>Messy WhatsApp Approval Chains</strong>
                    <span>Important orders and staff attendance rely on chaotic, unstructured chat strings, leading to lost data and severe processing delays.</span>
                  </div>
                </li>
                
                <li className="story-item">
                  <span className="story-item-bullet red">●</span>
                  <div className="story-item-text">
                    <strong>Unprotected Data & Leak Vulnerabilities</strong>
                    <span>Valuable customer profiles, financial statements, and business logs lie vulnerable in unencrypted sheets or active group chats, fully exposed to digital leaks.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Solution Column */}
          <div className="story-card-col">
            <div className="cyber-card cyber-card-green" style={{ height: '100%', borderColor: 'rgba(34, 197, 94, 0.15)' }}>
              <div className="story-card-header">
                <div className="story-icon-box green">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="story-card-title text-green">The SecureAI Pivot</h3>
              </div>
              
              <ul className="story-list">
                <li className="story-item">
                  <span className="story-item-bullet green">✓</span>
                  <div className="story-item-text">
                    <strong>Autonomous Invoicing Follow-Ups</strong>
                    <span>Payment pipelines are entirely automated. Smart systems generate, distribute, and chase dues securely on autopilot, slashing manual hours.</span>
                  </div>
                </li>
                
                <li className="story-item">
                  <span className="story-item-bullet green">✓</span>
                  <div className="story-item-text">
                    <strong>Structured Workflow Approval Suites</strong>
                    <span>Operational threads are channeled into structured, lightweight dashboards. No logs are lost, and approval steps are fully traceable and audited.</span>
                  </div>
                </li>
                
                <li className="story-item">
                  <span className="story-item-bullet green">✓</span>
                  <div className="story-item-text">
                    <strong>Cybersecurity-First Hardening</strong>
                    <span>As SRM Madurai Cybersecurity engineers, data integrity is our native language. Every pipeline is fully encrypted, sandboxed, and protected against data leaks.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="story-footer-text">
          💡 Our College Proof-of-Concept: We first built <strong>"Hall Harmony"</strong> (a standalone Exam Seating tool) to automate manual hall grids at SRM Madurai. Realizing this security-focused automation could solve massive operational leaks for local MSMEs led to the launch of <strong>SecureAI Automation</strong>.
        </div>
      </div>
    </section>
  );
};

export default Story;
