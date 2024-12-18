const mongoose = require('mongoose');

const testSessionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  detections: [
    {
      _id: false,
      score: Number, // Confidence score of the detected face
      detection: Object, // The face detection data from face-api.js
    }
  ],
  suspiciousActivity: {
    type: Boolean,
    default: false,
  },
});

const TestSession = mongoose.model('TestSession', testSessionSchema);

module.exports = { TestSession };
