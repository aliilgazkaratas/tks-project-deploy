import { createContext, useState, useEffect, useCallback } from 'react';
import { getAllEvents } from '../services/eventService';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'upcoming',
    search: '',
    sort: 'date',
    page: 1,
    limit: 9
  });

  // Fetch events - wrapped in useCallback to prevent infinite loop
  const fetchEvents = useCallback(async (params = filters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllEvents(params);
      setEvents(response.events);
      return response;
    } catch (error) {
      setError(error.message || 'Failed to fetch events');
      console.error('Fetch events error:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since params is passed as argument

  // Fetch events when filters change
  useEffect(() => {
    fetchEvents(filters);
  }, [filters, fetchEvents]);

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: 'upcoming',
      search: '',
      sort: 'date',
      page: 1,
      limit: 9
    });
  };

  // Add event to state (after creation)
  const addEvent = (event) => {
    setEvents((prev) => [event, ...prev]);
  };

  // Update event in state
  const updateEventInState = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  // Remove event from state
  const removeEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event._id !== eventId));
  };

  const value = {
    events,
    loading,
    error,
    filters,
    fetchEvents,
    updateFilters,
    resetFilters,
    addEvent,
    updateEventInState,
    removeEvent
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};