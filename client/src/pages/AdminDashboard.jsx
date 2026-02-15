import { useState } from 'react';
import { FiPlus, FiUsers, FiCalendar, FiFileText } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CreateEventModal from '../components/admin/CreateEventModal';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  const handleEventCreated = (newEvent) => {
    console.log('Event created:', newEvent);
    // You can add a success notification here
    alert('Event created successfully!');
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        {/* ADD THIS SECTION */}
        <div className="admin-navigation">
          <Link to="/admin/blogs" className="admin-nav-card">
            <h3>📝 Manage Blogs</h3>
            <p>Create, edit, and publish blog posts</p>
          </Link>
          <div 
            className="admin-nav-card" 
            onClick={() => setActiveTab('events')}
            style={{cursor: 'pointer'}}
          >
            <h3>📅 Manage Events</h3>
            <p>View and manage all events</p>
          </div>
          <Link to="/profile" className="admin-nav-card">
            <h3>👤 My Profile</h3>
            <p>Update your admin profile</p>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-icon">
              <FiCalendar />
            </div>
            <div className="stat-content">
              <h3>Total Events</h3>
              <p className="stat-value">24</p>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-value">156</p>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-icon">
              <FiFileText />
            </div>
            <div className="stat-content">
              <h3>Blog Posts</h3>
              <p className="stat-value">42</p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </div>

        {/* Content */}
        <Card className="admin-content">
          {activeTab === 'events' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>Manage Events</h2>
                <Button 
                  icon={<FiPlus />} 
                  onClick={() => setIsCreateEventModalOpen(true)}
                >
                  Create Event
                </Button>
              </div>
              <p className="placeholder-text">
                Event management interface. Click "Create Event" to add a new event.
              </p>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>Manage Blogs</h2>
                <Button icon={<FiPlus />}>Create Blog Post</Button>
              </div>
              <p className="placeholder-text">
                Blog management interface coming soon...
              </p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>Manage Users</h2>
              </div>
              <p className="placeholder-text">
                User management interface coming soon...
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

export default AdminDashboard;