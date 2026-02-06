import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserProfile, getAttendanceHistory } from '../services/userService';
import ProfileCard from '../components/profile/ProfileCard';
import AttendanceHistory from '../components/profile/AttendanceHistory';
import Button from '../components/common/Button';
import './Profile.css';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileRes, historyRes] = await Promise.all([
          getUserProfile(),
          getAttendanceHistory()
        ]);
        
        setProfile(profileRes.user);
        setHistory(historyRes.history);
        setStats(historyRes.stats);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-grid">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <ProfileCard user={profile || authUser} stats={stats} />
            <Button fullWidth variant="secondary">
              Edit Profile
            </Button>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            <AttendanceHistory history={history} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;