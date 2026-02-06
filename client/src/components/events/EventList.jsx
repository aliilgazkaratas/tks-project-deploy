import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import EventCard from './EventCard';
import Button from '../common/Button';
import './EventList.css';

const EventList = ({ events, loading, filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ search: searchTerm });
  };

  const handleStatusFilter = (status) => {
    onFilterChange({ status });
  };

  const handleSortChange = (sort) => {
    onFilterChange({ sort });
  };

  if (loading) {
    return (
      <div className="event-list-loading">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      {/* Search and Filters */}
      <div className="event-list-controls">
        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button type="submit" size="small">
            Search
          </Button>
        </form>

        {/* Filter Toggle */}
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          {/* Status Filter */}
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${
                  filters.status === 'upcoming' ? 'active' : ''
                }`}
                onClick={() => handleStatusFilter('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`filter-btn ${
                  filters.status === 'past' ? 'active' : ''
                }`}
                onClick={() => handleStatusFilter('past')}
              >
                Past
              </button>
              <button
                className={`filter-btn ${
                  filters.status === '' ? 'active' : ''
                }`}
                onClick={() => handleStatusFilter('')}
              >
                All
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="date">Date (Earliest)</option>
              <option value="date-desc">Date (Latest)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="results-info">
        <p>
          {events.length} {events.length === 1 ? 'event' : 'events'} found
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="no-events">
          <p>No events found matching your criteria.</p>
          <Button
            onClick={() => {
              setSearchTerm('');
              onFilterChange({ search: '', status: 'upcoming' });
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventList;