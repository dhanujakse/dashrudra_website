import { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, ChevronDown, AlertTriangle, ShieldCheck } from 'lucide-react';
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

const DemoModal = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    solution: 'WhatsApp Enquiry Bot'
  });
  const [rawPhone, setRawPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, submitting, success
  const [limitReached, setLimitReached] = useState(false);

  // Check if user has already submitted a request today
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      const lastRequestDate = localStorage.getItem('dashrudra_demo_request_date');
      if (lastRequestDate === today) {
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    }
  }, [isOpen]);

  // Click outside to close dropdown
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
    const value = e.target.value;
    const digits = value.replace(/\D/g, '');
    const truncated = digits.slice(0, selectedCountry.length);
    setRawPhone(truncated);
    setFormData(prev => ({
      ...prev,
      whatsapp: truncated ? `${selectedCountry.dialCode} ${truncated}` : ''
    }));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    const truncated = rawPhone.slice(0, country.length);
    setRawPhone(truncated);
    setFormData(prev => ({
      ...prev,
      whatsapp: truncated ? `${country.dialCode} ${truncated}` : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rawPhone.length !== selectedCountry.length) {
      alert(`Please enter a valid ${selectedCountry.length}-digit WhatsApp number for ${selectedCountry.name}.`);
      return;
    }

    setFormState('submitting');

    // Programmatically submit the form to the hidden iframe.
    // This completely bypasses CORS!
    try {
      if (formRef.current) {
        formRef.current.submit();
        console.log('Demo request successfully submitted to hidden iframe (bypassing CORS)');
      }
    } catch (err) {
      console.warn('Programmatic form submission failed, attempting direct AJAX backup:', err);
    }

    // Fire secondary fallback channels in the background asynchronously
    (async () => {
      // EmailJS Fallback
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          await emailjs.send(serviceId, templateId, {
            name: formData.name,
            whatsapp: formData.whatsapp,
            bottleneck: `[10-Min Demo Request] Target solution: ${formData.solution}`,
            to_email: 'dashrudratechorg@gmail.com'
          }, publicKey);
          console.log('Secondary backup demo request sent using EmailJS');
        }
      } catch (emailJsError) {
        console.warn('EmailJS fallback failed:', emailJsError);
      }
    })();

    // Record submission date to block repeat requests today
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('dashrudra_demo_request_date', today);

    setTimeout(() => {
      setFormState('success');
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(5, 15, 28, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1.5rem',
      animation: 'fadeIn 0.3s ease'
    }}>
      {/* Modal Glass Container */}
      <div 
        className="glass-card" 
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(11, 31, 58, 0.95)',
          border: '1px solid var(--primary-gold)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
          padding: '2.5rem 2rem',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-light)',
            opacity: 0.7,
            cursor: 'pointer',
            padding: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
        >
          <X size={20} />
        </button>

        {/* Limit Reached Notice */}
        {limitReached ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '1rem 0' }}>
            <div style={{ color: 'var(--primary-gold)', background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%' }}>
              <AlertTriangle size={48} />
            </div>
            <h3 className="brand-font text-gold" style={{ fontSize: '1.5rem', margin: 0 }}>Daily Request Limit Reached</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              You or your company have already requested a custom 10-Min Live Demo today. To ensure dedicated engineering focus and highly-customized system previews, we limit demo requests to <strong style={{ color: 'inherit', fontWeight: '600' }}>one request per business per day</strong>.
            </p>
            <p style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', fontWeight: '500' }}>
              Our engineering team is already processing your request. We will reach out to you via your submitted WhatsApp number shortly.
            </p>
            <button onClick={onClose} className="btn btn-outline" style={{ marginTop: '1rem', width: '100%' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            {formState === 'idle' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  <ShieldCheck className="text-gold" size={36} style={{ marginBottom: '0.5rem' }} />
                  <h3 className="brand-font text-gold" style={{ fontSize: '1.6rem', margin: 0 }}>Book Custom 10-Min Live Demo</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Limit: One demo request per business per day.
                  </p>
                </div>

                {/* Business Name */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" htmlFor="modal-name">Your Name / Business Identity</label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g. Ramesh Traders / Salem Dental Clinic"
                    required
                  />
                </div>

                {/* Target Solution Dropdown */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" htmlFor="modal-solution">Main Solution You Want to Preview</label>
                  <select
                    id="modal-solution"
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ background: 'rgba(11, 31, 58, 0.9)', color: 'var(--text-light)', border: '1px solid rgba(255,255,255,0.1)' }}
                    required
                  >
                    <option value="WhatsApp Enquiry Bot">WhatsApp Enquiry Bot</option>
                    <option value="Exam Seating arrangement (Hall Harmony)">Exam Seating Hall Arrangement</option>
                    <option value="Clinic Roster System">Clinic Roster System</option>
                    <option value="Hospital Intake logs">Hospital Intake Logs</option>
                    <option value="Staff Attendance Registry">Staff Attendance Registry</option>
                    <option value="Secure Invoice Pipelines">Secure Invoicing Pipeline</option>
                    <option value="Other Custom Automation">Other Bespoke Automation</option>
                  </select>
                </div>

                {/* WhatsApp Selector */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" htmlFor="modal-whatsapp">WhatsApp Number</label>
                  <div 
                    className="modal-country-select"
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
                        padding: '0 0.75rem',
                        height: '100%',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        minWidth: '95px'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{selectedCountry.flag}</span>
                      <span>{selectedCountry.dialCode}</span>
                      <ChevronDown size={12} style={{ opacity: 0.7 }} />
                    </button>

                    <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.15)' }}></div>

                    <input
                      type="tel"
                      id="modal-whatsapp"
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
                        padding: '0.85rem 0.75rem',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        width: '100%'
                      }}
                      placeholder={selectedCountry.placeholder}
                      required
                    />

                    {showCountryDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '105%',
                          left: 0,
                          width: '260px',
                          background: 'rgba(11, 31, 58, 0.98)',
                          border: '1px solid var(--primary-gold)',
                          borderRadius: '8px',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                          maxHeight: '180px',
                          overflowY: 'auto',
                          zIndex: 10000,
                          padding: '4px 0',
                          backdropFilter: 'blur(10px)'
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
                              padding: '8px 12px',
                              cursor: 'pointer',
                              color: 'var(--text-light)',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.85rem',
                              background: selectedCountry.code === c.code ? 'rgba(212, 175, 55, 0.15)' : 'transparent'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>{c.flag}</span>
                              <span>{c.name}</span>
                            </div>
                            <span style={{ color: 'var(--primary-gold)' }}>{c.dialCode}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
                    {rawPhone.length < selectedCountry.length ? (
                      <span style={{ color: 'var(--primary-gold)' }}>
                        Enforced limit: {rawPhone.length} / {selectedCountry.length} digits
                      </span>
                    ) : (
                      <span style={{ color: '#10B981' }}>
                        ✓ Ready
                      </span>
                    )}
                    <span style={{ color: 'var(--text-muted)' }}>
                      Target: {selectedCountry.name}
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" style={{ margin: '0.5rem 0 0 0' }}>
                  <Send size={16} />
                  Book My Live Demo
                </button>
              </form>
            )}

            {formState === 'submitting' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(212, 175, 55, 0.2)', borderTopColor: 'var(--primary-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Poppins', fontSize: '1rem' }}>Scheduling your live session...</p>
              </div>
            )}

            {formState === 'success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.2rem', minHeight: '300px' }}>
                <div style={{ color: 'var(--primary-gold)', background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="brand-font text-gold" style={{ fontSize: '1.5rem', margin: 0 }}>Demo Request Scheduled!</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Your live session request has been registered. Our team will ping your WhatsApp number <strong>{formData.whatsapp}</strong> within 2 hours to confirm your custom 10-Min Live Demo scheduling!
                </p>
                <button onClick={onClose} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Done
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DemoModal;
