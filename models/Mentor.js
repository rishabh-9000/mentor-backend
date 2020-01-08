const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date
  },

  updatedAt: {
    type: Date
  }
});

module.exports = Mentor = mongoose.model('mentors', MentorSchema);
