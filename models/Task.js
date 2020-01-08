const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },

  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Task = mongoose.model('tasks', TaskSchema);
