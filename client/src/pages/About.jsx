import './StaticPage.css';

const About = () => (
  <div className="about-page">
    <div className="about-hero" style={{
      backgroundImage: 'url(/clients/public/tks.webp)',
      height: '400px',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container">
        <h1 style={{color: 'white', paddingTop: '150px'}}>About TKS Travel Society</h1>
      </div>
    </div>
    
    <div className="container" style={{padding: '60px 20px'}}>
      <section style={{marginBottom: '60px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center'}}>
          <div>
            <h2>Our Mission</h2>
            <p>TKS Travel Society connects travel enthusiasts in Istanbul...</p>
          </div>
          <img src="/images/team.jpg" alt="Our Team" style={{width: '100%', borderRadius: '12px'}} />
        </div>
      </section>

      <section style={{marginBottom: '60px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center'}}>
          <img src="/clients/public/tks.webp" alt="Event" style={{width: '100%', borderRadius: '12px'}} />
          <div>
            <h2>What We Do</h2>
            <p>We organize cultural events, travel trips...</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default About;