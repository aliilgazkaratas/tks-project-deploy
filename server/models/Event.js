import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide event description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
      validate: {
        validator: function(value) {
          return value > new Date();
        },
        message: 'Event date must be in the future'
      }
    },
    location: {
      type: String,
      required: [true, 'Please provide event location'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please provide event price'],
      min: [0, 'Price cannot be negative']
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide event capacity'],
      min: [1, 'Capacity must be at least 1']
    },
    currentAttendees: {
      type: Number,
      default: 0,
      min: 0
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/600x400?text=Event+Image'
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual property to check if event is full
eventSchema.virtual('isFull').get(function() {
  return this.currentAttendees >= this.capacity;
});

// Virtual property to get available spots
eventSchema.virtual('availableSpots').get(function() {
  return Math.max(0, this.capacity - this.currentAttendees);
});

// Ensure virtuals are included when converting to JSON
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

// Index for faster queries
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ createdBy: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;

// Validation: Date must be in future, capacity > 0
// Virtuals: isFull and availableSpots computed properties
// Indexes: Speed up date/status queries
// createdBy: Links to admin who created event

