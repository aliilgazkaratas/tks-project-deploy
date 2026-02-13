import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    zodiac: {
  type: String,
  enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces', null],
  default: null
},
phoneNumber: {
  type: String,
  default: null
},
dateOfBirth: {
  type: Date,
  default: null
},
interests: {
  type: [String],
  default: []
},
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
        },
    role: {
      type: String,
      enum: ['user', 'admin'],  // Changed 'member' to 'user'
      default: 'user'
    },
    googleId: {
      type: String,
      sparse: true
    },
    profilePicture: {
      type: String,
      default: 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=150'
    },
    attendedEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {  // Add 'next' parameter
  if (!this.isModified('password')) {
    return next();  // Call next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();  // Call next() when done
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;