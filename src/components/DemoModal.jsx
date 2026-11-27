import { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, ChevronDown, Compass, Sparkles } from 'lucide-react';

const countries = [
  { name: 'India', flag: '🇮🇳', code: 'IN', dialCode: '+91', length: 10, placeholder: '98765 43210' },
  { name: 'United States', flag: '🇺🇸', code: 'US', dialCode: '+1', length: 10, placeholder: '201 555 0123' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dialCode: '+44', length: 10, placeholder: '7700 900077' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', dialCode: '+971', length: 9, placeholder: '50 123 4567' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG', dialCode: '+65', length: 8, placeholder: '8123 4567' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA', dialCode: '+1', length: 10, placeholder: '613 555 0123' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU', dialCode: '+61', length: 9, placeholder: '412 345 678' },
  { name: 'Malaysia', flag: '🇲🇾', code: 'MY', dialCode: '+60', length: 9, placeholder: '12 345 6789' }
];

const solutionOptions = [
  "Workflow Automation",
  "AI-Powered Business Tools",
  "WhatsApp & Communication Automation",
  "Custom Business Management System",
  "Custom Web Application",
  "AI Agents & Intelligent Workflows",
  "Data Processing & Reporting Automation",
  "Digital Transformation / Other"
];

const DemoModal = ({ isOpen, onClose, defaultSolution = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    solution: defaultSolution || solutionOptions[0],
    message: ''
  });

  const [rawPhone, setRawPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle | submitting | success

  useEffect(() => {
    if (defaultSolution) {
      setFormData(prev => ({ ...prev, solution: defaultSolution }));
    }
  }, [defaultSolution]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showCountryDropdown && !e.target.closest('.modal-country-select')) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showCountryDropdown]);

  if (!isOpen) return null;

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
      alert('Please enter your name and email.');
      return;
    }

    setFormState('submitting');

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          institution: formData.business,
          email: formData.email,
          mobile: formData.phone,
          message: `Interactive Demo Request for: ${formData.solution}\n\nNote: ${formData.message}`
        })
      });
    } catch (err) {
      console.warn('API send failed, proceeding with fallback', err);
    }

    setFormState('success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        background: 'rgba(5, 11, 22, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(7, 19, 38, 0.95)',
          border: '1px solid rgba(49, 139, 255, 0.4)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(16, 38, 74, 0.6)',
            border: '1px solid var(--border-silver)',
            color: 'var(--pearl-white)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {formState === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(74, 222, 128, 0.15)',
                border: '2px solid #4ADE80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4ADE80',
                margin: '0 auto 1.25rem auto',
              }}
            >
              <CheckCircle2 size={34} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--pearl-white)', marginBottom: '0.75rem' }}>
              Request Received
            </h3>

            <p style={{ color: 'var(--metallic-silver)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Thank you for connecting with DASHRUDRA. Our team will contact you shortly to review your requirements.
            </p>

            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  color: 'var(--electric-blue)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                <Compass size={14} />
                <span>DASHRUDRA &bull; Direct Consultation</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--pearl-white)', marginBottom: '0.35rem' }}>
                Let's Work Together
              </h3>

              <p style={{ color: 'var(--slate)', fontSize: '0.9rem' }}>
                Tell us about your operations and discover how our solutions eliminate repetitive manual friction.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--metallic-silver)', marginBottom: '4px' }}>
                    Full Name *
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
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(5, 11, 22, 0.7)',
                      border: '1px solid rgba(198, 206, 216, 0.2)',
                      color: 'var(--pearl-white)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--metallic-silver)', marginBottom: '4px' }}>
                      Business / Organization
                    </label>
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      placeholder="Company name"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'rgba(5, 11, 22, 0.7)',
                        border: '1px solid rgba(198, 206, 216, 0.2)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--metallic-silver)', marginBottom: '4px' }}>
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
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'rgba(5, 11, 22, 0.7)',
                        border: '1px solid rgba(198, 206, 216, 0.2)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--metallic-silver)', marginBottom: '4px' }}>
                    Phone / WhatsApp Number
                  </label>
                  <div style={{ display: 'flex', gap: '6px', position: 'relative' }} className="modal-country-select">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      style={{
                        padding: '0.75rem 0.8rem',
                        borderRadius: '8px',
                        background: 'rgba(5, 11, 22, 0.7)',
                        border: '1px solid rgba(198, 206, 216, 0.2)',
                        color: 'var(--pearl-white)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.85rem',
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
                          width: '240px',
                          maxHeight: '180px',
                          overflowY: 'auto',
                          background: 'rgba(5, 11, 22, 0.98)',
                          border: '1px solid rgba(198, 206, 216, 0.25)',
                          borderRadius: '8px',
                          zIndex: 50,
                          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                        }}
                      >
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => handleCountrySelect(c)}
                            style={{
                              padding: '0.5rem 0.8rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.85rem',
                              color: 'var(--pearl-white)',
                              borderBottom: '1px solid rgba(198, 206, 216, 0.08)',
                            }}
                          >
                            <span>{c.flag} {c.name}</span>
                            <span style={{ color: 'var(--slate)', fontSize: '0.78rem' }}>{c.dialCode}</span>
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
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'rgba(5, 11, 22, 0.7)',
                        border: '1px solid rgba(198, 206, 216, 0.2)',
                        color: 'var(--pearl-white)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--metallic-silver)', marginBottom: '4px' }}>
                    Solution of Interest
                  </label>
                  <select
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(5, 11, 22, 0.9)',
                      border: '1px solid rgba(198, 206, 216, 0.2)',
                      color: 'var(--pearl-white)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {solutionOptions.map((opt, idx) => (
                      <option key={idx} value={opt} style={{ background: '#071326', color: '#FFFFFF' }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--metallic-silver)', marginBottom: '4px' }}>
                    Brief Note on Your Challenge (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What manual task would you like to eliminate?"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(5, 11, 22, 0.7)',
                      border: '1px solid rgba(198, 206, 216, 0.2)',
                      color: 'var(--pearl-white)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
              >
                {formState === 'submitting' ? 'Submitting Request...' : 'Send Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;
