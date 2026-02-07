import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import { formatDate, isPastDate } from '../../utils/dateFormatter';
import Card from '../common/Card';
import './EventCard.css';

const EventCard = ({ event }) => {
  const isPast = isPastDate(event.date);
  const spotsLeft = event.capacity - event.currentAttendees;
  const isFull = spotsLeft <= 0;

  return (
    <Card className="event-card" hover>
      <Link to={`/events/${event._id}`} className="event-card-link">
        {/* Image */}
        <div className="event-card-image">
          <img src={event.imageUrl} alt={event.title} />
          {isPast && <div className="event-badge event-past">Past Event</div>}
          {isFull && !isPast && (
            <div className="event-badge event-full">Sold Out</div>
          )}
          {!isFull && !isPast && spotsLeft <= 5 && (
            <div className="event-badge event-limited">
              Only {spotsLeft} spots left!
            </div>
          )}
        </div>

        {/* Content */}
        <div className="event-card-content">
          <h3 className="event-card-title">{event.title}</h3>

          <div className="event-card-details">
            <div className="event-detail">
              <FiCalendar className="detail-icon" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="event-detail">
              <FiMapPin className="detail-icon" />
              <span>{event.location}</span>
            </div>

            <div className="event-detail">
              <FiUsers className="detail-icon" />
              <span>
                {event.currentAttendees} / {event.capacity} attending
              </span>
            </div>
          </div>

          <p className="event-card-description">
            {event.description.length > 120
              ? `${event.description.substring(0, 120)}...`
              : event.description}
          </p>

          <div className="event-card-footer">
            <span className="event-link-text">View Details →</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default EventCard;