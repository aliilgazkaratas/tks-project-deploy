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
              <h1 className="hero-title">
                Adventure Awaits with TKS Travel Society
              </h1>
              <p className="hero-subtitle">
                Join our community of explorers and create unforgettable
                memories on extraordinary journeys around the world.
              </p>
              <div className="hero-buttons">
                <Link to="/events">
                  <Button size="large">Explore Events</Button>
                </Link>
                <Link to="/register">
                  <Button size="large" variant="outline">
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
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