import { FiCalendar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';
import { formatCurrency } from '../../utils/validators';
import Card from '../common/Card';
import './AttendanceHistory.css';

const AttendanceHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <Card className="no-history">
        <p>No attendance history yet.</p>
        <p>
          <Link to="/events" className="explore-link">
            Explore upcoming events
          </Link>
        </p>
      </Card>
    );
  }

  return (
    <div className="attendance-history">
      <h3 className="history-title">Attendance History</h3>
      <div className="history-list">
        {history.map((item) => (
          <Card key={item.event._id} className="history-item" hover>
            <Link to={`/events/${item.event._id}`} className="history-link">
              <div className="history-image">
                <img src={item.event.imageUrl} alt={item.event.title} />
              </div>
              <div className="history-content">
                <h4 className="history-event-title">{item.event.title}</h4>
                <div className="history-details">
                  <span className="history-detail">
                    <FiCalendar />
                    {formatDate(item.event.date)}
                  </span>
                  <span className="history-detail">
                    <FiMapPin />
                    {item.event.location}
                  </span>
                  <span className="history-detail">
                    <FiDollarSign />
                    {formatCurrency(item.amount)}
</span>
</div>
</div>
</Link>
</Card>
))}
</div>
</div>
);
};
export default AttendanceHistory;