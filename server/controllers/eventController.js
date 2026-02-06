import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import User from '../models/User.js';
import Registration from '../models/Registration.js';
// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res, next) => {
  try {
    const { status, search, sort, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by title or location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Sort options
    let sortOption = { date: 1 }; // Default: upcoming first
    if (sort === 'date-desc') sortOption = { date: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'popular') sortOption = { currentAttendees: -1 };

    // Execute query
    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      count: events.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      events
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email profilePicture');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // If user is logged in, check if they're registered
    let isRegistered = false;
    let registration = null;

    if (req.user) {
      registration = await Registration.findOne({
        user: req.user._id,
        event: event._id
      });
      isRegistered = !!registration;
    }

    res.status(200).json({
      success: true,
      event,
      isRegistered,
      registration
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, price, capacity, imageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !date || !location || price === undefined || !capacity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate date is in future
    if (new Date(date) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Event date must be in the future'
      });
    }

    // Validate capacity
    if (capacity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Capacity must be at least 1'
      });
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      date,
      location,
      price,
      capacity,
      imageUrl: imageUrl || undefined,
      createdBy: req.user._id
    });

    // Populate creator info
    await event.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, price, capacity, imageUrl, status } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is completed or cancelled
    if (event.status === 'completed' || event.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update completed or cancelled events'
      });
    }

    // Validate date if being updated
    if (date && new Date(date) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Event date must be in the future'
      });
    }

    // Validate capacity if being updated
    if (capacity && capacity < event.currentAttendees) {
      return res.status(400).json({
        success: false,
        message: `Cannot reduce capacity below current attendees (${event.currentAttendees})`
      });
    }

    // Update fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (price !== undefined) event.price = price;
    if (capacity) event.capacity = capacity;
    if (imageUrl) event.imageUrl = imageUrl;
    if (status) event.status = status;

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event has registrations
    const registrationCount = await Registration.countDocuments({ event: event._id });

    if (registrationCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete event with ${registrationCount} registrations. Cancel the event instead.`
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get event attendees
// @route   GET /api/events/:id/attendees
// @access  Private/Admin
export const getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Get all confirmed registrations (not waitlist)
    const registrations = await Registration.find({
      event: event._id,
      waitlist: false
    })
      .populate('user', 'name email profilePicture')
      .sort({ registeredAt: 1 });

    // Get waitlist
    const waitlist = await Registration.find({
      event: event._id,
      waitlist: true
    })
      .populate('user', 'name email profilePicture')
      .sort({ waitlistPosition: 1 });

    res.status(200).json({
      success: true,
      attendees: registrations,
      waitlist,
      stats: {
        totalAttendees: registrations.length,
        totalWaitlist: waitlist.length,
        capacity: event.capacity,
        availableSpots: event.capacity - registrations.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel event
// @route   POST /api/events/:id/cancel
// @access  Private/Admin
export const cancelEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Event is already cancelled'
      });
    }

    if (event.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed event'
      });
    }

    // Update event status
    event.status = 'cancelled';
    await event.save();

    // TODO: Process refunds for all registrations
    // TODO: Send cancellation emails to all attendees

    res.status(200).json({
      success: true,
      message: 'Event cancelled successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

// getAllEvents: Supports filtering, search, sorting, pagination
// getEventById: Returns event with registration status for logged-in user
// createEvent: Admin only, validates future date
// updateEvent: Prevents reducing capacity below current attendees
// deleteEvent: Prevents deletion if registrations exist
// getEventAttendees: Returns confirmed attendees + waitlist
// cancelEvent: Changes status (refund logic to be added)
// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      userId: req.user._id,
      eventId: req.params.id
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Create registration
    const registration = await Registration.create({
      userId: req.user._id,
      eventId: req.params.id,
      status: 'attending'
    });

    // Update event attendee count
    event.currentAttendees += 1;
    await event.save();

    res.status(201).json({
      message: 'Successfully registered for event',
      registration
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// @desc    Unregister from event
// @route   DELETE /api/events/:id/register
// @access  Private
export const unregisterFromEvent = async (req, res) => {
  try {
    const registration = await Registration.findOneAndDelete({
      userId: req.user._id,
      eventId: req.params.id
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Update event attendee count
    const event = await Event.findById(req.params.id);
    if (event) {
      event.currentAttendees = Math.max(0, event.currentAttendees - 1);
      await event.save();
    }

    res.json({ message: 'Successfully unregistered from event' });
  } catch (error) {
    res.status(500).json({ message: 'Unregistration failed', error: error.message });
  }
};