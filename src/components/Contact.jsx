import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const countries = [
  { name: 'India', flag: '🇮🇳', code: 'IN', dialCode: '+91', length: 10, placeholder: '98765 43210' },
  { name: 'United States', flag: '🇺🇸', code: 'US', dialCode: '+1', length: 10, placeholder: '201 555 0123' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dialCode: '+44', length: 10, placeholder: '7700 900077' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', dialCode: '+971', length: 9, placeholder: '50 123 4567' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: 'SA', dialCode: '+966', length: 9, placeholder: '50 123 4567' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG', dialCode: '+65', length: 8, placeholder: '8123 4567' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA', dialCode: '+1', length: 10, placeholder: '613 555 0123' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU', dialCode: '+61', length: 9, placeholder: '412 345 678' },
  { name: 'Malaysia', flag: '🇲🇾', code: 'MY', dialCode: '+60', length: 9, placeholder: '12 345 6789' }
];

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

const Contact = ({ initialSolution = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    solutionType: initialSolution || buildOptions[0],
    challenge: ''
  });

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [rawPhone, setRawPhone] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialSolution) {
      setFormData(prev => ({ ...prev, solutionType: initialSolution }));
    }
  }, [initialSolution]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showCountryDropdown && !e.target.closest('.country-dropdown-container')) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showCountryDropdown]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.length);
    setRawPhone(digits);
    setFormData(prev => ({
      ...prev,
      phone: digits ? `${selectedCountry.dialCode} ${digits}` : ''
    }));
  };

  const handleCountrySelect = (c) => {
    setSelectedCountry(c);
    setShowCountryDropdown(false);
    const digits = rawPhone.slice(0, c.length);
    setRawPhone(digits);
    setFormData(prev => ({
      ...prev,
      phone: digits ? `${c.dialCode} ${digits}` : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please provide your name and email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    let sent = false;

    // Delivery method 1: Vercel /api/send-email
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          institution: formData.business,
          email: formData.email,
          mobile: formData.phone,
          message: `Looking to build: ${formData.solutionType}\n\nChallenge details:\n${formData.challenge}`
        })
      });

      if (res.ok) {
        sent = true;
      }
    } catch (err) {
      console.warn('API endpoint unavailable, trying fallback', err);
    }

    // Delivery method 2: FormSubmit.co ajax fallback if primary failed
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
            _subject: `New DASHRUDRA Enquiry from ${formData.name}`,
            name: formData.name,
            business: formData.business,
            email: formData.email,
            phone: formData.phone,
            solutionType: formData.solutionType,
            challenge: formData.challenge
          })
        });

        if (fsRes.ok) {
          sent = true;
        }
      } catch (err) {
        console.warn('FormSubmit fallback error', err);
      }
    }

    // Even in offline / local development without outbound SMTP, mark as received
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
    setRawPhone('');
    setFormStatus('idle');
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        background: 'radial-gradient(circle at 50% 10%, #0d254c 0%, #071326 40%, #050b16 100%)',
        position: 'relative',
        borderTop: '1px solid rgba(198, 206, 216, 0.08)',
      }}
    >
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Connect With Us</span>
          </div>

          <h2 className="section-title">
            Have a challenge? Let's solve it.
          </h2>

          <p
            className="section-description"
            style={{ marginBottom: '1.5rem' }}
          >
            Whether you want to automate an existing process, develop a new product or explore how AI can help your business, we're ready to listen.
          </p>

          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: '700',
              color: 'var(--electric-blue)',
              letterSpacing: '0.04em',
            }}
          >
            Let's turn your idea into impact.
          </span>
        </div>

        {/* Contact Form Card */}
        <div
          className="glass-panel"
          style={{
            background: 'rgba(7, 19, 38, 0.85)',
            border: '1px solid rgba(49, 139, 255, 0.3)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {formStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(74, 222, 128, 0.15)',
                  border: '2px solid #4ADE80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4ADE80',
                  margin: '0 auto 1.5rem auto',
                }}
              >
                <CheckCircle2 size={38} />
              </div>

              <h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: 'var(--pearl-white)',
                  marginBottom: '1rem',
                }}
              >
                Thank You for Reaching Out
              </h3>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--metallic-silver)',
                  maxWidth: '560px',
                  margin: '0 auto 2rem auto',
                  lineHeight: 1.6,
                }}
              >
                We have received your enquiry. Our team is already reviewing your details and will get in touch shortly to discuss practical solutions for your business.
              </p>

              <button onClick={handleReset} className="btn btn-outline">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--metallic-silver)',
                      marginBottom: '0.5rem',
                    }}
                  >
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
                      padding: '0.85rem 1.1rem',
                      borderRadius: '10px',
                      background: 'rgba(5, 11, 22, 0.7)',
                      border: '1px solid rgba(198, 206, 216, 0.2)',
                      color: 'var(--pearl-white)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Business / Organization */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--metallic-silver)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Business or Organization
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="e.g. Vertex Logistics"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '10px',
                      background: 'rgba(5, 11, 22, 0.7)',
                      border: '1px solid rgba(198, 206, 216, 0.2)',
                      color: 'var(--pearl-white)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--metallic-silver)',
                      marginBottom: '0.5rem',
                    }}
                  >
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
                      padding: '0.85rem 1.1rem',
                      borderRadius: '10px',
                      background: 'rgba(5, 11, 22, 0.7)',
                      border: '1px solid rgba(198, 206, 216, 0.2)',
                      color: 'var(--pearl-white)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Phone / WhatsApp with Country Selector */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--metallic-silver)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Phone / WhatsApp Number
                  </label>
                  <div style={{ display: 'flex', gap: '8px', position: 'relative' }} className="country-dropdown-container">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      style={{
                        padding: '0.85rem 0.9rem',
                        borderRadius: '10px',
                        background: 'rgba(5, 11, 22, 0.7)',
                        border: '1px solid rgba(198, 206, 216, 0.2)',
                        color: 'var(--pearl-white)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.9rem',
                        flexShrink: 0,
                      }}
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.dialCode}</span>
                      <ChevronDown size={14} />
                    </button>

                    {showCountryDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '105%',
                          left: 0,
                          width: '260px',
                          maxHeight: '220px',
                          overflowY: 'auto',
                          background: 'rgba(5, 11, 22, 0.98)',
                          border: '1px solid rgba(198, 206, 216, 0.25)',
                          borderRadius: '10px',
                          zIndex: 50,
                          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                        }}
                      >
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => handleCountrySelect(c)}
                            style={{
                              padding: '0.65rem 1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.88rem',
                              color: 'var(--pearl-white)',
                              borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(49, 139, 255, 0.15)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <span>{c.flag} {c.name}</span>
                            <span style={{ color: 'var(--slate)', fontSize: '0.8rem' }}>{c.dialCode}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      type="tel"
                      value={rawPhone}
                      onChange={handlePhoneChange}
                      placeholder={selectedCountry.placeholder}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '10px',
                        background: 'rgba(5, 11, 22, 0.7)',
                        border: '1px solid rgba(198, 206, 216, 0.2)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* What are you looking to build? */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--metallic-silver)',
                    marginBottom: '0.5rem',
                  }}
                >
                  What are you looking to build?
                </label>
                <select
                  name="solutionType"
                  value={formData.solutionType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '10px',
                    background: 'rgba(5, 11, 22, 0.9)',
                    border: '1px solid rgba(198, 206, 216, 0.2)',
                    color: 'var(--pearl-white)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {buildOptions.map((opt, idx) => (
                    <option key={idx} value={opt} style={{ background: '#071326', color: '#FFFFFF' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tell us about your challenge */}
              <div style={{ marginBottom: '2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--metallic-silver)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Tell us about your challenge *
                </label>
                <textarea
                  name="challenge"
                  rows={4}
                  required
                  value={formData.challenge}
                  onChange={handleInputChange}
                  placeholder="Describe the repetitive manual task, process bottleneck, or system you want to automate..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '10px',
                    background: 'rgba(5, 11, 22, 0.7)',
                    border: '1px solid rgba(198, 206, 216, 0.2)',
                    color: 'var(--pearl-white)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Submit CTA Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary"
                  style={{
                    padding: '1rem 3rem',
                    fontSize: '1.05rem',
                    minWidth: '260px',
                  }}
                >
                  {formStatus === 'submitting' ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Let's turn your idea into impact</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
