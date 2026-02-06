import api from './api';

// Get all events
export const getAllEvents = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/api/events?${queryString}`);
  return response.data;
};

// Get single event by ID
export const getEventById = async (id) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

// Create new event (admin only)
export const createEvent = async (eventData) => {
  const response = await api.post('/api/events', eventData);
  return response.data;
};

// Update event (admin only)
export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/api/events/${id}`, eventData);
  return response.data;
};

// Delete event (admin only)
export const deleteEvent = async (id) => {
  const response = await api.delete(`/api/events/${id}`);
  return response.data;
};

// Get event attendees (admin only)
export const getEventAttendees = async (id) => {
  const response = await api.get(`/api/events/${id}/attendees`);
  return response.data;
};

// Cancel event (admin only)
export const cancelEvent = async (id) => {
  const response = await api.post(`/api/events/${id}/cancel`);
  return response.data;
};

// Add registerForEvent function (missing)
export const registerForEvent = async (eventId) => {
  const response = await api.post(`/api/events/${eventId}/register`);
  return response.data;
};

// Add unregisterFromEvent function
export const unregisterFromEvent = async (eventId) => {
  const response = await api.delete(`/api/events/${eventId}/register`);
  return response.data;
};

// Add default export at the end
const eventService = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventAttendees,
  cancelEvent,
  registerForEvent,
  unregisterFromEvent,
};

export default eventService;