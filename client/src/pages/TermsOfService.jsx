import './StaticPage.css';

const TermsOfService = () => (
  <div className="static-page">
    <div className="container">
      <h1>Terms of Service</h1>
      <p className="date">Last updated: February 2026</p>
      
      <section>
        <h2>Acceptance of Terms</h2>
        <p>By accessing TKS Travel Society, you agree to these terms.</p>
      </section>

      <section>
        <h2>Event Registration</h2>
        <p>Event registrations are subject to availability. We reserve the right to cancel events.</p>
      </section>

      <section>
        <h2>User Conduct</h2>
        <p>Users must not misuse our platform or engage in harmful behavior.</p>
      </section>

      <section>
        <h2>Modifications</h2>
        <p>We may update these terms. Continued use means acceptance of changes.</p>
      </section>
    </div>
  </div>
);

export default TermsOfService;