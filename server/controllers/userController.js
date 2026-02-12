// @desc    Get user's attendance history
// @route   GET /api/users/attendance
// @access  Private
export const getAttendanceHistory = async (req, res, next) => {
  try {
    // Get all registrations for the user
    const registrations = await Registration.find({
      user: req.user._id
    })
      .populate('event')
      .sort({ registeredAt: -1 });

    // Filter out null events and past events only
    const pastEvents = registrations
      .filter(reg => reg.event !== null && new Date(reg.event.date) < new Date())
      .map(reg => ({
        event: reg.event,
        registeredAt: reg.registeredAt
      }));

    // Calculate statistics
    const stats = {
      totalEventsAttended: pastEvents.length,
      memberSince: req.user.createdAt
    };

    res.status(200).json({
      success: true,
      stats,
      history: pastEvents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's registrations  
// @route   GET /api/users/registrations
// @access  Private
export const getUserRegistrations = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = { user: req.user._id };

    const registrations = await Registration.find(query)
      .populate('event')
      .sort({ registeredAt: -1 });

    // Filter out null events
    let filteredRegistrations = registrations.filter(r => r.event !== null);

    if (status === 'upcoming') {
      filteredRegistrations = filteredRegistrations.filter(
        reg => new Date(reg.event.date) > new Date()
      );
    } else if (status === 'past') {
      filteredRegistrations = filteredRegistrations.filter(
        reg => new Date(reg.event.date) < new Date()
      );
    }

    res.status(200).json({
      success: true,
      count: filteredRegistrations.length,
      registrations: filteredRegistrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};