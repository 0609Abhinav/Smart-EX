const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  rollNo: { type: String, unique: true },
  password: String,
  university: String,
  role: { type: String, default: 'student' },
  points: { type: Number, default: 0 },
  badges: [String],
}, { timestamps: true });

// Password hash middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
