import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate sending email to Rick Salgado via Promise
    new Promise((resolve) => setTimeout(resolve, 1500))
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      });
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        
        <div className="contact-card">
          <h1 className="contact-title">CONTACT RICK</h1>
          <p className="contact-subtitle">Have feedback, questions, or just want to chat soccer? Send a message directly.</p>
          
          {!isSubmitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">NAME</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  className="form-input" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="form-input" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">MESSAGE</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  className="form-input textarea" 
                  placeholder="Write your message here..." 
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING...' : 'SUBMIT MESSAGE'}
              </button>
            </form>
          ) : (
            <div className="thank-you-card">
              <div className="thank-you-icon">📨</div>
              <h3 className="thank-you-title">THANK YOU!</h3>
              <p className="thank-you-text">
                Your message has been successfully simulated and sent to Rick Salgado. We will stay in touch as we stand on guard for 2026!
              </p>
              <button 
                className="cta-button" 
                style={{ marginTop: '24px', padding: '10px 24px', fontSize: '13px' }}
                onClick={() => {
                  setFormData({ name: '', email: '', message: '' });
                  setIsSubmitted(false);
                }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer Yellow Warning Sign */}
        <div className="disclaimer-warning-banner">
          <div className="warning-icon">⚠️</div>
          <p className="warning-text">
            <strong>NOTICE & DISCLAIMER:</strong> This is a personal fan tribute project developed by Rick Salgado to showcase high-performance React and motion technologies. This is <strong>not</strong> the official webpage of the Canada Soccer Association.
          </p>
          <a 
            href="https://www.canadasoccer.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="warning-btn"
          >
            VISIT CANADASOCCER.COM
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
