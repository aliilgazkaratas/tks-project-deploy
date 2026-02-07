import './StaticPage.css';

const PrivacyPolicy = () => (
  <div className="static-page">
    <div className="container">
      <h1>Privacy Policy</h1>
      <p className="date">Last updated: February 2026</p>
      
      <section>
        <h2>Information We Collect</h2>
        <p>We collect information you provide when registering for events, creating an account, or contacting us.</p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>Your information is used to manage event registrations, send updates, and improve our services.</p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>We implement security measures to protect your personal information.</p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>For privacy concerns, email us at ...</p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;