const mongoose = require('mongoose')
const {User} = require('../models/user')
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt')
const Joi = require('joi')

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid Email or Password.')

  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if (!validPassword) return res.status(400).send('Invalid Email or Password.')

  const token = user.generateAuthToken()
  res.send(token)
});

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

module.exports = router;