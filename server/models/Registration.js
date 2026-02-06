import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    waitlist: {
      type: Boolean,
      default: false
    },
    waitlistPosition: {
      type: Number,
      default: null
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate registrations
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

// Index for queries
registrationSchema.index({ event: 1, waitlist: 1 });
registrationSchema.index({ user: 1 });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;