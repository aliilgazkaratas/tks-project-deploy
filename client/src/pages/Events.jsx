import { useEffect } from 'react';
import { useEvents } from '../hooks/useEvents';
import EventList from '../components/events/EventList';
import './Events.css';

const Events = () => {
  const { events, loading, filters, updateFilters, fetchEvents } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  return (
    <div className="events-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Upcoming Events</h1>
          <p>Discover amazing adventures and join our community of travelers</p>
        </div>

        {/* Event List */}
        <EventList
          events={events}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Events;