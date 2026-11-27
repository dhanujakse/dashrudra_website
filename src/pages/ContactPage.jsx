import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

const buildOptions = [
  "Workflow Automation",
  "AI-Powered Business Tools",
  "WhatsApp & Communication Automation",
  "Custom Business Management System",
  "Custom Web Application",
  "AI Agents & Intelligent Workflows",
  "Data Processing & Reporting Automation",
  "Digital Transformation / Other"
];

const ContactPage = () => {
  const location = useLocation();
  const preselected = location.state?.solution || buildOptions[0];

  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    solutionType: preselected,
    challenge: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  useEffect(() => {
    if (location.state?.solution) {
      setFormData((prev) => ({ ...prev, solutionType: location.state.solution }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please provide your name and email address.');
      return;
    }

    setFormStatus('submitting');
    let sent = false;

    // Delivery channel 1: Vercel serverless /api/send-email
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          institution: formData.business,
          email: formData.email,
          mobile: formData.phone,
          message: `Solution Type: ${formData.solutionType}\n\nChallenge:\n${formData.challenge}`
        })
      });
      if (res.ok) sent = true;
    } catch (err) {
      console.warn('API send error', err);
    }

    // Delivery channel 2: FormSubmit.co ajax fallback
    if (!sent) {
      try {
        const targetEmail = import.meta.env.VITE_FORMSUBMIT_EMAIL || 'dashrudratechorg@gmail.com';
        const fsRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New DASHRUDRA Project Enquiry - ${formData.name}`,
            name: formData.name,
            business: formData.business,
            email: formData.email,
            phone: formData.phone,
            solutionType: formData.solutionType,
            challenge: formData.challenge
          })
        });
        if (fsRes.ok) sent = true;
      } catch (err) {
        console.warn('FormSubmit fallback error', err);
      }
    }

    setFormStatus('success');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      business: '',
      email: '',
      phone: '',
      solutionType: buildOptions[0],
      challenge: ''
    });
    setFormStatus('idle');
  };

  return (
    <div className="page-screen">
      <div className="page-container">
        <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
          <div className="editorial-kicker">
            <span>Contact</span>
          </div>

          <h1 className="editorial-heading">
            Have a challenge? Let's solve it.
          </h1>

          <p className="editorial-subheading">
            Whether you want to automate an existing process, develop a new product or explore how AI can help your business, we're ready to listen.
          </p>

          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.88rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--electric-blue)'
            }}
          >
            Let's turn your idea into impact.
          </span>
        </div>

        {/* Contact Layout Grid: Left Form, Right Contact Direct */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: '3rem',
            marginBottom: '4rem',
            alignItems: 'start'
          }}
          className="contact-layout-grid"
        >
          {/* Functional Enquiry Form Panel */}
          <div
            style={{
              background: 'var(--surface-panel)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '4px',
              padding: '2.5rem'
            }}
          >
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'left', padding: '2rem 0' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '4px',
                    background: 'rgba(74, 222, 128, 0.1)',
                    border: '1px solid #4ADE80',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4ADE80',
                    marginBottom: '1.5rem'
                  }}
                >
                  <CheckCircle2 size={28} />
                </div>

                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--pearl-white)', marginBottom: '0.75rem' }}>
                  Enquiry Successfully Received
                </h3>

                <p style={{ color: 'var(--slate)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Thank you for reaching out to DASHRUDRA. Our engineering team is reviewing your requirements and will contact you directly to discuss practical solutions.
                </p>

                <button onClick={handleReset} className="btn-action btn-outline">
                  <span>Submit Another Enquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--metallic-silver)', marginBottom: '6px', fontWeight: '600' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Anand Sharma"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '2px',
                        background: 'rgba(5, 11, 22, 0.8)',
                        border: '1px solid var(--border-hairline)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-two-col">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--metallic-silver)', marginBottom: '6px', fontWeight: '600' }}>
                        Business or Organization
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleInputChange}
                        placeholder="Company name"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '2px',
                          background: 'rgba(5, 11, 22, 0.8)',
                          border: '1px solid var(--border-hairline)',
                          color: 'var(--pearl-white)',
                          fontSize: '0.92rem',
                          fontFamily: 'inherit',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--metallic-silver)', marginBottom: '6px', fontWeight: '600' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '2px',
                          background: 'rgba(5, 11, 22, 0.8)',
                          border: '1px solid var(--border-hairline)',
                          color: 'var(--pearl-white)',
                          fontSize: '0.92rem',
                          fontFamily: 'inherit',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--metallic-silver)', marginBottom: '6px', fontWeight: '600' }}>
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '2px',
                        background: 'rgba(5, 11, 22, 0.8)',
                        border: '1px solid var(--border-hairline)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--metallic-silver)', marginBottom: '6px', fontWeight: '600' }}>
                      What are you looking to build?
                    </label>
                    <select
                      name="solutionType"
                      value={formData.solutionType}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '2px',
                        background: 'rgba(5, 11, 22, 0.95)',
                        border: '1px solid var(--border-hairline)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {buildOptions.map((opt, idx) => (
                        <option key={idx} value={opt} style={{ background: '#071326', color: '#FFFFFF' }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--metallic-silver)', marginBottom: '6px', fontWeight: '600' }}>
                      Tell us about your challenge *
                    </label>
                    <textarea
                      name="challenge"
                      rows={4}
                      required
                      value={formData.challenge}
                      onChange={handleInputChange}
                      placeholder="Describe the repetitive workflow, system constraint, or operational bottleneck you want to solve..."
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '2px',
                        background: 'rgba(5, 11, 22, 0.8)',
                        border: '1px solid var(--border-hairline)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-action btn-primary"
                  style={{ width: '100%' }}
                >
                  {formStatus === 'submitting' ? 'Submitting Enquiry...' : "Let's turn your idea into impact"}
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Contact Info Panel */}
          <div
            style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '4px',
              padding: '2.5rem'
            }}
          >
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--electric-blue)',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Direct Communication
            </span>

            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--pearl-white)', marginBottom: '1.5rem' }}>
              We listen, assess and engineer.
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Mail size={18} color="#318BFF" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', display: 'block' }}>
                    Email Address
                  </span>
                  <a
                    href="mailto:dashrudratechorg@gmail.com"
                    style={{ color: 'var(--pearl-white)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}
                  >
                    dashrudratechorg@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={18} color="#318BFF" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', display: 'block' }}>
                    Location
                  </span>
                  <span style={{ color: 'var(--pearl-white)', fontSize: '0.95rem' }}>
                    Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--slate)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                Engagement Model
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                Every engagement begins with an objective discovery assessment to identify friction before proposing technical architectures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
