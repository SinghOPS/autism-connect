const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  preferences: {
    feedbackType: { type: String, enum: ['visual', 'auditory'], default: 'visual' },
    colorScheme: { type: String, default: 'default' }
  },
  progressHistory: [{
    date: Date,
    score: Number
  }]
});

module.exports = mongoose.model('User', UserSchema);