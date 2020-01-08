const express = require('express');
const { check, validationResult } = require('express-validator');

const Task = require('../../models/Task');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { task, mentor } = req.body;

    let newTask = new Task({
      task,
      mentor: ObjectId(mentor)
    });

    await newTask.save();

    res.json({
      status: 'success',
      data: {
        task,
        mentor
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
