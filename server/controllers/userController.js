import User from '../models/User.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('attendedEvents', 'title date location imageUrl price');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's registrations
// @route   GET /api/users/registrations
// @access  Private
export const getUserRegistrations = async (req, res, next) => {
  try {
    const { status } = req.query; // upcoming, past, waitlist

    // Build query
    const query = { user: req.user._id };

    // Get all registrations
    const registrations = await Registration.find(query)
      .populate('event')
      .sort({ registeredAt: -1 });

    // Filter based on status
    let filteredRegistrations = registrations;

    if (status === 'upcoming') {
      filteredRegistrations = registrations.filter(
        reg => new Date(reg.event.date) > new Date() && !reg.waitlist  === 'completed'
      );
    } else if (status === 'past') {
      filteredRegistrations = registrations.filter(
        reg => new Date(reg.event.date) < new Date()  === 'completed'
      );
    } else if (status === 'waitlist') {
      filteredRegistrations = registrations.filter(reg => reg.waitlist);
    }

    res.status(200).json({
      success: true,
      count: filteredRegistrations.length,
      registrations: filteredRegistrations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's attendance history
// @route   GET /api/users/attendance
// @access  Private
export const getAttendanceHistory = async (req, res, next) => {
  try {
    // Get all past events the user attended
    const pastRegistrations = await Registration.find({
      user: req.user._id,
      
      waitlist: false
    })
      .populate('event')
      .sort({ 'event.date': -1 });

    // Filter only past events
    const pastEvents = pastRegistrations
      .filter(reg => new Date(reg.event.date) < new Date())
      .map(reg => ({
        event: reg.event,
        registeredAt: reg.registeredAt,
        amount: reg.amount
      }));

    // Calculate statistics
    const stats = {
      totalEventsAttended: pastEvents.length,
      totalSpent: pastEvents.reduce((sum, item) => sum + item.amount, 0),
      memberSince: req.user.createdAt
    };

    res.status(200).json({
      success: true,
      stats,
      history: pastEvents
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Get users
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('attendedEvents', 'title date location');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's registrations
    const registrations = await Registration.find({ user: user._id })
      .populate('event', 'title date location price')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      user,
      registrations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!role || !['member', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "member" or "admin"'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from demoting themselves
    if (user._id.toString() === req.user._id.toString() && role === 'member') {
      return res.status(400).json({
        success: false,
        message: 'You cannot demote yourself'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete yourself'
      });
    }

    // Check if user has upcoming registrations
    const upcomingRegistrations = await Registration.find({
      user: user._id
      
    }).populate('event');

    const hasUpcoming = upcomingRegistrations.some(
      reg => new Date(reg.event.date) > new Date()
    );

    if (hasUpcoming) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with upcoming event registrations. Cancel registrations first.'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// getUserProfile: Returns user data with populated attended events
// getUserRegistrations: Filters by upcoming/past/waitlist
// getAttendanceHistory: Shows past events with spending statistics
// getAllUsers: Admin only, supports search and filtering
// updateUserRole: Admin can promote/demote users (except themselves)
// deleteUser: Prevents deletion if user has upcoming events

