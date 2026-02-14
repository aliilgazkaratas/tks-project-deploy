import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatDate, isPastDate, getRelativeTime } from '../../utils/dateFormatter';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import './EventDetails.css';
import eventService from '../../services/eventService';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

const EventDetails = ({ event, isRegistered, registration }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // MOVED INSIDE COMPONENT
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isPast = isPastDate(event.date);
  const spotsLeft = event.capacity - event.currentAttendees;
  const isFull = spotsLeft <= 0;
  const isWaitlist = registration?.waitlist;

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${event._id}` } });
      return;
    }

    setShowConfirmModal(true);
  };

const confirmRegistration = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await eventService.registerForEvent(event._id);
    
    if (response.success) {
      setSuccess(true);
      setShowConfirmModal(false);
      
      // Show success message
      alert('✅ Successfully registered! See you at the event!');
      
      // Reload to update UI
      window.location.reload();
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
  try {
    setLoading(true);
    setError(null);
    
    await eventService.registerForEvent(event._id);
    
    setSuccess(true);
    setShowConfirmModal(false);
    
    // Refresh event data instead of full reload
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    setError(err.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};  return (
    <div className="event-details-container">
      {/* Hero Image */}
      <div className="event-hero">
        <img src={event.imageUrl} alt={event.title} />
        <div className="event-hero-overlay">
          <div className="container">
            <h1 className="event-title">{event.title}</h1>
            <div className="event-meta">
              <span className="meta-item">
                <FiCalendar /> {formatDate(event.date)}
              </span>
              <span className="meta-item">
                <FiMapPin /> {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="event-details-grid">
          {/* Main Content */}
          <div className="event-main-content">
            <Card>
              <h2>About This Event</h2>
              <p className="event-description">{event.description}</p>

              <div className="event-info-grid">
                <div className="info-item">
                  <FiCalendar className="info-icon" />
                  <div>
                    <h4>Date & Time</h4>
                    <p>{formatDate(event.date)}</p>
                    <p className="info-relative">{getRelativeTime(event.date)}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FiMapPin className="info-icon" />
                  <div>
                    <h4>Location</h4>
                    <p>{event.location}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FiUsers className="info-icon" />
                  <div>
                    <h4>Capacity</h4>
                    <p>
                      {event.currentAttendees} / {event.capacity} attending
                    </p>
                    {!isFull && !isPast && (
                      <p className="info-spots">{spotsLeft} spots remaining</p>
                    )}
                  </div>
                </div>
              </div>



              {/* Organizer Info */}
              {event.createdBy && (
                <div className="organizer-section">
                  <h3>Organized By</h3>
                  <div className="organizer-card">
                    <img
                      src={event.createdBy.profilePicture}
                      alt={event.createdBy.name}
                      className="organizer-avatar"
                    />
                    <div>
                      <h4>{event.createdBy.name}</h4>
                      <p>{event.createdBy.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar - Registration */}
          <div className="event-sidebar">
            <Card className="registration-card">


              {/* Registration Status */}
              {isRegistered && (
                <div className="registration-status">
                  {isWaitlist ? (
                    <div className="status-waitlist">
                      <h4>You're on the Waitlist</h4>
                      <p>Position: #{registration.waitlistPosition}</p>
                      <p className="status-note">
                        We'll notify you if a spot opens up!
                      </p>
                    </div>
                  ) : (
                    <div className="status-confirmed">
                      <h4>✓ You're Registered!</h4>
                      <p>See you at the event!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Registration Button */}
              {!isPast && !isRegistered && (
                <div className="registration-actions">
                  {error && <div className="error-message">{error}</div>}

                  {isFull ? (
                    <Button fullWidth disabled>
                      Event Full - Join Waitlist
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      onClick={handleRegister}
                      loading={loading}
                      size="large"
                    >
                      I Will Attend!
                    </Button>
                  )}


                </div>
              )}

              {isPast && (
                <div className="event-past-notice">
                  <p>This event has already occurred.</p>
                </div>
              )}

              {/* Event Stats */}
              <div className="event-stats">
                <div className="stat-item">
                  <FiUsers />
                  <span>{event.currentAttendees} Registered</span>
                </div>
                <div className="stat-item">
                  <FiClock />
                  <span>{getRelativeTime(event.date)}</span>
                </div>
              </div>
            </Card>

            {/* Share Section (Optional) */}
            <Card className="share-card">
              <h4>Share This Event</h4>
              <div className="share-buttons">
                <button className="share-btn">Facebook</button>
                <button className="share-btn">Twitter</button>
                <button className="share-btn">Email</button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Registration"
      >
        <div className="confirm-modal-content">
          <p>
            You are about to register for <strong>{event.title}</strong>.
          </p>
          <div className="confirm-details">
            <p>
              <strong>Date:</strong> {formatDate(event.date)}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            
          </div>

          {isFull && (
            <div className="waitlist-notice">
              <p>
                ⚠️ This event is currently full. You will be added to the
                waitlist. 
              </p>
            </div>
          )}

          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={confirmRegistration}
              loading={loading}
              fullWidth
            >
              Confirm Attendance

            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetails;