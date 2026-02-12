import User from '../models/User.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email, zodiac, phoneNumber, dateOfBirth, interests } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (zodiac) user.zodiac = zodiac;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (interests) user.interests = interests;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      zodiac: user.zodiac,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      interests: user.interests
    });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to change password' });
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

// @desc    Get user's attendance history
// @route   GET /api/users/attendance
// @access  Private
export const getAttendanceHistory = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id
    })
      .populate('event')
      .sort({ registeredAt: -1 });

    const pastEvents = registrations
      .filter(reg => reg.event !== null && new Date(reg.event.date) < new Date())
      .map(reg => ({
        event: reg.event,
        registeredAt: reg.registeredAt
      }));

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

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;
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

    const skip = (page - 1) * limit;

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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const registrations = await Registration.find({ user: user._id })
      .populate('event', 'title date location')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      user,
      registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user role (admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
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

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete yourself'
      });
    }

    const upcomingRegistrations = await Registration.find({
      user: user._id
    }).populate('event');

    const hasUpcoming = upcomingRegistrations.some(
      reg => reg.event && new Date(reg.event.date) > new Date()
    );

    if (hasUpcoming) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with upcoming registrations'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};