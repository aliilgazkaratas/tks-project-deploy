import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Button from '../components/common/Button';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
<section className="hero-section">
  <div className="hero-overlay">
    <div className="container">
      <div className="hero-content">
        <span className="hero-badge">🌍 Istanbul's Premier Travel Community</span>
        <h1 className="hero-title">
          Discover Istanbul
          <span className="hero-gradient"> Together</span>
        </h1>
        <p className="hero-subtitle">
          Join TKS Travel Society and explore hidden gems, meet fellow adventurers, 
          and create unforgettable memories in the heart of Turkey.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <strong>500+</strong>
            <span>Members</span>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <span>Events</span>
          </div>
          <div className="stat">
            <strong>4.9★</strong>
            <span>Rating</span>
          </div>
        </div>
        <div className="hero-buttons">
          <Link to="/events" className="btn btn-primary btn-large">
            Browse Events →
          </Link>
          <Link to="/about" className="btn btn-outline btn-large">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="hero-shape"></div>
</section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose TKS Travel Society?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiCalendar />
              </div>
              <h3>Curated Events</h3>
              <p>
                Hand-picked destinations and activities designed to create
                lasting memories and authentic experiences.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3>Community Driven</h3>
              <p>
                Connect with like-minded adventurers and build friendships that
                last beyond the journey.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiTrendingUp />
              </div>
              <h3>Seamless Experience</h3>
              <p>
                Easy registration, secure payments, and organized logistics so
                you can focus on the adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Adventure?</h2>
            <p>
              Browse our upcoming events and find your next unforgettable
              experience.
            </p>
            <Link to="/events">
              <Button size="large">View All Events</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;