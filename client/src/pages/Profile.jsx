import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import Button from '../components/common/Button';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    zodiac: user?.zodiac || '',
    phoneNumber: user?.phoneNumber || '',
    dateOfBirth: user?.dateOfBirth || '',
    interests: user?.interests || []
  });

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const interestOptions = [
    'Hiking', 'Photography', 'Food & Cooking', 'History & Culture',
    'Adventure Sports', 'Art & Museums', 'Nightlife', 'Beach & Water Sports'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await userService.updateProfile(formData);
      setUser(updated);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({...formData, interests: newInterests});
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-content">
          {!editing ? (
            <div className="profile-view">
              <div className="profile-info">
                <div className="info-row">
                  <strong>Zodiac Sign:</strong>
                  <span>{user?.zodiac || 'Not set'}</span>
                </div>
                <div className="info-row">
                  <strong>Phone:</strong>
                  <span>{user?.phoneNumber || 'Not set'}</span>
                </div>
                <div className="info-row">
                  <strong>Date of Birth:</strong>
                  <span>{user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not set'}</span>
                </div>
                <div className="info-row">
                  <strong>Interests:</strong>
                  <div className="interests-display">
                    {user?.interests?.length > 0 
                      ? user.interests.map(i => <span key={i} className="interest-tag">{i}</span>)
                      : 'Not set'}
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                <button onClick={() => setEditing(true)} className="btn btn-primary">
                  Edit Profile
                </button>
                <Link to="/change-password" className="btn btn-secondary">
                  Change Password
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Zodiac Sign</label>
                <select
                  value={formData.zodiac}
                  onChange={(e) => setFormData({...formData, zodiac: e.target.value})}
                >
                  <option value="">Select your zodiac</option>
                  {zodiacSigns.map(sign => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  placeholder="+90 XXX XXX XX XX"
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Interests</label>
                <div className="interests-selector">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      className={`interest-btn ${formData.interests.includes(interest) ? 'active' : ''}`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;