import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>TKS Travel Society</h3>
            <p>Connecting travel enthusiasts in Istanbul through memorable experiences.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          
                <div className="footer-section">
        <h4>Connect</h4>
        <ul>
          <li><a href="https://www.instagram.com/istanbul_tks/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="mailto:info@tksistanbul.com">info@tksistanbul.com</a></li>
        </ul>
      </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TKS Travel Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;