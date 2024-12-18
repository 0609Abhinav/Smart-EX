const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'extra-hard'] },
  question: String,
  options: [String],
  correctAnswer: String,
});

module.exports = mongoose.model('Question', questionSchema);
