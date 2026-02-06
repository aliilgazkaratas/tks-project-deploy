import { FiMail, FiCalendar, FiAward } from 'react-icons/fi';
import { formatShortDate } from '../../utils/dateFormatter';
import Card from '../common/Card';
import './ProfileCard.css';

const ProfileCard = ({ user, stats }) => {
  return (
    <Card className="profile-card">
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt={user.name}
          className="profile-avatar-large"
        />
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-role">
            {user.role === 'admin' ? '👑 Admin' : '🌍 Member'}
          </p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <FiMail className="detail-icon" />
          <span>{user.email}</span>
        </div>
        <div className="detail-item">
          <FiCalendar className="detail-icon" />
          <span>Member since {formatShortDate(user.createdAt)}</span>
        </div>
      </div>

      {stats && (
        <div className="profile-stats">
          <div className="stat-box">
            <FiAward className="stat-icon" />
            <div>
              <h3>{stats.totalEventsAttended || 0}</h3>
              <p>Events Attended</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">💰</span>
            <div>
              <h3>${stats.totalSpent?.toFixed(2) || '0.00'}</h3>
              <p>Total Spent</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;