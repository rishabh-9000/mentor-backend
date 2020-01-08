const express = require('express');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Mentor = require('../../models/Mentor');

const router = express.Router();

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

      mentor = new Mentor({
        name,
        email,
        mobile,
        dateOfBirth,
        gender
      });
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
