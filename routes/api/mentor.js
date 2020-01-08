const express = require('express');
const { check, validationResult } = require('express-validator');

const Mentor = require('../../models/Mentor');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();

    if (mentors.length) {
      res.json({ status: 'success', data: mentors });
      return;
    }
    res.json({ status: 'failed', msg: 'No mentors found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mentors = await Mentor.findById(req.params.id);

    if (mentors) {
      res.json({ status: 'success', data: mentors });
      return;
    }
    res.json({ status: 'failed', msg: 'No mentors found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, dateOfBirth, gender } = req.body;

    try {
      let mentor = await Mentor.findOne({ email });
      if (mentor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Mentor Already Exists' }] });
      }

      currentTime = new Date();

      mentor = new Mentor({
        name,
        email,
        mobile,
        dateOfBirth,
        gender,
        createdAt: currentTime,
        updatedAt: currentTime
      });

      const mongoData = await mentor.save();

      res.json({
        status: 'success',
        data: { id: mongoData._id }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/:id', async (req, res) => {
  try {
    const mongoId = req.params.id;
    let mentor = await Mentor.findById(mongoId);

    const { name, email, mobile, dateOfBirth, gender } = mentor;

    const updatedMentor = req.body;

    mentor = {
      name: updatedMentor.name || name,
      email: updatedMentor.email || email,
      mobile: updatedMentor.mobile || mobile,
      dateOfBirth: updatedMentor.dataOfBirth || dateOfBirth,
      gender: updatedMentor.gender || gender
    };

    await Mentor.findByIdAndUpdate(mongoId, { $set: mentor });

    res.json({
      status: 'success',
      data: {
        id: mongoId,
        msg: 'Updated'
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mentor.findByIdAndRemove(req.params.id);

    if (deleted) {
      res.json({
        status: 'success',
        data: { id: deleted._id, msg: 'Deleted' }
      });
      return;
    }

    res.json({
      status: 'failed',
      msg: 'Mentor not found'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
