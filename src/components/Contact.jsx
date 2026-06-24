import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';
const countries = [
  { name: 'India', flag: '🇮🇳', code: 'IN', dialCode: '+91', length: 10, placeholder: '98765 43210' },
  { name: 'United States', flag: '🇺🇸', code: 'US', dialCode: '+1', length: 10, placeholder: '201 555 0123' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dialCode: '+44', length: 10, placeholder: '7700 900077' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', dialCode: '+971', length: 9, placeholder: '50 123 4567' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: 'SA', dialCode: '+966', length: 9, placeholder: '50 123 4567' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG', dialCode: '+65', length: 8, placeholder: '8123 4567' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA', dialCode: '+1', length: 10, placeholder: '613 555 0123' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU', dialCode: '+61', length: 9, placeholder: '412 345 678' },
  { name: 'Oman', flag: '🇴🇲', code: 'OM', dialCode: '+968', length: 8, placeholder: '9123 4567' },
  { name: 'Qatar', flag: '🇶🇦', code: 'QA', dialCode: '+974', length: 8, placeholder: '5501 2345' },
  { name: 'Kuwait', flag: '🇰🇼', code: 'KW', dialCode: '+965', length: 8, placeholder: '5123 4567' },
  { name: 'Bahrain', flag: '🇧🇭', code: 'BH', dialCode: '+973', length: 8, placeholder: '3123 4567' },
  { name: 'Malaysia', flag: '🇲🇾', code: 'MY', dialCode: '+60', length: 9, placeholder: '12 345 6789' }
];

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    industry: '',
    bottleneck: ''
  });
  const [formState, setFormState] = useState('idle'); // idle, submitting, success
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [rawPhone, setRawPhone] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showCountryDropdown && !e.target.closest('.country-select-container')) {
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
    const value = e.target.value;
    const digits = value.replace(/\D/g, ''); // Enforce digits only
    const truncated = digits.slice(0, selectedCountry.length); // limit maximum length
    setRawPhone(truncated);
    setFormData(prev => ({
      ...prev,
      whatsapp: truncated ? `${selectedCountry.dialCode} ${truncated}` : ''
    }));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    // Enforce slice on new country limit
    const truncated = rawPhone.slice(0, country.length);
    setRawPhone(truncated);
    setFormData(prev => ({
      ...prev,
      whatsapp: truncated ? `${country.dialCode} ${truncated}` : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // 2. Phone Length Validation
    if (rawPhone.length !== selectedCountry.length) {
      alert(`Please enter a valid ${selectedCountry.length}-digit WhatsApp number for ${selectedCountry.name}.`);
      return;
    }

    setFormState('submitting');

    // Programmatically submit the form to the hidden iframe.
    // This completely bypasses CORS because standard HTML navigation submissions are never subjected to CORS preflight checks!
    try {
      if (formRef.current) {
        formRef.current.submit();
        console.log('Form successfully submitted to hidden iframe (bypassing CORS)');
      }
    } catch (err) {
      console.warn('Programmatic form submission failed, attempting direct AJAX backup:', err);
    }

    // Fire secondary fallback channels in the background (EmailJS & Nodemailer Express server)
    (async () => {
      // Background Fallback 1: EmailJS
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          const templateParams = {
            name: formData.name,
            whatsapp: formData.whatsapp,
            bottleneck: formData.bottleneck,
            to_email: 'dashrudratechorg@gmail.com'
          };
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          console.log('Secondary backup email sent using EmailJS');
        }
      } catch (emailJsError) {
        console.warn('EmailJS direct send omitted or failed:', emailJsError);
      }

      // Background Fallback 2: Express Backend Server
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
        await fetch(`${backendUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile: formData.whatsapp,
            institution: `DashRudra B2B Lead (${formData.industry})`,
            message: formData.bottleneck
          })
        });
      } catch (backendErr) {
        console.warn('Express Backend background send omitted or failed:', backendErr);
      }
    })();

    setTimeout(() => {
      setFormState('success');
    }, 1200);
  };

  return (
    <section id="contact" className="contact section-padding" style={{ background: 'var(--bg-gradient)' }}>
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="contact-container">
          {/* Left Side: Contact Information */}
          <div className="contact-info">
            <h3 className="brand-font text-gold" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Ready to Upgrade?
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Whether you need to eliminate manual invoicing, lock down messy WhatsApp approval trails, or secure your company lists from leaks, our dedicated engineering core is here to help. Reach out to us.
            </p>
            
            <div className="contact-item">
              <div className="contact-icon"><Mail size={24} /></div>
              <div className="contact-text">
                <h5 className="brand-font">Email Us</h5>
                <p><a href="mailto:dashrudratechorg@gmail.com">dashrudratechorg@gmail.com</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon"><Phone size={24} /></div>
              <div className="contact-text">
                <h5 className="brand-font">Call Us Directly</h5>
                <p><a href="tel:+918939722569">+91 89397 22569</a></p>
                <p style={{ marginTop: '0.25rem' }}><a href="tel:+917448881750">+91 74488 81750</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={24} /></div>
              <div className="contact-text">
                <h5 className="brand-font">Our Base</h5>
                <p>SRM Madurai College for Engineering & Technology</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Booking Form */}
          <div className="contact-form">
            {formState === 'idle' && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name / Business Identity</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g. Ramesh Traders / Salem Dental Clinic"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g. name@company.com (Gmail, Outlook, etc.)"
                    required
                  />
                  {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <span style={{ color: 'var(--primary-gold)', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block', fontFamily: 'Inter, sans-serif' }}>
                      ⚠️ Please enter a valid email format (e.g. name@company.com)
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="whatsapp">WhatsApp Number</label>
                  <div 
                    className="country-select-container"
                    style={{ 
                      display: 'flex', 
                      position: 'relative', 
                      background: 'rgba(11, 31, 58, 0.8)', 
                      border: isFocused ? '1px solid var(--primary-gold)' : '1px solid rgba(255, 255, 255, 0.1)', 
                      borderRadius: '8px', 
                      alignItems: 'center',
                      boxShadow: isFocused ? '0 0 0 2px rgba(212, 175, 55, 0.2)' : 'none',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                  >
                    {/* Country Selector Dropdown Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-light)',
                        padding: '0 1rem',
                        height: '100%',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1rem',
                        fontWeight: '500',
                        minWidth: '95px'
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{selectedCountry.flag}</span>
                      <span>{selectedCountry.dialCode}</span>
                      <ChevronDown size={14} style={{ opacity: 0.7 }} />
                    </button>

                    {/* Divider Line */}
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.15)' }}></div>

                    {/* Numerical Number Text Input */}
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp_raw"
                      value={rawPhone}
                      onChange={handlePhoneChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      style={{
                        flexGrow: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-light)',
                        padding: '1rem 0.75rem',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1rem',
                        width: '100%'
                      }}
                      placeholder={selectedCountry.placeholder}
                      required
                    />

                    {/* Country Dropdown Options Overlay List */}
                    {showCountryDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '105%',
                          left: 0,
                          width: '280px',
                          background: 'rgba(11, 31, 58, 0.98)',
                          border: '1px solid var(--primary-gold)',
                          borderRadius: '8px',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                          maxHeight: '220px',
                          overflowY: 'auto',
                          zIndex: 1000,
                          padding: '4px 0',
                          backdropFilter: 'blur(10px)',
                          animation: 'fadeIn 0.2s ease'
                        }}
                      >
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => handleCountrySelect(c)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 16px',
                              cursor: 'pointer',
                              color: 'var(--text-light)',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.95rem',
                              transition: 'all 0.2s ease',
                              background: selectedCountry.code === c.code ? 'rgba(212, 175, 55, 0.15)' : 'transparent'
                            }}
                            onMouseEnter={(e) => {
                              if (selectedCountry.code !== c.code) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedCountry.code !== c.code) {
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '1.25rem' }}>{c.flag}</span>
                              <span style={{ fontWeight: selectedCountry.code === c.code ? '600' : '400' }}>{c.name}</span>
                            </div>
                            <span style={{ color: 'var(--primary-gold)', fontWeight: '500' }}>{c.dialCode}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Real-Time Character Constraints Helper */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                    {rawPhone.length < selectedCountry.length ? (
                      <span style={{ color: 'var(--primary-gold)' }}>
                        Enforced limit: {rawPhone.length} / {selectedCountry.length} digits
                      </span>
                    ) : (
                      <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        ✓ Completed exactly {selectedCountry.length} digits
                      </span>
                    )}
                    <span style={{ color: 'var(--text-muted)' }}>
                      Target: {selectedCountry.name}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="industry">Industry</label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    style={{ 
                      color: formData.industry === "" ? 'rgba(255, 255, 255, 0.4)' : 'var(--text-light)', 
                      background: 'rgba(11, 31, 58, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '1rem',
                      width: '100%',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    required
                  >
                    <option value="" disabled style={{ background: '#0B1F3A', color: 'rgba(255,255,255,0.4)' }}>Select your industry</option>
                    <option value="Education" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Education / Schools / Colleges</option>
                    <option value="Healthcare" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Healthcare / Clinics / Hospitals</option>
                    <option value="Logistics" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Logistics / Export / Construction</option>
                    <option value="Retail" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Retail / Wholesale / E-commerce</option>
                    <option value="Services" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Services / Hospitality / Tourism</option>
                    <option value="Manufacturing" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Manufacturing / Industrial</option>
                    <option value="Other" style={{ background: '#0B1F3A', color: 'var(--text-light)' }}>Other Industry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="bottleneck">Your Biggest Operational Bottleneck</label>
                  <textarea
                    id="bottleneck"
                    name="bottleneck"
                    value={formData.bottleneck}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g. Lost order receipts in paper books, manual invoicing overhead, active leaks in unstructured group chats..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <Send size={16} />
                  {formState === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}

            {formState === 'submitting' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(212, 175, 55, 0.2)', borderTopColor: 'var(--primary-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Poppins', fontSize: '1rem' }}>Routing secure data to email...</p>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            )}

            {formState === 'success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center', gap: '1rem', animation: 'fadeIn 0.5s ease' }}>
                <div style={{ color: 'var(--primary-gold)', background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="brand-font text-gold" style={{ fontSize: '1.5rem' }}>Request Submitted!</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Your request has been securely indexed. Our team will contact you at your WhatsApp number <strong>{formData.whatsapp}</strong> or email <strong>{formData.email}</strong> within 2 hours.
                </p>
                 <button onClick={() => { setFormState('idle'); setRawPhone(''); setSelectedCountry(countries[0]); }} className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>
                  Submit New Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
